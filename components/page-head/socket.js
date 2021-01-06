var lockReconnect = false;  //避免ws重复连接
var ws = null;          // 判断当前浏览器是否支持WebSocket
var wsUrl = socketUrl;//ws://10.0.0.2:8900/ws/pc_client
createWebSocket(wsUrl);   //连接ws
function createWebSocket(url) {
    try{
        if('WebSocket' in window){
            ws = new WebSocket(url);
        }
        initEventHandle();
    }catch(e){
        reconnect(url);
        console.log(e);
    }
}
function initEventHandle() {
    ws.onclose = function () {
        reconnect(wsUrl);
        console.log("llws连接关闭!"+new Date().toLocaleString());
    };
    ws.onerror = function () {
        reconnect(wsUrl);
        console.log("llws连接错误!");
    };
    ws.onopen = function () {
        heartCheck.reset().start();      //心跳检测重置
        console.log("llws连接成功!"+new Date().toLocaleString());
    };
    ws.onmessage = function (evt) {
        heartCheck.reset().start();
        var received_msg = evt.data;
        console.log(received_msg);
        if(received_msg === 'ping'){return};
		
		
        var data = JSON.parse(received_msg);
        var type = data.type;
        data = data.data;
        if(type === 'chat_new'){
            //解析新消息
            parseNewChat(data);
        }else if(type === 'customer_login'){
            //用户登录状态更改
            updateCustomerLogin(data);
        }else if(type === ''){
            //某条聊天信息更改状态
            // updataChatReadStatus(data);
        }
		
		
    };
}
// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function() {
    ws.close();
};

function reconnect(url) {
    if(lockReconnect) return;
    lockReconnect = true;
    setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
        createWebSocket(url);
        lockReconnect = false;
    }, 2000);
}

//心跳检测
var heartCheck = {
    timeout: 60000,        //1分钟发一次心跳
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function(){
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function(){
        var self = this;
        this.timeoutObj = setTimeout(function(){
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            ws.send("ping");
            console.log("ping!");
            self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout)
        }, this.timeout)
    }
};





var online =  new Map();
function send() {
    var message = $(".message-to-send").val();
    if(message == null || message == ''){
        $MB.n_danger("发给客户的内容不能为空");
        return;
    }
    if (!window.WebSocket) {
        return;
    }
    if (ws.readyState == WebSocket.OPEN) {
        var jsObj = {};
        jsObj.readUid = $(".message-to-send").attr("id");
        jsObj.msg = message;
        var str = JSON.stringify(jsObj);
        ws.send(str);
        $(".message-to-send").val("");
    } else {
        createWebSocket(wsUrl);
    }
}
function parseNewChat(data) {
    var h5 = '';
    var time = buidTime(data.sendTime);
    var content = data.chat.content;
    if(data.sendUid == uid){
        //发送人是自己
        h5 += "<li>\n" +
            "                <div class=\"message-data\">\n" +
            "                  <span class=\"message-data-name\"><i class=\"fa fa-circle online\"></i>我</span>\n" +
            "                  <span class=\"message-data-time\">"+time+"</span>\n" +
            "                </div>\n" +
            "                <div class=\"message my-message\">\n" +
            content +
            "                </div>\n" +
            "              </li>";
    }else{
        //发送人是用户
        h5 +="<li class=\"clearfix\">\n" +
            "                <div class=\"message-data align-right\">\n" +
            "                  <span class=\"message-data-time\">"+time+"</span> &nbsp; &nbsp;\n" +
            "                  <span class=\"message-data-name\">用户</span> <i class=\"fa fa-circle me\"></i>\n" +
            "\n" +
            "                </div>\n" +
            "                <div class=\"message other-message float-right\">\n" +
            content +
            "                </div>\n" +
            "              </li>"
    }
    if($(".customer_"+data.sendUid).length >= 1){
        $(".customer_"+data.sendUid).children(".chat-history").append(h5);
        $(".customer_"+data.sendUid).children(".chat-history")[0].scrollHeight;
    }
    if($(".customer_"+data.readUid).length >= 1){
        $(".customer_"+data.readUid).children(".chat-history").append(h5);
        $(".customer_"+data.readUid).children(".chat-history")[0].scrollHeight;
    }
}

/**
 * 加载最新的聊天记录,记录为time之前的数据
 * @param time
 */
function chatHistory(time,uid) {
    $.post(ctx + 'chat/chatHistory', {time:time,uid:uid}, function (r) {
        if (r.code === 0) {
            var data = r.msg;
            for (var i = data.length-1; i >= 0 ; i--) {
                parseNewChat(data[i]);
            }
        } else {
            $MB.n_danger(r.msg);
        }
    });
}
