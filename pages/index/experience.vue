<template>
	<view class="">
		<!-- <view :class="image_text"> -->
		<view class="" v-show="!particulars">
			<!-- 顶部老师介绍 -->
			<view :class="[Topfleg == true ? 'top_text' : 'top_text_fixed']">
				<view class="top_box" v-if="streaming !=''">
					<view class="card_top">
						<view class="card_head">
							<view class=""><image class="card_img" :src="streaming[0].value.teacherImg" mode=""></image></view>
							<view class="card_message">
								<view class="">
									{{streaming[0].value.teacherName}}
									<text style="margin-left: 6px;">({{streaming[0].value.level}})</text>
								</view>
								<view class="">执业号：{{streaming[0].value.sac}}</view>
							</view>
						</view>
						<view class="card_botton" @click="experience()">马上体验</view>
					</view>
					<view class="top_synopsis" v-if="Topfleg">
						<view class="">
						简介：
						</view>
						<view class="" style="text-indent: 2em;">
							{{streaming[0].value.intro}}
						</view>
					</view>
					<view class="top_adept" v-if="Topfleg">
						擅长:
						<view v-for="item in manifesto" :key="item.id">{{item}}</view>
						
					</view>
				</view>
			</view>
			
			<!-- 直播介绍 -->
			<view class="content">
				<view class="option">
					<view class="inv-h-w">
						<view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @click="Inv = 0">图文直播</view>
						<view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @click="Inv = 1">历史直播</view>
					</view>
				</view>
				<!-- 图文直播 -->
				<view v-if="streaming[0]" class="" v-show="Inv == 0">
					<view class="" v-if="streaming[0].value.way == 1">
						<view class="content_time">{{ streaming[0].value.publishTime | formatDate2 }}</view>
						<view class="content_title">
							<view class="">主题</view>
							<view class="">{{ streaming[0].value.title}}</view>
						</view>
						<view class="content_viewpoint"  v-for="(item,index) in streaming[0].value.childDto" :key="index">
							<view class="content_viewpoint1">
								{{item.publishTime | formatDate3}}
								<!-- 红点 -->
								<view class="content_indicate"></view>
							</view>
							<view class="content_viewpoint2"> {{item.title}}</view>
							<view class="content_viewpoint3" v-html="item.content">
								{{item.content}}
							</view>
							<view class="content_viewpoint4" v-if="item.linkTitle !='' || item.linkPath != ''"  @click="experience()"><text >#{{item.linkTitle}}#</text> <text>{{item.linkPath}}</text></view>
						</view>
					</view>
					
					<view style="text-align: center;"  v-if="streaming[0].value.way == 0">
						当前没有直播，请查看历史直播
					</view>
				</view>
				<!-- 历史直播 -->
				<view class="" v-show="Inv == 1" v-if="streaming[0]">
					<view class="" v-if="streaming[0].value.way == 0"  v-for="(item,index) in streaming" :key="index">
						<view class="history" @click="historyStreaming(item)">
							<view class="">{{ item.value.title }}</view>
							<!-- <view class="">{{item.value.publishTime | formatDate2}}</view> -->
						</view>
					</view>
					<view style="text-align: center;" v-if="streaming[0].value.way == 1">
						当前正在直播，请查看图文直播
					</view>
				</view>
			</view>
			
		</view>
		<!-- 历史直播 -->
		<view class="history_box" v-show="particulars" >
			<view class="" v-if="historychildDto!=''">
				<view class="content_time">
					<view class="">{{historychildDto.value.publishTime | formatDate2}}</view>
					<view class="" @click="historyDlt()">X</view>
				</view>
				
				<view class="content_title">
					<view class="">主题</view>
					<view class="">{{historychildDto.value.title}}</view>
				</view>
				<view class="content_viewpoint" v-for="(item,index) in historychildDto.value.childDto" :key="index">
					<view class="content_viewpoint1">
						{{item.publishTime | formatDate3}}
						<view class="content_indicate"></view>
					</view>
					<view class="content_viewpoint2"> {{item.title}}</view>
					<view class="content_viewpoint3" v-html="item.content">
						{{item.content}}
					</view>
					<view class="content_viewpoint4" v-if="item.linkTitle !='' || item.linkPath != ''" @click="experience()"><text >#{{item.linkTitle}}#</text> <text>{{item.linkPath}}</text></view>			
						
				</view>
			</view>

		</view>
	</view>
</template>

