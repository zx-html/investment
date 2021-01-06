<template name="page-head">
	<view class="service" @tap="openmsg()">
		<image :src="ImgUrl16_01" class="service_image" ></image>
		<text  class="titles" style="color: #CF2D28;" v-show="this.userText>0">{{this.userText}}</text>

	</view>
	

</template>

<script type="text/javascript">
	import Chat from '@/pages/Chat/Chat.vue';
	import http from '@/components/utils/http.js';

	export default {
		data() {
			
			return {
				userText:0,
				ImgUrl16_01:"",
			};
		},
		methods: {
			openmsg(){
			        let url_method = {
			          // 获取个人信息  Ajax
			          url: '/customer/getCustomerInfor',
			          method: 'post'
			        };
			        let parmeters = {};
			        http.httpRequest(url_method,parmeters).then(
			          res => {
			            if(res.data.code == 0){
			              //数据获取成功，客户存入缓存
			              localStorage.setItem("customer", JSON.stringify(res.data.msg));
			              uni.navigateTo({
			                url: '/pages/Chat/Chat',
			              });
			            }else{
							http.backLoginPage("登录失效");
							
			            }
			          },
			          error => {
			            console.log(error);
			          }
			        );			            
			      }
				  
				  
				 
			
		},
		created () {
					// this.userText = this.$store.state.userText	
						// 图片网络地址
						this.ImgUrl16_01 = http.ImgUrl+"16_01咨询_button_default@3x.png";
		        },
	};
</script>
<style lang="less">
	.titles{
		width: 10px;
		height: 10px;
		position: absolute;
		top: -12px;
		right: 10px;
		z-index: 9999;
	}

	.service {
		position: fixed;
		bottom: 65px;
		right: 30rpx;
		z-index: 999;

		.service_image {
			width: 60px;
			height: 60px;
		}
	}

	
</style>
