<template>
         <view class="container">
               <view>
                   <view class="canvasView">
                    <mpvue-echarts class="ec-canvas" @onInit="lineInit" canvasId="line" ref="lineChart" />
                </view>
               </view>
           </view>
</template>

<script>
    import * as echarts from '@/components/echarts/echarts.min.js';
    import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';
    export default {
        data() {
            return {
                updateStatus: false,
                line: {
                    legend: {
                        data: ['邮件营销']
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value',
                        data: []
                    },
                    dataZoom: [{
                        type: 'slider',
                        start: 30,
                        end: 100,
                        zoomLock: false,
                    }],
                    grid: {
                        left: 40,
                        right: 40,
                        bottom: 20,
                        top: 40,
                        containLabel: true
                    },
                    series: [{
                        data: [],
                        data: [60, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        color: ['#5eb4e2'], //折线条的颜色
                    }]
                }
            }
        },
        methods: {
            lineInit(e) {
                let {
                    width,
                    height
                } = e;
                let canvas = this.$refs.lineChart.canvas
                echarts.setCanvasCreator(() => canvas);
                let lineChart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                })
                canvas.setChart(lineChart)
                lineChart.setOption(this.line)
                this.$refs.lineChart.setChart(lineChart)
            },
        },
        components: {
            mpvueEcharts
        }
    }
</script>

<style>

    .ec-canvas {
        display: flex;
        height: 100%;
        flex: 1;
    }

    .canvasView {
        width: 700upx;
        height: 500upx;
    }
    
</style>
