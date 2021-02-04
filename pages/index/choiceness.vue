<template>
	<view class="">
		<!-- 顶部老师介绍 -->
		<view class="top_text">
			<view class="top_box" v-if="streaming != ''">
				<view class="card_top">
					<view class="card_head">
						<view class=""><image class="card_img" :src="streaming[0].value.teacherImg" mode=""></image></view>
						<view class="card_message">
							<view class="">
								{{ streaming[0].value.teacherName }}
								<text style="margin-left: 6px;">({{ streaming[0].value.level }})</text>
							</view>
							<view class="">执业号：{{ streaming[0].value.sac }}</view>
						</view>
					</view>
					<!-- <view class="card_botton" @click="experience()">马上体验</view> -->
				</view>
				<view class="top_synopsis" v-if="Topfleg">
					<view class="">简介：</view>
					<view class="" style="text-indent: 2em;">{{ streaming[0].value.intro }}</view>
				</view>
				<view class="top_adept" v-if="Topfleg">
					擅长:
					<view v-for="item in manifesto" :key="item.id">{{ item }}</view>
				</view>
			</view>
		</view>

		<view class="content">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in 10" :key="index" @tap="tabSelect" :data-id="index">
					
					<view class="" @click="navClick(index)">
						Tab{{index}}
					</view>
				</view>
			</scroll-view>
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
			<view>
				<view class="canvasView"><mpvue-echarts class="ec-canvas" @onInit="lineInit" canvasId="line" ref="lineChart" /></view>
			</view>
			<!-- 底部按钮 -->
			<view class="botton_box">
				<view class="botton" @click="payment()">
					<view style="font-size: 16px;">
						3000
						<text style="font-size: 10px;">元/月</text>
					</view>
					<view class=""></view>
					<view style="font-size: 16px;">立即购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import * as echarts from '@/components/echarts/echarts.min.js';
import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';
import http from '@/components/utils/http.js';
export default {
	data() {
		return {
			Topfleg: true,
			updateStatus: false,
			line: {
				tooltip: {
					trigger: 'axis'
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},

				xAxis: {
					type: 'category',
					boundaryGap: false,
					show: false,
					data: ['1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: '邮件营销',
						type: 'line',
						lineStyle: {
							color: 'red', //折线颜色
							width: 2 //折线宽度
						},
						data: [0.0, 0.01, -0.23, 0.5, 1.3, 0.8, 2.2, 4.6, 1.8, 5.1, 6.0, 3.4, 10.5, 11, 11.5, 14.1, 15, 11, 10, 9, 8.5, 6.4]
					}
				]
			},
			streaming: '',
			manifesto: '',
			TabCur: 0,    
			scrollLeft: 0  
		};
	},
	onLoad(option) {
		this.experiencenav = option.navid;
		// 获取详情数据ajax  option为跳转事件携带的参数
		let streaminglistUrl = {
			url: '/user/columnPage/' + option.navid + '/upRefresh',
			method: 'post'
		};
		http.httpTokenRequest(streaminglistUrl).then(
			res => {
				this.streaming = res.data.msg;
				var streamingstr = this.streaming[0].value.manifesto;
				this.manifesto = streamingstr.split('/');
				console.log(this.streaming);
				console.log(res.data.msg[0]);
			},
			error => {
				console.log(error);
			}
		);
		// 获取标的
		let objectUrl = {
			url: '/common/teacher_products',
			method: 'post'
		};
		http.httpTokenRequest(objectUrl).then(
			res => {
				console.log(res.data.msg);
			},
			error => {
				console.log(error);
			}
		);
	},
	methods: {
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
		silkBag() {
			uni.navigateTo({
				url: './silkBag'
			});
		},
		// 立即购买点击事件
		payment() {
			// alert("立即支付")
			uni.navigateTo({
				url: './investmentChoiceness'
			});
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
		},
		// 导航点击事件
		navClick(index){
			console.log(index)
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
		border-radius: 50%;
	}
	.card_message {
		// line-height: 20px;
		padding-top: 5px;
	}

	.card_message view:nth-child(1) {
		font-size: 14px;
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
	font-size: 14px;
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
	border-radius: 5px;
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
.botton_box {
	width: 100%;
	background-color: #fff;
	position: fixed;
	display: flex;
	// justify-content: center;
	bottom: 0;
	left: 0;
	text-align: center;
	z-index: 999;
	background-color: #ffffff;
	line-height: 50px;
	box-shadow: 3px -6px 10px 1px #f5eeee;
}

.botton {
	width: 90%;
	height: 50px;
	display: flex;
	justify-content: space-between;
	line-height: 50px;
	background-image: linear-gradient(50deg, #ff6a21, #ff1113);
	border-radius: 50px;
	color: #ffffff;
	margin: 15px;
}
.botton view {
	width: 50%;
}

.botton view:nth-child(2) {
	width: 1px;
	height: 20px;
	margin: auto;
	background-color: #ff6a59;
}
.button_title{
	display: flex;
	font-size: 14px;
	// width: 50px;
	height: 50px;
}
/* ==================
         导航栏
 ==================== */

.nav {
	white-space: nowrap;
}
::-webkit-scrollbar {
	display: none;
}

.nav .cu-item {
	height: 90upx;
	// display: inline-block;
	line-height: 90upx;
	margin: 0 10upx;
	padding: 0 20upx;
}

.nav .cu-item.cur {
	border-bottom: 4upx solid #de4a00;
}
.text-center {
	text-align: center;
}
.bg-white {
	background-color: #ffffff;
	color: #666666;
}
.flex {
	display: flex;
}

.flex-sub {
	flex: 1;
}

</style>
