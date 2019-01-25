import MD5 from 'js-md5'
import { updateReleaseAccount } from '@/assets/api'
var RL_YTX = window.RL_YTX

function IM () {
  // 应用ID
  this.appid = '8aaf0708669b101e01669ea18b6d01ed'
  // 应用token
  this.appToken = 'c72930dbb2830afaa7cff043bb209a1a'
  // 是否第三方获取sig
  this.flag = false
  // 当前登录状态
  this.loginType = 1
  // 用户名
  this.userName = ''
  // 当前时间戳
  this.timestamp = function () {
    var now = new Date()
    var timestamp = now.getFullYear() + '' + ((now.getMonth() + 1) >= 10 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1)) + (now.getDate() >= 10 ? now.getDate() : '0' + now.getDate()) + (now.getHours() >= 10 ? now.getHours() : '0' + now.getHours()) + (now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes()) + (now.getSeconds() >= 10 ? now.getSeconds() : '0' + now.getSeconds())
    return timestamp
  }
  this.sig = function () {
    return MD5(this.appid + this.userName + this.timestamp() + this.appToken)
  }
}

IM.prototype = {
  init (user) {
    var resp = RL_YTX.init(this.appid)
    if (resp.code === 170002) {
      // 缺少必要参数，详情见msg参数
      // 用户逻辑处理
    } else if (resp.code === 174001) {
      // 不支持HTML5，关闭页面//用户逻辑处理}
    } else if (resp.code === 200) {}

      // 获取完登录用户信息后登录
      // var user = JSON.parse(localStorage.getItem('user'))
      // 更改state中的个人信息
      this.userName = user.accountNumber
      // 登录
      this.login()
  },
  /**
   * 登录
   */
  login () {
    var that = this
    // 账号登录参数设置
    var loginBuilder = new RL_YTX.LoginBuilder()
    // 登录类型 1账号登录，3voip账号密码登录
    loginBuilder.setType(this.loginType)
    // 设置用户名
    loginBuilder.setUserName(this.userName)
    // 设置sig
    loginBuilder.setSig(this.sig())
    // 设置时间戳
    loginBuilder.setTimestamp(this.timestamp())
    // 执行用户登录
    RL_YTX.login(loginBuilder, function (obj) {
      // 登录成功回调
    // 注册接收消息事件监听
      console.log(obj, '用户登录成功')
      RL_YTX.onMsgReceiveListener(function (obj) {
        // 收到push消息或者离线消息或判断输入状态//如果obj.msgType==12  判断obj.msgDomainn的值//obj.msgDomain 0 无输入状态  1 正在输入  2 正在录音
        console.log('有新的消息', obj)

        if(obj.msgSender === '00001'){
          window.serviceRmation({
            id: obj.msgId,
            content: obj.msgContent,
            type: obj.msgType,
            time: parseInt(obj.msgDateCreated),
            messageType: '1'
          })
        }
      })

      
      // 登录之后监听跟自己相关的群组信息
      RL_YTX.onNoticeReceiveListener(function(obj) {
        // this.dispatch()
        // 触发store
        // 群组id   obj.groupId;
        // 群组名称   obj.groupName;
        // 申请者id   obj.member;
        // 申请者名称   (!!obj.memberName)?obj.memberName:obj.member;
        // obj.auditType   1申请加入群组，2邀请加入群组，3直接加入群组，4解散群组，5退出群组，6踢出群组，7确认申请加入，8确认邀请结果，10管理员修改群组信息，11用户修改群组成员名片
      })
      
      // 监听连接状态为断开时，重新登录
      RL_YTX.onConnectStateChangeLisenter((res) => {
        if(res.code === 5){
          that.login()
        }
        console.log(res, '状态改变')
      })
    }, function (obj) {
      console.log('登录失败')
      that.login()
    })
  },

  /**
   * 当前只能够发送文本信息和图片信息
   * 向当前好友发送信息
   * 
   * type: 设置聊天类型  1 为单聊  2 为群聊
   */
  postMsg ({msgType = 1, data = '', id , userId ,type = 1}) {
    return new Promise((resolve, reject) => {
      var msgid = new Date().getTime()
      // 新建消息体对象
      var obj = new RL_YTX.MsgBuilder()
      // 设置自定义消息id
      obj.setId(msgid)
      // 设置发送的消息类型1:文本消息 4:图片消息 6:压缩文件 7:非压缩文件
      // 发送非文本消息时，text字段将被忽略，发送文本消息时 file字段将被忽略
      obj.setType(msgType)
      // 设置接收者
      obj.setReceiver(id)
      // 设置聊天类型
      obj.setDomain(userId)
      if (msgType === 1 || msgType === 2) {
        // 设置发送的文本内容
        obj.setText(data)
        RL_YTX.sendMsg(obj, function (res) {
        // 发送消息成功
        // 处理用户逻辑，通知页面
          resolve(res)
          console.log(res, '消息发送成功')
        }, function (res) { // 失败
        // 发送消息失败
        // 处理用户逻辑，通知页面刷新，展现重发按钮
          reject(res)
          console.log(res, '发送消息失败')
        })
      } else if (msgType === 4) {
        obj.setFile(data)
        RL_YTX.sendMsg(obj, function (res) {
        // 发送消息成功
        // 处理用户逻辑，通知页面
          resolve(res)
        }, function (obj) { // 失败
        // 发送消息失败
        // 处理用户逻辑，通知页面刷新，展现重发按钮
          reject()
        }, function (sended, total) {
        // 发送图片或附件时的进度条
        // 如果发送文本消息，可以不传该参数
        })
      }
    })
  },
  destroy () {
    updateReleaseAccount({
      id: localStorage.getItem('accountId'),
      status: '1'
    }).then(() => {
      console.log('账号注销完成')
    })
  }
}

export default new IM()
