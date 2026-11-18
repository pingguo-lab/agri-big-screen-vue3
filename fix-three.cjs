const fs=require("fs");
const f="src/views/fish/ScreenPage.vue";
let c=fs.readFileSync(f,"utf8");
if(!/import \{ markRaw \}/.test(c)){
  c=c.replace('import * as THREE from "three";','import { markRaw } from "vue";\nimport * as THREE from "three";');
  c=c.replace("this.scene = new THREE.Scene();","this.scene = markRaw(new THREE.Scene());");
  c=c.replace("this.camera = new THREE.PerspectiveCamera(","this.camera = markRaw(new THREE.PerspectiveCamera(");
  // 补上 PerspectiveCamera 的右括号：找到 this.camera.position.set 前的那一行
  c=c.replace(/(this\.camera = markRaw\(new THREE\.PerspectiveCamera\([\s\S]*?\))\s*;/,"$1);");
  c=c.replace("this.renderer = new THREE.WebGLRenderer({ alpha: true });","this.renderer = markRaw(new THREE.WebGLRenderer({ alpha: true }));");
  c=c.replace("this.cubes = [];","this.cubes = markRaw([]);");
  fs.writeFileSync(f,c,"utf8");
  console.log("已加 markRaw");
}
console.log("scene:", /this\.scene = markRaw/.test(c), "camera:", /this\.camera = markRaw/.test(c), "renderer:", /this\.renderer = markRaw/.test(c));
