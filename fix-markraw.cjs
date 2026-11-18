const fs=require("fs"),path=require("path");
let changed=0,addImport=0;

function walk(d){for(const n of fs.readdirSync(d)){const f=path.join(d,n);const s=fs.statSync(f);
 if(s.isDirectory()){if(n==="compat")continue;walk(f);continue;}
 if(!/\.vue$/.test(n))continue;
 let c=fs.readFileSync(f,"utf8");
 if(!/this\.myChart\s*=\s*this\.\$echarts\.init\(/.test(c))continue;

 // 1. 包 markRaw：ECharts 实例是 class 实例，不能进响应式系统
 c=c.replace(/(this\.myChart\s*=\s*)(this\.\$echarts\.init\([^;]*?\))\s*;/g,(m,a,b)=>`${a}markRaw(${b});`);

 // 2. 补 import
 if(!/import\s*\{[^}]*markRaw[^}]*\}\s*from\s*["']vue["']/.test(c)){
   c=c.replace(/<script>/,`<script>\nimport { markRaw } from "vue"; // Vue3：图表实例必须 markRaw，否则被 Proxy 包住会崩`);
   addImport++;
 }
 fs.writeFileSync(f,c,"utf8");changed++;
}}
walk("src");
console.log("修改文件:",changed,"补 import:",addImport);
console.log("剩余未包 markRaw 的:",(function(){let n=0;walk2("src");function walk2(d){for(const x of fs.readdirSync(d)){const f=path.join(d,x),s=fs.statSync(f);if(s.isDirectory()){if(x==="compat")continue;walk2(f);continue;}if(!/\.vue$/.test(x))continue;const c=fs.readFileSync(f,"utf8");if(/this\.myChart\s*=\s*this\.\$echarts\.init\(/.test(c))n++;}}return n;})());
