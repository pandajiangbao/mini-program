<template>
  <div class="swiperContainer">
    <swiper indicator-dots indicator-color="pink" autoplay circular interval="800">
        <block v-for="(item,index) in URLs"  :index="index" :key="index">
            <swiper-item>
                <image :src="item"/>
            </swiper-item>
        </block>
    </swiper>
    <panda v-for="(item,index) in pandaList" :key="index" :item="item" :index="index"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import panda from '@/components/panda'
export default {
  data () {
    return {
      URLs: [
        '/static/image/index/panda1.JPG',
        '/static/image/index/panda2.jpeg',
        '/static/image/index/panda3.jpeg',
        '/static/image/index/panda4.jpeg'
      ]
    }
  },
  computed: {
    ...mapState(['pandaList'])
  },
  beforeMount () {
    this.$store.dispatch('getPandaList')
  },
  methods: {
    toHome () {
      wx.navigateBack({
        delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      })
    }
  },
  components: {
    panda
  }
}
</script>

<style>
.swiperContainer swiper{
  width:100%;
  height:400rpx;
}
.swiperContainer swiper image{
  width:100%;
  height:100%;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
