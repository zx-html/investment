  //请求地址 
const baseUrl = 'http://pro.djc888.com/djc-serve';
// const baseUrl = 'http://chenxiong.host/djc-serve';
// const baseUrl = 'http://192.168.10.63:8080/djc-serve';
const httpRequest = (opts, data) => {
    let httpDefaultOpts = {
        url: baseUrl+opts.url,
        data: data,
        beforeSend :function(xmlHttp){
            xmlHttp.setRequestHeader("If-Modified-Since","0"); 
            xmlHttp.setRequestHeader("Cache-Control","no-cache");
        },
        method: opts.method,
        header: opts.method == 'GET' ? {
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
    } : {
       'content-type': 'application/x-www-form-urlencoded'
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
    })
    return promise
};
export default {
    baseUrl,
    httpRequest
}