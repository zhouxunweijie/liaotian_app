import Vue from 'vue'
import Vuex from 'vuex'
import IM from '@/assets/IM'
import { getMessengerAccount, listForChatRecord, save} from '@/assets/api'

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
          id: obj.time
        }).then(res => {
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
          resolve()
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
        }).then(res => {
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
