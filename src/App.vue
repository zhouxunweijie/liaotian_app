<template>
  <div id="app">
    <service ref="service"></service>
  </div>
</template>

<script>
import service from './views/service'
import utils from '@/assets/utils'
import IM from '@/assets/IM'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    service
  },
  mounted () {
    this.$store.state.userId = utils.getUrlArgObject('userId')
    // 获取空闲的容联云账号
    this.getLeisureAccountNumber().then(res => {
      this.$store.state.user = res.data
      IM.init(this.$store.state.user)
      // 获取聊天记录
      this.getMessage().then(() => {
        this.$refs.service.scrollToBottom()
      })
    })
  },
  methods: {
    ...mapActions(['getLeisureAccountNumber', 'getMessage'])
  }
}

document.documentElement.style.fontSize = (document.documentElement.clientWidth / 750) * 100 + 'px'
</script>

<style>
*{
  margin: 0;
  padding: 0
}
html,body{
  height: 100%
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%
}
</style>
