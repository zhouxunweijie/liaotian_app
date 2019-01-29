import Vue from 'vue'
import Vuex from 'vuex'
import IM from '@/assets/IM'
import { getMessengerAccount, listForChatRecord, save, getCustomerServicePhone} from '@/assets/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    userId: '',
    message: []
  },
  actions: {
    postMessage ({state, dispatch}, obj) {
      return new Promise(resolve => {
        IM.postMsg({
          data: obj.content,
          id: '00001',
          userId: state.user.userId
        }).then(() => {
          dispatch('save', obj).then(() => {
            resolve()
          })
        })
      })
    },
    getLeisureAccountNumber ({state}) {
      return new Promise((resolve) => {
        getMessengerAccount({
          userId: state.userId
        }).then(res => {
          resolve(res)
        })
      })
    },
    getMessage ({state}) {
      return new Promise(resolve => {
        listForChatRecord({
          userId: state.userId
        }).then(res => {
          state.message = res.data
          getCustomerServicePhone().then(data => {
            state.message.push({
              content: '你好，欢迎联系民麦金服客服，如果等待时间较长，请联系电话'+ data.data,
              messageType: '1',
              id: new Date().getTime(),
              time: new Date().getTime()
            })
            resolve()
          })
        })
      })
    },
    save ({state}, obj) {
      return new Promise(resolve => {
        save({
          userId: state.userId,
          type: obj.type,
          content: obj.content,
          messageType: obj.messageType
        }).then(() => {
          state.message.push({
            messageType: obj.messageType,
            content: obj.content,
            type: obj.type,
            time: obj.time
          })
          resolve()
        })
      })
    }
  }
})
