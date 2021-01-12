<template>
	<view class="content">
		<view class="top_bg">
			<view class="top_text">
				<view @click="top_clicks('top_left')" :class="['top_text_left', top_click == 'top_left' ? 'top_border' : '']">
					<view class="">正在抢购</view>
					<view class="">决策实战</view>
					<view class="">
						300
						<text>元/季</text>
					</view>
				</view>
				<view :class="['top_text_right', top_click == 'top_right' ? 'top_border' : '']" @click="top_clicks('top_right')">
					<view class="">正在抢购</view>
					<view class="">财富日刊</view>
					<view class="">
						300
						<text>元/季</text>
					</view>
				</view>
			</view>

			<view class="payment_box">
				<view class="payment" @click="select_payment('Alipay')">
					<view class="">
						<image src="../../static/touxian.png" mode=""></image>
						<text>支&nbsp;&nbsp;付&nbsp;&nbsp;宝</text>
						<view class="">推荐</view>
					</view>
					<view class=""><image :src="flag == 'Alipay' ? '../../static/Dingtalk_20210108092818.jpg' : '../../static/Dingtalk_20210108092828.jpg'" mode=""></image></view>
				</view>
				<view class="payment" @click="select_payment('WeChatPay')">
					<view class="">
						<image src="../../static/touxian.png" mode=""></image>
						<text>微信支付</text>
						<view class="">推荐</view>
					</view>
					<view class="">
						<image :src="flag == 'WeChatPay' ? '../../static/Dingtalk_20210108092818.jpg' : '../../static/Dingtalk_20210108092828.jpg'" mode=""></image>
					</view>
				</view>
				<view class="payment" @click="select_payment('Unionpay')">
					<view class="">
						<image src="../../static/touxian.png" mode=""></image>
						<text>银行卡支付</text>
					</view>
					<view class="">
						<image :src="flag == 'Unionpay' ? '../../static/Dingtalk_20210108092818.jpg' : '../../static/Dingtalk_20210108092828.jpg'" mode=""></image>
					</view>
				</view>

				<!-- 公司执照 -->
				<view class="license">
					<image src="../../static/logo.png" mode=""></image>
					<image src="../../static/logo.png" mode=""></image>
				</view>
			</view>

			<!-- 底部点击按钮 -->
			<view class="botton_box">
				<view class="botton">
					<view class="">
						合计: 100
						<text style="font-size: 12px; margin-left: 5px;">元</text>
					</view>
					<view class=""></view>
					<view class="" @click="payment()">立即支付</view>
				</view>
			</view>
		</view>

		<!-- 弹出层 -->
		<view class="pop-up" v-show="particulars">
			<view class="fxcp">
				<image src="../../static/fxcp.jpg" mode=""></image>
				<view class="">01.实名认证</view>
				<view class="" style="margin-left: -62px;">|</view>
				<view class="">02.风险测评</view>
				<view class="">完成认证后继续支付</view>
				<view class="" @click="authentication()">去认证</view>
				<view class="" @click="particularsr()">X</view>
			</view>
		</view>
	</view>
</template>

<script>
import http from '@/components/utils/http.js';
export default {
	data() {
		return {
			flag: 'Alipay',
			top_click: 'top_left',
			compliance: '已填写', //已填写
			particulars: false
		};
	},
	onLoad() {
		// 请求appid，商家信息等等
		http.httpRequest(
			{
				url: '/pc_client/login/1', //接口地址
				method: 'POST' //请求方法
			},
			{
				submitStatus: 1 //参数部分
			}
		).then(
			res => {
				console.log(res)
			},
			error => {
				console.log('网络请求错误，请稍后重试！');
				return;
			}
		);
	},
	methods: {
		// 头部产品选择
		top_clicks(val) {
			console.log(val);
			if (val == 'top_left') {
				this.top_click = val;
			}
			if (val == 'top_right') {
				this.top_click = val;
			}
		},
		// 支付方式选择
		select_payment(val) {
			this.flag = val;
		},
		// 前往风险测评
		authentication() {
			alert('风险测评');
		},

		// 确认支付
		payment() {
			//已经填写完毕风险测评
			if (this.compliance == '已填写') {
				if (this.flag == 'Alipay') {
					alert('支付宝支付');
				}
				if (this.flag == 'WeChatPay') {
					alert('微信支付');
				}
				if (this.flag == 'Unionpay') {
					alert('银联支付');
				}
			} else {
				// 未填写风险测评
				this.particularsr();
			}
		},
		// 弹出层
		particularsr() {
			this.particulars = !this.particulars;
		}
	}
};
</script>

