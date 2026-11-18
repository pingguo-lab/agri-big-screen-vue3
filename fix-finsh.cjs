const fs=require("fs");
const f="src/views/FinshIndex/ScreenPage.vue";
let c=fs.readFileSync(f,"utf8");
c=c.replace(/import\s+VueRouter\s+from\s+['"]vue-router['"];?\r?\n/,"");
c=c.replace(/import\s+Element,\s*\{\s*MessageBox\s*\}\s*from\s+["']element-plus["'];?/, 'import { ElMessageBox } from "element-plus";');
c=c.replace(/MessageBox\.alert/g,"ElMessageBox.alert");
fs.writeFileSync(f,c,"utf8");
console.log("剩余 MessageBox:",(c.match(/MessageBox/g)||[]).filter(x=>x==="MessageBox").length);
console.log(c.split("\n").filter(l=>/element-plus|ElMessageBox/.test(l)).slice(0,4).join("\n"));
