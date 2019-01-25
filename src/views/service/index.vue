<template>
<div class="service">
  <div class="service_content"  id="content">
    <div class="scroller_content">
      <div v-for="(el, index) in List" :key="index" class="scroller_item">
        <left-content v-if="el.messageType === '1'" :item="el"></left-content>
        <right-content v-if="el.messageType === '2'" :item="el"></right-content>
      </div>
    </div>
  </div>
  <div class="service_btn">
    <input type="text" class="submit_input" placeholder="输入后点击回车发送内容" @keyup.enter="postMsg" v-model="content">
    <span class="postMsg" @click="postMsg">发送</span>
  </div>
</div>
</template>
<script>
import { PullRefresh} from 'vant'
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import { mapActions, mapState} from 'vuex'
import utils from '@/assets/utils'

export default {
  data() {
    return {
      content: '', // 发送的内容
    }
  },
   computed: {
    ...mapState({
       user: state => state.user,
    }),
    List () {
      console.log(this.$store.state.message)
      return this.$store.state.message
    },
  },
  mounted () {
    var _this = this
    // 监听接受容联云发送的消息
    window.serviceRmation(function(res) {
      _this.save({
        messageType: '1',
        content: res.content,
        type: obj.msgType,
        time: obj.time
      })
    })

    this.$store.state.message.push({
      content: '你好，欢迎联系麦缘婚恋客服，如果等待时间较长，请联系电话00000000000',
      messageType: '1',
      id: new Date().getTime(),
      time: new Date().getTime()
    })

  },
  methods: {
    ...mapActions(['save', 'postMessage']),
    // 将滚动条置底
    scrollToBottom () {
      this.$nextTick(() => {
        var container = this.$el.querySelector(".scroller_content");
        var content = document.getElementById('content')
        content.scrollTop = container.scrollHeight;
      })
    },
    // 向客服发送消息
    postMsg () {
      console.log(this)
      // 判断发送的内容是否为空
      if(this.content.replace(/ /g, '') !== ''){
        // 将最新的聊天信息添加到聊天列表中
        this.postMessage({
          content: this.content,
          messageType: '2',
          id: new Date().getTime(),
          type: 1,
          time: new Date().getTime()
        }).then(() => {
          // 将滚动条置底部
          this.scrollToBottom()

          // 将内容清空
          this.content = ''
        })
      }
    },
  },
  components: {
    LeftContent,
    RightContent
  }
}
</script>

<style scoped>
.service{
  height: 100%;
  background-color: #f0f0f0
}
.service_content{
  height: calc( 100% - .8rem);
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.submit_input{
  border:1px solid #f0f0f1;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #f5f5f6;
  color:#333;
  font-size: .27rem;
  padding: 0 .24rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  position: absolute;
  top: .1rem;
  left: .1rem;
  height: calc( 100% - .2rem);
  width: calc(100% - 1rem);

}
.service_btn{
  position: fixed;
  height: .8rem;
  bottom: 0;
  width: 100%;
  left: 0;
  background: #fff;
  padding: .1rem;
  box-sizing: border-box;
  border-top: 1px solid #f0f0f0;
}
.postMsg{
  float: right;
  line-height: .6rem;
  font-size: .28rem;
  color: #f32e2e;
  width: .8rem;
  text-align: center;
}
.scroller_item{
  padding-top:.1rem;
  padding-bottom:.3rem;
  box-sizing: border-box;
}
</style>
