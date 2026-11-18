const fs=require("fs");
const f="src/assets/js/chalk.js";
let c=fs.readFileSync(f,"utf8");
if(!/^\(function \(\) \{/m.test(c)){
  c=c.replace('import * as echarts from "echarts";','import * as echarts from "echarts";\n\n// 原 UMD 包装改为 IIFE，保持函数作用域（原文件里有 return 语句）\n(function () {');
  c=c.trimEnd()+"\n})();\n";
  fs.writeFileSync(f,c,"utf8");
  console.log("已包一层 IIFE");
}
console.log(c.split("\n").slice(0,5).join("\n"));
console.log("...tail:",JSON.stringify(c.slice(-12)));
