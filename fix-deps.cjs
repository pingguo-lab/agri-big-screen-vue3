const fs=require("fs");
// 1. mqtt 用浏览器构建，绕开 node 内置模块
for (const f of ["src/components/mqtt.vue","src/views/Fengxin/coldStorage/ScreenPage.vue","src/views/Mushroom/ScreenPage.vue"]) {
  let c=fs.readFileSync(f,"utf8");
  const n=(c.match(/from ["']mqtt["']/g)||[]).length;
  c=c.replace(/from ["']mqtt["']/g,'from "mqtt/dist/mqtt.min.js"');
  fs.writeFileSync(f,c,"utf8");
  console.log(f,"->",n,"处");
}
// 2. package.json 补 axios
const p=JSON.parse(fs.readFileSync("package.json","utf8"));
p.dependencies.axios="^1.6.8";
fs.writeFileSync("package.json",JSON.stringify(p,null,2)+"\n","utf8");
console.log("axios 已加入 dependencies");
