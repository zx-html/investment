<template>
	<view class="">
		<view class="Top_bg"><image src="../../static/logo.png" mode=""></image></view>
		<view class="content">
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
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {}
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
	.introduce_text {
		// margin-top: 10px;
	}
}
</style>
