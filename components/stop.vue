<script>
	
	export default {
	    data: {
	        text: 'uni-app'
	    },
	    onLoad: function (options) {
	        setTimeout(function () {

	        }, 1000);
	        // uni.startPullDownRefresh();
	        // uni.startPullDownRefresh({
	        //     success：function(res){
	        //         console.log(res);  //success 返回参数说明
	        //     }
	        // });  //这里表示当进入页面的时候就开始执行下拉刷新动画
	    },
	    onPullDownRefresh() {
	        //监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
	
	        setTimeout(function () {
	            uni.stopPullDownRefresh();  //停止下拉刷新动画
	        }, 1000);
	    }
	}
	
</script>