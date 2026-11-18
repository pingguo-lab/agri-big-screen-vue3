const fs=require("fs");
const f="src/main.js";
let c=fs.readFileSync(f,"utf8");
if(!/errorHandler/.test(c)){
  c=c.replace("app.mount(\"#app\");", `// 临时：把运行时错误定位到具体组件（排查完可以删）
app.config.errorHandler = (err, instance, info) => {
  const name = instance && (instance.$options && (instance.$options.name || instance.$options.__file)) || "unknown";
  console.error("[VUE-ERR]", err && err.message, "| component:", name, "| info:", info);
  console.error(err && err.stack);
};

app.mount("#app");`);
  fs.writeFileSync(f,c,"utf8");
  console.log("已加 errorHandler");
}
