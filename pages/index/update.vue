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

		<view class="stock_box" @click="updateParticulars(2)">
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
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		updateParticulars() {
			uni.navigateTo({
				url: './updateParticulars'
			});
		}
	}
};
</script>

<style lang="less">
.content {
	border-top: 1px #efefef solid;
	margin: 10px;
}
.stock_box {
	display: flex;
	justify-content: space-around;
	border-radius: 10px;
	box-shadow: 1px 2px 11px 4px #e9e9e9;
	margin-top: 10px;
	padding: 20px 10px;
}
.stock_box view {
	line-height: 20px;
}
</style>
