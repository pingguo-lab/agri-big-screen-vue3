const fs=require("fs");

// FishMap2：不要 getOption() 再整体 setOption（ECharts 5 下会把内部结构再喂回去），改成按下标局部更新
let a="src/components/large-cpns/FishMap2.vue";
let c=fs.readFileSync(a,"utf8");
c=c.replace(/updateChartData\(\) \{\s*let option = this\.myChart\.getOption\(\);\s*option\.series\[0\]\.data = this\.values\[this\.activeValue\]\.current;\s*option\.series\[1\]\.data = this\.values\[this\.activeValue\]\.optimal;\s*this\.myChart\.setOption\(option\);\s*\}/,
`updateChartData() {
      // Vue3/ECharts5：改为“按下标局部合并”，避免 getOption() 回灌导致的 series 结构异常
      this.myChart.setOption({
        series: [
          { data: this.values[this.activeValue].current },
          { data: this.values[this.activeValue].optimal },
        ],
      });
    }`);
fs.writeFileSync(a,c,"utf8");
console.log("FishMap2 已改：", /getOption\(\)/.test(c) ? "仍含 getOption" : "无 getOption");

// FishMap1：同样去掉 getOption() 取 series 的做法
let b="src/components/large-cpns/FishMap1.vue";
let d=fs.readFileSync(b,"utf8");
d=d.replace(/let series = this\.myChart\.getOption\(\)\.series\[0\];\s*series\.areaStyle = \{\s*color: color,\s*opacity: 0\.6,\s*\};\s*this\.myChart\.setOption\(\{ series: \[series\] \}\);/,
`this.myChart.setOption({ series: [{ areaStyle: { color: color, opacity: 0.6 } }] });`);
fs.writeFileSync(b,d,"utf8");
console.log("FishMap1 已改：", /getOption\(\)/.test(d) ? "仍含 getOption" : "无 getOption");
