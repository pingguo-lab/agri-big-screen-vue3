const fs=require("fs");
const path=require("path");

// A. 清理不再使用的 import Vue from "vue"
let removed=0, kept=[];
function walk(d){for(const n of fs.readdirSync(d)){const f=path.join(d,n);const s=fs.statSync(f);
 if(s.isDirectory()){if(n==="compat")continue;walk(f);continue;}
 if(!/\.(vue|js)$/.test(n))continue;
 let c=fs.readFileSync(f,"utf8");
 if(!/import\s+Vue\s+from\s+["']vue["']/.test(c))continue;
 const without=c.replace(/^[ \t]*import\s+Vue\s+from\s+["']vue["'][ \t]*;?[ \t]*\r?\n/gm,"");
 if(/\bVue\./.test(without)){kept.push(path.relative("src",f));continue;}
 fs.writeFileSync(f,without,"utf8");removed++;
}}
walk("src");
console.log("移除无用 import Vue:",removed,"个文件");
if(kept.length)console.log("仍在使用 Vue.* 的文件:",kept.join(", "));

// B. 鱼塘页面的图片 require → import
const f="src/views/fish/ScreenPage.vue";
let c=fs.readFileSync(f,"utf8");
if(!/safePng/.test(c)){
  c=c.replace('import { Sky } from "three/examples/jsm/objects/Sky.js";',
    'import { Sky } from "three/examples/jsm/objects/Sky.js";\nimport safePng from "../../assets/images/safe.png";\nimport unsafePng from "../../assets/images/unsafe.png";\nimport waterNormalsJpg from "../../assets/images/waternormals.jpg";');
  c=c.replace('require("../../assets/images/safe.png")','safePng');
  c=c.replace('require("../../assets/images/unsafe.png")','unsafePng');
  c=c.replace('require("../../assets/images/waternormals.jpg")','waterNormalsJpg');
  fs.writeFileSync(f,c,"utf8");
  console.log("鱼塘页面 require( 替换完成");
}
console.log("剩余 require(:",(c.match(/require\(/g)||[]).length);
