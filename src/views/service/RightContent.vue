<template>
    <div class="right">
         <div class="right_img">
            <img :src="userHead" alt="">
        </div>
         <div class="right_content" v-html="Replace(item.content)">
        </div>
    </div>
</template>
<script>
import utils from '@/assets/utils'
import { mapState } from 'vuex'
export default {
  props: ['item'],
  computed: {
    ...mapState({
      userHead: state => state.user.userHead
    })
  },
  methods: {
    Replace (val) {
      return utils.uncodeUtf16(val)
    }
  }
}
</script>

<style scoped>
.right{
  width: 100%;
  overflow: hidden;
  text-align: right;
  padding: 0 .3rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.right .right_img{
  margin-left: .14rem;
  display: block;
  float: right;
}
.right .right_img img{
  width: 1rem;
  height: 1rem;
  display: block;
  border-radius: 50%;
  -webkit-border-radius: 50%;
}
.right .right_content{
  max-width:calc( 100% - 1.14rem);
  padding: .3rem;
  display: block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  font-size: .28rem;
  float: right;
}
</style>
