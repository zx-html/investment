<template>
	<view class="content">
		<view class="top_bg" >
			<image src="../../static/logo.png" mode=""></image>
			<view class="top_text">
				<view class="">锦囊一次</view>
				<view class="">100 <text>元/次</text> </view>
				<view class="">300 <text>元/次</text> </view>
			</view>
			
			<view class="payment_box">
				<view class="payment" @click="select_payment('Alipay')">
					<view class="">
						<image src="../../static/touxian.png" mode=""></image>
						<text>支&nbsp;&nbsp;付&nbsp;&nbsp;宝</text>
						<view class="">推荐</view>
					</view>
					<view class="">
						<image :src="flag == 'Alipay'? '../../static/Dingtalk_20210108092818.jpg' : '../../static/Dingtalk_20210108092828.jpg' " mode=""></image>
					</view>
				</view>
				<view class="payment" @click="select_payment('WeChatPay')">
					<view class="">
						<image src="../../static/touxian.png" mode=""></image>
						<text>微信支付</text>
						<view class="">推荐</view>
					</view>
					<view class="">
						<image :src="flag == 'WeChatPay'? '../../static/Dingtalk_20210108092818.jpg' : '../../static/Dingtalk_20210108092828.jpg' " mode=""></image>
					</view>
				</view>
				<view class="payment" @click="select_payment('Unionpay')">
					<view class="">
						<image src="../../static/touxian.png" mode=""></image>
						<text>银行卡支付</text>
					</view>
					<view class="">
						<image :src="flag == 'Unionpay'? '../../static/Dingtalk_20210108092818.jpg' : '../../static/Dingtalk_20210108092828.jpg' " mode=""></image>
					</view>
				</view>
			</view>
			
			<!-- 公司执照 -->
			<view class="license">
				<image src="../../static/logo.png" mode=""></image>
				<image src="../../static/logo.png" mode=""></image>
			</view>
			
			
			<!-- 底部点击按钮 -->
			<view class="botton_box">
				<view class="botton">
					<view class="">合计: 100 <text style="font-size: 12px; margin-left: 5px;">元</text> </view>
					<view class=""></view>
					<view class="" @click="payment()">立即支付</view>	
				</view>
			</view> 	
		</view>
		

		<!-- 弹出层 -->
		<view class="pop-up" v-show="particulars" >
			<view class="fxcp">
				<image src="../../static/fxcp.jpg" mode=""></image>
				<view class="">01.实名认证</view>
				<view class="" style="margin-left: -62px;">|</view>
				<view class="">02.风险测评</view>
				<view class="">完成认证后继续支付</view>
				<view class="">去认证</view>
				<view class="" @click="particularsr()">X</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag:"Alipay",
				compliance:"已填写",
				particulars:false
			}
		},
		onLoad() {

		},
		methods: {
			select_payment(val){
				this.flag = val
			},
			payment(){
				
				if(this.compliance == "已填写"){
					if(this.flag == "Alipay"){
						alert("支付宝支付")
					}
					if(this.flag == "WeChatPay"){
						alert("微信支付")
					}
					if(this.flag == "Unionpay"){
						alert("银联支付")
					}
				}else{
					this.particularsr()
				}
				
			},
			// 弹出层
			particularsr(){
				this.particulars = !this.particulars;
			}
				
		}
	}
</script>

<style lang="less">
	page{
		padding: 10px;
		background-color: #F4F4F4;
		font-size: 14px;
	}
	.content{
			width: 100%;
			height: 100%;
		}
	// 顶部详情
	.top_bg{
		width: 100%;
		height: 180px;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.top_text{
		text-align: center;
		width: 50%;
		position: absolute;
		top: 22%;
		left: 25%;
		line-height: 30px;
		color: #fff;
	}
	.top_text view:nth-child(2){
		font-size: 20px;
		font-weight: bold;
		text{
			font-size: 10px;
			font-weight: normal;
		}
	}
	.top_text view:nth-child(3){
		font-weight: bold;
		color: #ccc;
		text-decoration: line-through;
		text{
			font-weight: normal;
			text-decoration: line-through;
		}
	}
	
	.payment_box{
		background-color: #FFFFFF;
		border-radius: 10px;
		margin-top: 10px;
		padding: 10px;
	}
	
	.payment{
		display: flex;
		justify-content: space-between;
		line-height: 30px;
		border-bottom: 1px #e9e9e9 solid;
		margin: 10px 0;
		view{
			
			text{
				margin: 0 15px;
			}
			image{
				width: 30px;
				height: 30px;
			}
			view{
				background-color: #ff1417;
				width: 40px;
				height: 20px;
				line-height: 20px;
				margin-top: 5px;
				color: #FFFFFF;
				border-radius: 50px;
				text-align: center;
			}
		}
	}
	.payment view:nth-child(1){
		display: flex;
		
	}
	.license{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 10px;
		margin-top: 15px;
		padding-bottom: 100px;
		
	}
	.license image{
		width: 100%;
		height: 200px;
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
	.pop-up{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.7);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		
	}
	.fxcp{
		margin: auto;
		margin-top: 40%;
		width: 70%;
		// height: 170px;
		text-align: center;
		background-color: #FFFFFF;
		padding-bottom: 20px;
		border-radius: 10px;
		position: relative;
	}
	.fxcp view:nth-child(2){
		margin-top: 10px;
		font-weight: bold;
		font-size: 15px;
	}
	.fxcp view:nth-child(4){
		font-weight: bold;
		font-size: 15px;
	}
	.fxcp view:nth-child(5){
		margin: 10px 0;
		color:#A0A0A7 ;
	}
	.fxcp view:nth-child(6){
		width: 80%;
		height: 40px;
		background-image: linear-gradient(50deg, #FF6A21, #FF1113);
		margin: auto;
		border-radius: 50px;
		line-height: 40px;
		color: #fff;
	}
	.fxcp view:nth-child(7){
		position: absolute;
		top: 10px;
		right: 10px;
		
	}
	.fxcp image{
		width: 100%;
		height: 170px;
	}
	
</style>
