<template>
	<view>
		<view>{{ utils.timeTodate(format, timestamp) }}</view>
	</view>
</template>

<script>
import utils from './utils.filter.js';

export default {
	name: 'UniFomat',
	data() {
		return {
			utils: utils
		};
	},
	created() {
		console.log(this.timestr);
		
		// 如果传递来的是时间戳
		this.timestamp = "1585643684";
		this.timestamp = new Date(this.timestr).getTime();
	},
	props: {
		format: {
			type: [String],
			// default: 'Y-m-d H:i:s'
			// default: 'm-d H:i'
			default: "m"+"月"+"d"+"日"
		},
		timestr: {
			type: [String],
			default: ''
		}
	}
};
</script>

<style lang="scss"></style>
