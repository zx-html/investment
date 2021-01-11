<template>
	<view class="">
		<!-- 顶部老师介绍 -->
		<view :class="[Topfleg == true ? 'top_text' : 'top_text_fixed']">
			<view class="top_box">
				<view class="card_top">
					<view class="card_head">
						<view class=""><image class="card_img" src="../../static/touxian.png" mode=""></image></view>
						<view class="card_message">
							<view class="">
								童日春
								<text style="margin-left: 6px;">(首席投顾)</text>
							</view>
							<view class="">执业号：132552455652325</view>
						</view>
					</view>
				</view>
				<view class="top_synopsis" v-if="Topfleg">
					简介:CSS阴影效果(Box-shadow)用法趣味讲解分享: 使用Box-shadow属性表现阴影效果是现代浏览器中是一个非常有用的技巧, 通过它我们可以做出很多非常酷的东西。让我们来一
					CSS阴影效果(Box-shadow)用法趣味讲解分享: 使用Box-shadow属性表现阴影效果是现代浏览器中是一个非常有用的技巧, 通过它我们可以做出很多非常酷的东西。让我们来一.
				</view>
				<view class="top_adept" v-if="Topfleg">
					擅长:
					<view>短线</view>
					<view>很多非常</view>
					<view>短线</view>
					<view>很多非常</view>
				</view>
			</view>
			<!-- 底部点击按钮 -->
			<view class="botton_box">
				<view class="botton">
					<view class="">3000 <text style="font-size: 12px;">元/月</text> </view>
					<view class=""></view>
					<view class="" @click="payment()">立即购买</view>	
				</view>
			</view>
		</view>

		<view class="content">
			<!-- 标题 -->
			<view class="title">   
				<view></view>
				<view>标的特点</view>
			</view>
			<view>使用Box-shadow属性表现阴影效果是现</view>
			<view>使用Box-shadow属性表现阴影效果是现使用Box-shadow属性表现阴影效果是现代浏览器中</view>
			<view>使用Box-shadow属性表现阴影效果是现代器中</view>
			<view>使用Box-shadow属性表现阴影现代览器中</view>
			<view>使用Box-shadow属性表现阴影效现代浏览器中</view>
			
			<!-- 锦囊 -->
			<view class="silkBag" @click="silkBag()"><image src="../../static/logo.png" mode=""></image></view>
			
			<!-- 标题 -->
			<view class="title">
				<view></view>
				<view>标的收益</view>
			</view>
			
			<!-- 图表 -->
			<view >
				<view class="canvasView"><mpvue-echarts class="ec-canvas" @onInit="lineInit" canvasId="line" ref="lineChart" /></view>
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
			Topfleg: true,
			updateStatus: false,
			line: {
				tooltip: {
					trigger: 'axis'
				},
				legend: {
				    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
				},   
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				// toolbox: {
				// 	feature: {
				// 		saveAsImage: {}
				// 	}
				// },
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '周五', '周六', '周日']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: '邮件营销',
						type: 'line',
						stack: '总量',
						data: [120, 132, 101, 134, 90, 230, 210, 90, 230, 210]
					}
				]
			}
		
		};
	},
	onLoad() {},
	methods: {
		onPageScroll(e) {
			// this.scrollTop = e.scrollTop;
			// if (e.scrollTop > 50) {
			// 	this.Topfleg = false;
			// } else {
			// 	this.Topfleg = true;
			// }
		},


		// 图表事件
		lineInit(e) {
			let { width, height } = e;
			let canvas = this.$refs.lineChart.canvas;
			echarts.setCanvasCreator(() => canvas);
			let lineChart = echarts.init(canvas, null, {
				width: width,
				height: height
			});
			canvas.setChart(lineChart);
			lineChart.setOption(this.line);
			this.$refs.lineChart.setChart(lineChart);
		},
		// 锦囊点击事件
		silkBag(){
			uni.navigateTo({
				url: './silkBag'
			});
		},
		// 立即购买点击事件
		payment(){
			// alert("立即支付")
			uni.navigateTo({
				url: './investmentChoiceness'
			});
		}
			
	},
	components: {
		mpvueEcharts
	}

};
</script>

<style lang="less">
.content {
	padding: 10px;
}

// 顶部老师介绍
.card_top {
	display: flex;
	justify-content: space-between;
	padding: 10px;
}

.card_head {
	display: flex;
	.card_img {
		width: 40px;
		height: 40px;
		margin-right: 5px;
	}
	.card_message {
		// line-height: 20px;
		padding-top: 5px;
	}

	.card_message view:nth-child(1) {
		font-size: 12px;
	}
	.card_message view:nth-child(2) {
		font-size: 10px;
		color: #c0c0c0;
	}
}
.card_botton {
	width: 100px;
	height: 30px;
	line-height: 30px;
	// background-color: #ff1417;
	background-image: linear-gradient(50deg, #ff4e50, #ff1417);
	text-align: center;
	border-radius: 50px;
	margin-top: 2px;
	color: #ffffff;
}
.top_text {
	padding: 10px;
	background-image: linear-gradient(180deg, #ff4e50, #fffefe);
}
.top_text_fixed {
	padding: 10px;
	background-image: linear-gradient(180deg, #ff4e50, #fffefe);
	position: fixed;
	width: 95.5%;
	z-index: 999;
}

.top_box {
	background-color: #ffffff;
	border-radius: 10px;
}
.top_synopsis {
	font-size: 12px;
	padding: 0 10px 10px 10px;
}
.top_adept {
	display: flex;
	justify-content: space-around;
	padding-bottom: 10px;
}
.top_adept view {
	background-color: #ffe7e7;
	padding: 2px 5px;
	border-radius: 6px;
	color: #ff1417;
}
// 标题
.title {
	display: flex;
	margin: 10px 0;
}
.title view:nth-child(1) {
	width: 5px;
	height: 20px;
	font-weight: bold;
	margin-right: 5px;
	background-color: #ff1417;
	border-radius: 30%;
}
.title view:nth-child(2) {
	line-height: 20px;
	font-weight: bold;
}
// 锦囊
.silkBag {
	width: 100%;
	height: 150px;
	margin: 10px 0;
	image {
		width: 100%;
		height: 100%;
	}
}

.canvasView {
	width: 100%;
	height: 300px;
	margin-bottom: 100px;
}

// 底部按钮
.botton_box{
	width: 100%;
	background-color: #fff;
	position: fixed;
	display: flex;
	justify-content: center;
	bottom: 0;
	left: 0;
	text-align: center;
	z-index: 999;
	background-color: #FFFFFF;
	line-height: 50px;
	box-shadow:  3px -6px 10px 1px #f5eeee;
}

.botton{
	width: 90%;
	height: 50px;
	display: flex;
	line-height: 50px;
	background-image: linear-gradient(50deg, #FF6A21, #FF1113);
	border-radius: 50px;
	color: #FFFFFF;
	margin: 15px;
}


.botton view{
	width: 50%;
	text-align: center;
}
.botton view:nth-child(2){
	width: 1px;
	height: 20px;
	margin: auto;
	background-color: #FF6A59;
}
</style>
