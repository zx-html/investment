<template>
	<view class="">
		<view class="Top_bg"><image src="../../static/logo.png" mode=""></image></view>
		<view class="content">
			<!-- 卡片 -->
			<view class="introduce">
				<view class="introduce_title">
					<image src="../../static/Dingtalk_20210107174705.jpg" mode=""></image>
					<text>产品介绍</text>
					<image src="../../static/Dingtalk_20210107174705.jpg" mode=""></image>
				</view>
				<view class="introduce_text">
					开发者可以通过熟悉的 ECharts 配置方式，快速开发图表，满足各种可视化需求。 开发者可以通过熟悉的 ECharts 配置方式，快速开发图表，满足各种可视化需求。
					开发者可以通过熟悉的 ECharts 配置方式，快速开发图表，满足各种可视化需求。 开发者可以通过熟悉的 ECharts 配置方式，快速开发图表，满足各种可视化需求。
				</view>
			</view>
			
			<!-- 卡片 -->
			<view class="introduce">
				<view class="introduce_title">
					<image src="../../static/Dingtalk_20210107174705.jpg" mode=""></image>
					<text>标的描述</text>
					<image src="../../static/Dingtalk_20210107174705.jpg" mode=""></image>
				</view>
				<view class="introduce_text">
					<view class="">
						<text>是否创业板</text>
						<image src="../../static/Dingtalk_20210108092818.jpg" mode=""></image>
					</view>
					<view class="">
						<text>是否科创板</text>
						<image src="../../static/Dingtalk_20210108092818.jpg" mode=""></image>
					</view>
					
				</view>
			</view>
			
			<!-- 卡片 -->
			<view class="introduce">
				<view class="introduce_title">
					<image src="../../static/Dingtalk_20210107174705.jpg" mode=""></image>
					<text>标的类型</text>
					<image src="../../static/Dingtalk_20210107174705.jpg" mode=""></image>
				</view>
				<view class="introduce_text">
					<view class="">
						<text>激进型</text>
						<image src="../../static/Dingtalk_20210108092818.jpg" mode=""></image>
					</view>
					<view class="">
						<text>稳健型</text>
						<image src="../../static/Dingtalk_20210108092818.jpg" mode=""></image>
					</view>
					<view class="">
						<text>保守型</text>
						<image src="../../static/Dingtalk_20210108092818.jpg" mode=""></image>
					</view>
					
				</view>
			</view>
			
			<!-- 卡片 -->
			<view class="introduce">
				<view class="introduce_title">
					<image src="../../static/Dingtalk_20210107174705.jpg" mode=""></image>
					<text>标的亮点</text>
					<image src="../../static/Dingtalk_20210107174705.jpg" mode=""></image>
				</view>
				<view class="introduce_text">
					开发者可以通过熟悉的 ECharts 配置方式，快速开发图表，满足各种可视化需求。 开发者可以通过熟悉的 ECharts 配置方式，快速开发图表，满足各种可视化需求。
					开发者可以通过熟悉的 ECharts 配置方式，快速开发图表，满足各种可视化需求。 开发者可以通过熟悉的 ECharts 配置方式，快速开发图表，满足各种可视化需求。
				</view>
			</view>
			
		</view>
		
		<!-- 底部按钮 -->
		<view class="botton_box">
			<view class="botton" @click="payment()">
				<view class="">立即购买</view>	
			</view>
		</view>
	</view>

</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		payment(){
			uni.navigateTo({
				url: './investmentSilkBag'
			});
			
		}
	}
};
</script>

<style lang="less">
// 顶部背景图
.Top_bg {
	width: 100%;
	height: 200px;
	position: relative;
	top: 0;
	z-index: -1;
	image {
		width: 100%;
		height: 100%;
	}
}
.content {
	padding: 0 10px;
	margin-top: -40px;
	padding-bottom: 100px;
}

// 介绍
.introduce {
	box-shadow: 1px 2px 11px 4px #e9e9e9;
	background-color: #ffffff;
	border-radius: 10px;
	padding:0px 15px 20px 15px;
	margin-bottom: 10px;
	.introduce_title {
		width: 100%;
		text-align: center;
		border-radius: 10px;
		padding: 20px 0;

		image {
			width: 15px;
			height: 10px;
		}
		text {
			margin: 0 5px;
			font-size: 16px;
			font-weight: bold;
			color: #ff551e;
		}
	}
	
	.introduce_text{
		display: flex;
		justify-content: center;
	}
	.introduce_text view{		
		line-height: 30px;
		margin-right: 20px;
		image{
			width: 20px;
			height: 20px;
			margin-bottom: -5px;
		}
	}
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
	justify-content: center;
	line-height: 50px;
	background-image: linear-gradient(50deg, #FF6A21, #FF1113);
	border-radius: 50px;
	color: #FFFFFF;
	margin: 15px;
}

</style>
