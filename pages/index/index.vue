<template style="height: 100%;">
	<view class="content">
		<!-- 轮播图 -->
		<uni-swiper-dot :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view :class="item.colorClass" class="swiper-item"><image class="swiperimage" :src="item.url" mode="aspectFill" /></view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<!-- 标题 -->
		<view class="title">
			<view></view>
			<view>大咖团队</view>
		</view>

		<!-- 卡片 -->
		<view class="card">
			<view class="card_top">
				<view class="card_head">
					<view class="headPortrait" @click="experience()">
						<image class="card_img" src="../../static/touxian.png"></image>
						<view class="liveStreaming ">
							<view class=""></view>
							<view id="MyliveStreaming">直播中</view>
						</view>
					</view>
					<view class="card_message">
						<view class="">
							童日春
							<text style="margin-left: 6px;">(首席投顾)</text>
						</view>
						<view class="">执业号：132552455652325</view>
					</view>
				</view>
				<view class="card_botton" @click="choiceness()">马上体验</view>
			</view>

			<view class="card_content">
				<view class="">成功率</view>
				<view class=""></view>
				<view class="">97.6%</view>
			</view>

			<view class="card_button">
				<text># 产品标题 #</text>
				<text>使用Box-shadow属性表现阴影效果是现代浏览器中是一个非常有用的技巧,</text>
			</view>
		</view>
	</view>
</template>

<script>
import uniSwiperDot from '../../components/uni-swiper-dot/uni-swiper-dot.vue';
export default {
	data() {
		return {
			info: [
				{
					url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg'
				},
				{
					url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg'
				},
				{
					url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg'
				}
			],

			modeIndex: -1,
			styleIndex: -1,
			current: 0,
			mode: 'round',
			dotsStyles: {
				width: 8,
				height: 5,
				bottom: 10,
				backgroundColor: 'rgba(255, 255, 255, 0.3)',
				selectedBackgroundColor: '#fff', // 选中样式
				selectedBorder: '1px rgb(255, 255, 255) solid'
			}
		};
	},
	onLoad() {},
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		// 马上体验点击事件
		experience() {
			uni.navigateTo({
				url: './experience'
			});
			// var MyliveStreaming = document.getElementById("MyliveStreaming")
			// 	MyliveStreaming.innerHTML="aaaa"
			// 	console.log(MyliveStreaming)
		},
		// 跳转投顾精选
		choiceness() {
			uni.navigateTo({
				url: './choiceness'
			});
		}
	}
};
</script>

<style lang="less">
.content {
	padding: 10px;
	border-top: 1px #e9e9e9 solid;
}

// 轮播图
.swiper-box {
	width: 100%;
	height: 150px;
}
.swiper-item {
	width: 100%;
	height: 100%;
}
.swiperimage {
	width: 100%;
	height: 100%;
	border-radius: 10px;
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
	font-size: 16px;
}
// 卡片
.card {
	padding: 10px;
	border-radius: 10px;
	box-shadow: 1px 2px 11px 4px #e9e9e9;
	margin-bottom: 15px;
}

.card_top {
	display: flex;
	justify-content: space-between;
}

.card_head {
	display: flex;
	position: relative;
	.card_img {
		width: 50px;
		height: 50px;
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

.headPortrait {
	.liveStreaming {
		font-size: 10px;
		position: absolute;
		top: 40px;
		left: 0px;
		border: 1px #ff1417 solid;
		border-radius: 50px;
		padding: 0 3px;
		display: flex;
		background-color: #ffffff;
		color: #ff1417;
	}
	.liveStreaming view:nth-child(1) {
		margin: 6px 3px 0 0;
		width: 5px;
		height: 5px;
		background-color: #ff1417;
		border-radius: 50%;
	}
	.liveStreamingBox {
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
.card_content {
	width: 100%;
	height: 40px;
	display: flex;
	border-radius: 10px;
	justify-content: space-between;
	background-color: #f4f4f4;
	margin-top: 10px;
}
.card_content view {
	width: 50%;
	text-align: center;
	line-height: 40px;
}
.card_content view:nth-child(1) {
	color: #a0a0a7;
}
.card_content view:nth-child(2) {
	width: 2px;
	height: 25px;
	margin: auto;
	background-color: #dfdfe1;
}
.card_content view:nth-child(3) {
	color: #ff1417;
}
.card_button {
	margin-top: 10px;
	// font-size: 12px;
	overflow: hidden; //超出的文本隐藏
	text-overflow: ellipsis; //溢出用省略号显示
	white-space: nowrap; //溢出不换行
}
.card_button text:nth-child(1) {
	color: #4b67f7;
	margin-right: 5px;
}

.cs {
}
</style>
