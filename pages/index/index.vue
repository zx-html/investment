<template style="height: 100%;">
	<view class="content">
		<!-- 轮播图 -->
		<swiper
			class="card-swiper"
			:indicator-dots="true"
			:circular="true"
			autoplay="true"
			interval="2000"
			duration="500"
			@change="cardSwiper"
			indicator-color="#8799a3"
			indicator-active-color="#fff"
		>
			<swiper-item v-for="(item, index) in swiperList" :key="index" :class="cardCur == index ? 'cur' : ''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
				</view>
			</swiper-item>
		</swiper>
		<!-- 标题 -->
		<view class="title">
			<view></view>
			<view>大咖团队</view>
		</view>

		<!-- 卡片 -->
		<view class="card" v-for="(item, index) in contentData" :key="index">
			<view class="card_top">
				<view class="card_head">
					<view class="headPortrait" @click="experience(index)">
						<image class="card_img" :src="item.value.teacherImg"></image>
						<view class="liveStreaming " v-if="item.value.way == 1">
							<view class=""></view>
							<view id="MyliveStreaming">直播中</view>
						</view>
						<view class="liveStreaming2" v-if="item.value.way == 0">
							<view class=""></view>
							<view id="MyliveStreaming">历史直播</view>
						</view>
					</view>
					<view class="card_message">
						<view class="">
							{{item.value.teacherName}}
							<text style="margin-left: 6px;">({{item.value.level}})</text>
						</view>
						<view class="">执业号：{{item.value.sac}}</view>
					</view>
				</view>
				<view class="card_botton" @click="choiceness(index)">马上体验</view>
			</view>

			<view class="card_content">
				<view class="">成功率</view>
				<view class=""></view>
				<view class="">{{item.value.successRate}}%</view> 
			</view>

			<view class="card_button">
				 <navigator class="link_click" :url="item.value.linkPath" hover-class="navigator-hover">
				     # {{item.value.linkTitle}} #
				 </navigator>
				<view>{{item.value.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniSwiperDot from '../../components/uni-swiper-dot/uni-swiper-dot.vue';
import http from '@/components/utils/http.js';
export default {
	data() {
		return {
			dotStyle: true,
			swiperList: [
				{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				},
				{
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg'
				},
				{
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				},
				{
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}
			],
			cardCur: 0,
			oneData: "",
			contentData:[],
			navids:[]
		};
	},
	onLoad() {
		let opts = {
			url: '/user/columnPage/126/upRefresh',
			method: 'post'
		};
		http.httpTokenRequest(opts).then(
			res => {
				//打印请求返回的数据
				this.oneData = res.data.msg;
				var streamingNaviId  = '';
				for (var i in this.oneData) {
					// 保存naviId 请求详细数据
					streamingNaviId = this.oneData[i].naviId
					this.navids.push(this.oneData[i].naviId)
					// 获取详情数据ajax
					let streamingUrl = {
						url: '/user/columnPage/' + streamingNaviId + '/upRefresh',
						method: 'post'
					};
					http.httpTokenRequest(streamingUrl).then(
						res => {
							if(res.data.msg !=''){
								this.contentData.push(res.data.msg[0]) 
							}
						},
						error => {
							console.log(error);
						}
					);
				}
			},
			error => {
				console.log(error);
			}
		);
	},
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		// 直播详情
		experience(navidindex) {
			console.log(this.navids)
			uni.navigateTo({
				url: './experience?navid='+this.navids[navidindex]
			});

		},
		// 马上体验
		choiceness(navidindex) {
			uni.navigateTo({
				url: './choiceness?navid='+this.navids[navidindex]
			});
		},
		cardSwiper(e) {
			this.cardCur = e.detail.current;
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
		border-radius: 50%;
	}
	.card_message {
		line-height: 20px;
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
	
	.liveStreaming2 {
		font-size: 10px;
		position: absolute;
		top: 40px;
		left: -3px;
		border: 1px #D2D2D6 solid;
		border-radius: 50px;
		padding: 0 3px;
		display: flex;
		background-color: #ffffff;
		color: #D2D2D6;
		padding:0 5px;
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
	font-weight: bold;
	font-size: 14px;
}
.card_button {
	margin-top: 10px;
	// font-size: 12px;
	overflow: hidden; //超出的文本隐藏
	text-overflow: ellipsis; //溢出用省略号显示
	white-space: nowrap; //溢出不换行
	display: flex;
}
.card_button .link_click{
	font-weight: bold;
	color: #4b67f7;
	margin-right: 5px;
}
.card-swiper {
	image {
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
}

.cs {
}
</style>
