window.baseURL = 'http://admin.minmai1688.com/'

// 监听容联云发送的消息（客服专用）
window.serviceRmation = function(callback){
  if(typeof callback === 'function'){
    this.callback = callback
  } else {
    this.callback(callback)
  }
}