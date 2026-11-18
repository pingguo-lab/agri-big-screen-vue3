const fs=require("fs"),path=require("path");
let n=0;
function walk(d){for(const x of fs.readdirSync(d)){const f=path.join(d,x);const s=fs.statSync(f);
 if(s.isDirectory()){if(x==="compat")continue;walk(f);continue;}
 if(!/\.vue$/.test(x))continue;
 let c=fs.readFileSync(f,"utf8");
 if(!/require\(["']echarts["']\)/.test(c))continue;
 c=c.replace(/let echarts = require\(["']echarts["']\);?/g,"const echarts = this.$echarts; // Vue3：用全局属性，不再 require");
 fs.writeFileSync(f,c,"utf8");n++;
}}
walk("src");
console.log("替换 require(echarts) 的文件数:",n);
