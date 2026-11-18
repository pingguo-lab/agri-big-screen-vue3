<template>
    <div class="border">
        <div  class="chart-curve" ref="curve"></div>
    </div>
</template>

<script>
import { markRaw } from "vue"; // Vue3：图表实例必须 markRaw，否则被 Proxy 包住会崩

export default ({
    data(){
        return{
            myChart:null,
            airTemData:[],     //空气温度数据
            soilTemData:[],    //土壤温度数据
            temTime:[]
        }
        
    },
    props: {
        cAirTem: {
        type: Array,
        default: null,
        },
        cSoilTem: {
        type: Array,
        default: null,
        },
        cTemTime: {
        type: Array,
        default: null,
        }
        },
    created(){
        this.initTem();
    },

  
    mounted(){
        this.showChartData()
        this.startInterval();
    },
    methods:{
        startInterval: function () {
            if (this.timeId) {
                clearInterval(this.timeId);
                }
                this.timeId = setInterval(() => {
        this.initTem();
        this.showChartData();
      }, 1000);
    },
    initChart() {
      if (this.myChart === null) {
        this.myChart = markRaw(this.$echarts.init(this.$refs.curve,'chalk'));
      }
      return this.myChart; 
    },
    initTem(){
        this.airTemData=this.cAirTem.slice(0,10).reverse();
        this.soilTemData=this.cSoilTem.slice(0,10).reverse();
        this.temTime=this.cTemTime.slice(0,10).reverse();
    },
        //显示图表数据
        showChartData(){
            //this.chartInstance=this.$echarts.init(this.$refs.curve,'chalk');
            let result = this.initChart();
            window.addEventListener("resize", function () {result.resize();});
            let initOption={
                color:['#25D6BC','#FA1F2B','#009AFD'],
                /*title:{
                    text:'温度（℃）'
                },*/
                tooltip: {
                    trigger: 'axis'
                    
                },
                label: {
                    show: false,
                    position: 'top',
                    color:'#fff'
                    },
                legend: {
                    right: 10,
                    top: 0,
                    data:['空气温度','土壤温度'],
                },
                grid: {
                    top: "30%",
                    left: "3%",
                    right: "10%",
                    bottom: "1%",
                    containLabel: true,
                },
                animation:true,
                animationDuration: 1500,
                animationEasing:"cubicInOut", 
                xAxis: {
                    type: 'category',
                    name:'时刻',
                    data: this.temTime
                    },
                yAxis: {
                    type: 'value',
                    name:'单位：℃',
                    splitLine: {
                        show: true
                    },
                    axisLine: {
                        show: false
                    }
                    },
                series: [{
                    name:'空气温度',
                    type: 'line',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: this.airTemData,
                    areaStyle: {normal:{
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,
                        color: 'rgba(218, 57, 20, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(218, 57, 20, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                            }},
                    smooth: true
 
                },
                {
                    name:'土壤温度',
                    type: 'line',
                    lineStyle: {
                    normal: {
                        type: 'dotted'
                        }
                    },
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: this.soilTemData,
                    areaStyle: {normal:{
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,
                        color: 'rgba(232, 190, 49, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(232, 190, 49, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                            }},
                    smooth:true
 
                }]

            };
            result.setOption(initOption);
        }
    }
})
</script>
<style>

.chart-curve{
    width:100%;
    height:100%;
}
</style>