<script>
import http from '@/components/utils/http.js';
import { formatDate } from '@/components/tiem/tiem.js';
export default {
	data() {
		return {
			Inv: 0,
			scrollTop: '',
			Topfleg: true,
			particulars: false,
			streaming:"",
			manifesto:'',
			historychildDto:"",
			experiencenav:""
		};
	},
	//  时间戳转换
	filters: {
		formatDate(time) {
			time = time * 1000;
			let date = new Date(time);
			// return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			return formatDate(date, 'MM-dd hh:mm');
		},
		formatDate2(time) {
			time = time * 1000;
			let date = new Date(time);
			// return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			return formatDate(date, 'yyyy-MM-dd hh:mm');
		},
		formatDate3(time) {
			time = time * 1000;
			let date = new Date(time);
			// return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			return formatDate(date, 'MM-dd');
		}
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
					this.streaming = res.data.msg
					var streamingstr = this.streaming[0].value.manifesto;
					this.manifesto = streamingstr.split('/');
					console.log(this.streaming)
					console.log(res.data.msg[0])
					// way 等于 0 没有直播，显示历史直播
					if(this.streaming[0].value.way != 1){
						this.Inv = 1;
					}else{
					// way 等于 1 有直播，显示图文直播
						
					}
			},
			error => {
					console.log(error);
				}
		);
		uni.setNavigationBarTitle({
			title: '新的标题'
		});
	},
	methods: {
		changeTab(Inv) {
			this.navIdx = Inv;
		},

		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			if (e.scrollTop > 200) {
				this.Topfleg = false;
			} else {
				this.Topfleg = true;
			}
		},
		// 顶部立即购买点击事件
		experience() {
			uni.navigateTo({
				url: './choiceness?navid='+this.experiencenav
			});
		},
		historyStreaming(childDto) {
			this.particulars = !this.particulars;
			this.historychildDto = childDto;
			console.log(this.historychildDto)
		},
		historyDlt(){
			this.particulars = !this.particulars;
		}
	}
};
</script>

<style lang="less">
.content {
	padding: 10px;
}

.history_box {
	padding: 10px;
	margin-top: 10px;
	border-top: 1px solid #eeeeee;
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
	font-size: 14px;
	padding: 0 10px 10px 10px;
}
.top_adept {
	font-size: 14px;
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

// 选项卡
.inv-h-w {
	background-color: #ffffff;
	height: 30px;
	display: flex;
	justify-content: center;
	padding-bottom: 20px;
}
.inv-h {
	font-size: 30upx;
	text-align: center;
	color: #555555;
	line-height: 30px;
	margin-right: 10px;
	height: 32px;
	font-size: 14px;
}
.inv-h-se {
	color: #000;
	font-weight: bold;
	font-size: 15px;
	border-bottom: 2px solid #ff1417;
}
// 直播
.content_time {
	display: flex;
	justify-content: space-between;
	padding: 8px;
	background-color: #f4f4f4;
	border-radius: 10px;
	color: #333;
	font-size: 14px;
}
.content_time view:nth-child(1) {
	width: 88%;
	height: 30px;
	line-height: 30px;
	background-color: #f4f4f4;
	text-indent: 1em;
	border-radius: 5px;
	color: #555555;
}
.content_time view:nth-child(2) {
	width: 10%;
	height: 30px;
	line-height: 30px;
	background-color: #f4f4f4;
	border-radius: 5px;
	color: #555555;
	text-align: center;
}

.content_title {
	display: flex;
	padding: 15px 0;
	border-bottom: 1px solid #f3f3f3;
	margin-bottom: 20px;
	line-height: 25px;
}
.content_title view:nth-child(1) {
	width: 44px;
	height: 25px;
	background-color: #ff1417;
	color: #ffffff;
	border-radius: 5px;
	text-align: center;
	margin-right: 5px;
	line-height: 25px;
}
.content_title view:nth-child(2) {
	font-weight: bold;
	overflow: hidden; //超出的文本隐藏
	text-overflow: ellipsis; //溢出用省略号显示
	white-space: nowrap; //溢出不换行
}
.content_viewpoint {
	border-left: 1px solid #ccc;
	padding: 0 0 15px 5px;
}
.content_viewpoint1  {
	margin: 0px 0 10px 5px;
	position: relative;
	line-height: 13px;
}
.content_viewpoint2  {
	margin: 10px 0 10px 0px;
	font-weight: bold;
	font-size: 14px;
}
.content_viewpoint3 {
	margin: 10px 0 10px 5px;
	color: #555555;
}
.content_viewpoint4  {
	margin: 10px 0 10px 5px;
	color: #4b67f7;
}

.content_indicate {
	width: 7px;
	height: 7px;
	background-color: #ff1417;
	border-radius: 50%;
	position: absolute !important;
	left: -14px;
	top: 0px;
}

// 历史直播
.history {
	display: flex;
	justify-content: space-between;
	padding: 10px 0px;
	border-bottom: 1px #efefef solid;
}
.history view:nth-child(1) {
	width: 70%;
	overflow: hidden; //超出的文本隐藏
	text-overflow: ellipsis; //溢出用省略号显示
	white-space: nowrap; //溢出不换行
}
.history view:nth-child(2) {
	color: #a0a0a7;
	font-size: 12px;
	line-height: 20px;
}

page {
	width: 100%;
}
</style>
