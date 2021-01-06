import jquery from '@/components/jquery.js';
// const baseUrl = 'http://pro.djc888.com/djc-serve';
// const baseUrl = 'http://chenxiong.host/djc-serve';
const baseUrl = 'http://192.168.10.63:8080/djc-serve';
// 网络图片地址拼接
const ImgUrl = "http://app1.djc888.com:10000/static/tg_wechat/static/";

//测试环境 test  正式环境 official
const environment_test = 'test';
const environment_official = 'official';
const environment = environment_test;


const httpRequest = (opts, data) => {
    let httpDefaultOpts = {
        url: baseUrl+opts.url,
        data: data,
        method: opts.method,
        header: opts.method == 'get' ? {
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
    } : {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
        dataType: 'json',
    }
    let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
                resolve(res[1])
            }
        ).catch(
            (response) => {
                reject(response)
            }

        )
    },2000)
    return promise
};
//次方法token用传入值
const httpRequest_token = (opts, data,token) => {
    let httpDefaultOpts = {
        url: baseUrl+opts.url,
        data: data,
        method: opts.method,
		header: opts.method == 'get' ? {
			'access_token': token,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'access_token': token,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
        dataType: 'json',
    }
    let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
                resolve(res[1])
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )
    },2000)
    return promise
};
//返回首页并提示
function backLoginPage(val){
	var isWechat = isWeiXin();
	if(isWechat){
		location.href = baseUrl+"/customer/index";
	}else{
		//提示
		if(val != null){
			setTimeout(function() {
				uni.showToast({
					title: val,
					icon: 'none'
				});	
			}, 1000);	
		}
		//保存账户密码
		var usernamesData = localStorage.getItem("account");
		var passwordsData = localStorage.getItem("password");
		var PhoneValData = localStorage.getItem("PhoneVal");
		localStorage.clear();
		if(usernamesData != null){
			localStorage.setItem("account",usernamesData);
		}
		if(passwordsData != null){
			localStorage.setItem("password",passwordsData);
		}
		if(PhoneValData != null){
			localStorage.setItem("PhoneVal",PhoneValData);
		}	
		uni.navigateTo({
			url: '/pages/login/login'
		});
	}
	
}
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
//校验客户有效性
function customerValid(){
	var customer = localStorage.getItem("customer");
	var access_token = null;
	if(customer == null || customer == ''){
			return null;
	}else{
		access_token = JSON.parse(customer).token;
		if(access_token == null || access_token == ''){
			return null;
		}else{
			return JSON.parse(customer);
		}
	}
}

function init_customer(){
	jquery.ajax({
	    url: baseUrl+'/customer/getCustomerInfor',
	    async: false,
		method:'post',
	    success: function(res) {	
	        if(res.code == 0){
	        	//数据获取成功，客户存入缓存
	        	localStorage.setItem("customer", JSON.stringify(res.msg));
	        }else{
			}
	    }
	});
}

//带Token请求
const httpTokenRequest = (opts, data) => {
	var customer = customerValid();
	if(customer == null){
		//初始化客户
		customer = init_customer();
	}
	var access_token =customerValid().token;
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'access_token': access_token,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'access_token': access_token,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType: 'json',
	}
	
	setTimeout(function() {
		uni.stopPullDownRefresh(); //停止下拉刷新动画
	},1000);
	
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				if (res[1].data.code == 300) {
					backLoginPage();
					uni.navigateTo({
						url: '/pages/login/login'
					});
					return;
				}
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};
// 抛出关键字
export default {
	baseUrl,
	httpTokenRequest,
	httpRequest_token,
	ImgUrl,
	httpRequest,
	backLoginPage,
	customerValid,
	environment_official,
	environment_test,
	environment
}

function ajax() {
	var ajaxData = {
		type: arguments[0].type || "GET",
		url: arguments[0].url || "",
		async: arguments[0].async || "true",
		data: arguments[0].data || null,
		dataType: arguments[0].dataType || "text",
		contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
		beforeSend: arguments[0].beforeSend || function() {},
		success: arguments[0].success || function() {},
		error: arguments[0].error || function() {}
	}
	ajaxData.beforeSend()
	var xhr = createxmlHttpRequest();
	xhr.responseType = ajaxData.dataType;
	xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
	xhr.setRequestHeader("Content-Type", ajaxData.contentType);
	xhr.send(convertData(ajaxData.data));
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				ajaxData.success(xhr.response)
			} else {
				ajaxData.error()
			}
		}
	}
}

function createxmlHttpRequest() {
	if (window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
}

function convertData(data) {
	if (typeof data === 'object') {
		var convertResult = "";
		for (var c in data) {
			convertResult += c + "=" + data[c] + "&";
		}
		convertResult = convertResult.substring(0, convertResult.length - 1)
		return convertResult;
	} else {
		return data;
	}
}