<style lang="less">
page {
	// padding: 10px;
	background-color: #f4f4f4;
	font-size: 14px;
}
.content {
	width: 100%;
	height: 100%;
}
// 顶部详情
.top_bg {
	// width: 100%;
	height: 180px;
	// padding: 10px;
	// margin: 10px;
	position: relative;
	image {
		width: 100%;
		height: 100%;
	}
}
.top_text {
	display: flex;
	justify-content: center;
	text-align: center;
	background-color: #ffffff;
	padding: 10px;
	border-top: 1px #e7e7e7 solid;
}
.top_border {
	border: 1px #ff1417 solid !important;
	background-image: linear-gradient(80deg, #fff, #ffe6e7);
}

.top_text_left {
	border: 1px #e7e7e7 solid;
	border-radius: 10px;
	width: 50%;
	height: 40px;
	padding: 30px 0;
	margin-right: 10px;
	position: relative;
}
.top_text_left view:nth-child(1) {
	background-color: #ff1417;
	color: #ffffff;
	padding: 2px 5px;
	position: absolute;
	border-radius: 10px 0 10px 0;
	top: 0;
	left: 0;
	font-size: 12px;
}
.top_text_left view:nth-child(2) {
	font-weight: bold;
}
.top_text_left view:nth-child(3) {
	font-size: 16px;
	color: #ff1417;
	font-weight: bold;
}
.top_text_right {
	border: 1px #e7e7e7 solid;
	border-radius: 10px;
	width: 50%;
	height: 40px;
	padding: 30px 0;
	position: relative;
}
.top_text_right view:nth-child(1) {
	background-color: #ff1417;
	color: #ffffff;
	padding: 2px 5px;
	position: absolute;
	border-radius: 10px 0 10px 0;
	top: 0;
	left: 0;
	font-size: 12px;
}

.top_text_right view:nth-child(2) {
	font-weight: bold;
}
.top_text_right view:nth-child(3) {
	font-size: 16px;
	color: #ff1417;
	font-weight: bold;
}

.payment_box {
	background-color: #ffffff;
	border-radius: 10px;
	margin-top: 10px;
	padding: 10px;
	margin: 10px;
}

.payment {
	display: flex;
	justify-content: space-between;
	line-height: 30px;
	border-bottom: 1px #e9e9e9 solid;
	margin: 10px 0;
	view {
		text {
			margin: 0 15px;
		}
		image {
			width: 30px;
			height: 30px;
		}
		view {
			background-color: #ff1417;
			width: 40px;
			height: 20px;
			line-height: 20px;
			margin-top: 5px;
			color: #ffffff;
			border-radius: 50px;
			text-align: center;
		}
	}
}
.payment view:nth-child(1) {
	display: flex;
}
.license {
	width: 100%;
	background-color: #ffffff;
	border-radius: 10px;
	margin-top: 15px;
	padding-bottom: 100px;
}
.license image {
	width: 100%;
	height: 200px;
}
// 底部按钮
.botton_box {
	width: 100%;
	background-color: #fff;
	position: fixed;
	display: flex;
	justify-content: center;
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
	line-height: 50px;
	background-image: linear-gradient(50deg, #ff6a21, #ff1113);
	border-radius: 50px;
	color: #ffffff;
	margin: 15px;
}

.botton view {
	width: 50%;
	text-align: center;
}
.botton view:nth-child(2) {
	width: 1px;
	height: 20px;
	margin: auto;
	background-color: #ff6a59;
}
.pop-up {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
}
.fxcp {
	margin: auto;
	margin-top: 40%;
	width: 70%;
	// height: 170px;
	text-align: center;
	background-color: #ffffff;
	padding-bottom: 20px;
	border-radius: 10px;
	position: relative;
}
.fxcp view:nth-child(2) {
	margin-top: 10px;
	font-weight: bold;
	font-size: 15px;
}
.fxcp view:nth-child(4) {
	font-weight: bold;
	font-size: 15px;
}
.fxcp view:nth-child(5) {
	margin: 10px 0;
	color: #a0a0a7;
}
.fxcp view:nth-child(6) {
	width: 80%;
	height: 40px;
	background-image: linear-gradient(50deg, #ff6a21, #ff1113);
	margin: auto;
	border-radius: 50px;
	line-height: 40px;
	color: #fff;
}
.fxcp view:nth-child(7) {
	position: absolute;
	top: 10px;
	right: 10px;
}
.fxcp image {
	width: 100%;
	height: 170px;
}
</style>
