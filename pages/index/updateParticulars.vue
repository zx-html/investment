<template>
	<view class="content">
		<view class="stock_box" @click="updateParticulars(1)">
			<view class="">
				<p class="" style="font-size: 16px; font-weight: bold;">隆基股份</p>
				<p class="">600252</p>
			</view>
			<view class="" style="color: #C0C0C0;">
				<p class="">价格区间</p>
				<p class="">推荐时间</p>
			</view>
			<view class="" style="text-align: right;">
				<p class="" style="color: #ff1417; font-size: 14px; font-weight: bold;">+0.26</p>
				<p class="">2020-1-45 12.00</p>
			</view>
		</view>
		<view class="reason">
			<view class="reason_text">
				<view class="">
					推荐理由
				</view>
				<view class="">
					
				</view>
				<view class="">
					2020-1-45 12.00
				</view>
			</view>
			<view class="reason_content">
				Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。
				所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。
			</view>
		</view>
		<!-- 标题 -->
		<view class="title">
			<view></view>
			<view>跟踪服务</view>
		</view>
		
		<view class="tail_After">
			<view class="year">2020年</view>
			<view class="tail_content">
				<view class="">11.24</view>
				<view class="">
					Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。
					所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。
				</view>
			</view>
			<view class="tail_content">
				<view class="">11.24</view>
				<view class="">
					Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。
					所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less">
	.content{
		border-top: 1px #EFEFEF solid;
		margin: 10px;
	}
	.stock_box{
		display: flex;
		justify-content: space-around;
		// border-radius: 10px;
		// box-shadow: 1px 2px 11px 4px #e9e9e9;
		margin-top: 10px;
		padding: 20px 10px;
	}
	.stock_box view{
		line-height: 20px;
	}
	.stock_box view:nth-child(1){
		width: 30%;
		border-right: 1px #EFEFEF solid;
	}
	.reason{
		background-color: #F5F5F5;
		border-radius: 10px;
	}
	.reason_text{
		display: flex;
		padding: 10px;
		border-bottom: 1px #E6E6E6 solid;
		line-height: 20px;
	}
	.reason_text view:nth-child(1){
		font-size: 14px;
		font-weight: bold;
	}

	.reason_text view:nth-child(2){
		width: 1px;
		height: 12px;
		background-color: #E6E6E6;
		margin:4px 10px;
	}
	.reason_content{
		font-size: 14px;
		padding: 10px;
	}
	// 标题
	.title {
		display: flex;
		margin: 20px 0;
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
	//下部时间轴
	.year{
		font-size: 14px;
		font-weight: bold;
	}
	
	.tail_content view:nth-child(1){
		margin-left: 5px;
	}
	.tail_content view:nth-child(2){
		border-left: 1px #ccc solid !important;
		padding:0 10px 10px 10px;
		margin-left: 20px;
	}
</style>
