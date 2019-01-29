
import HTTP from './http'
// 获取空闲容联云账号
export const getMessengerAccount = data => HTTP.GET('web/messengerAccount/getMessengerAccount', data)

// 释放容联云账号
export const updateReleaseAccount = data => HTTP.GET('web/messengerAccount/updateReleaseAccount', data)

// 根据用户id获取聊天信息
export const listForChatRecord = data => HTTP.GET('web/chatRecord/listForChatRecord', data)

// 根据用户id发送消息
export const save = data => HTTP.GET('web/chatRecord/save', data)

// 获取最新的客服电话
export const getCustomerServicePhone = data => HTTP.GET('web/messengerAccount/getCustomerServicePhone', data)

// 