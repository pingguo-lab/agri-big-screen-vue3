const fs=require("fs");
const f="src/views/YuganFish/ScreenPage.vue";
let c=fs.readFileSync(f,"utf8");
const before=c;
c=c.replace(/this\.\$set\(this\.(\w+), topicId,\s*([\s\S]*?)\n\s*\);/g,(m,obj,val)=>`this.${obj}[topicId] = ${val.trim()};`);
fs.writeFileSync(f,c,"utf8");
console.log("changed:", before!==c, "remaining $set:", (c.match(/\$set/g)||[]).length);
