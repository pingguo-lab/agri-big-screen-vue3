const fs=require("fs");
const f="src/utils/request.js";
let c=fs.readFileSync(f,"utf8");
if(!/mockData/.test(c)){
  c=c.replace('import axios from "axios";','import axios from "axios";\nimport { buildMockResponse, isProjectApi } from "./mockData";');
  fs.writeFileSync(f,c,"utf8");
  console.log("已补 import");
}
console.log("检查：", /buildMockResponse/.test(c), /isProjectApi/.test(c));
