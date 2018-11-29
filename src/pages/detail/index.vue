<template>
  <div>
    <p>{{detailObj.title}}</p>
    <p>{{detailObj.date}}</p>
    <button @tap="handleStared" v-if="isStared">已收藏</button>
    <button @tap="handleStared" v-else>点击收藏</button>
    <img class="imgContainer" :src="detailObj.url" alt="">
    <p>{{detailObj.detail}}</p>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: [],
  data () {
    return {
      detailObj: {},
      isStared: false
    }
  },
  beforeMount () {
    this.detailObj = this.pandaList[this.$mp.query.index]
    let oldStorage = wx.getStorageSync('isStared')
    if (!oldStorage) {
      wx.setStorage({
        key: 'isStared',
        data: {}
      })
    } else {
      this.isStared = oldStorage[this.$mp.query.index]
    }
  },
  computed: {
    ...mapState(['pandaList'])
  },
  methods: {
    handleStared () {
      this.isStared = !this.isStared
      let title = this.isStared ? '收藏成功' : '取消收藏'
      wx.showToast({
        title, // 提示的内容,
        icon: 'success', // 图标,
        duration: 1000, // 延迟时间,
        mask: true // 显示透明蒙层，防止触摸穿透,
      })
      let oldStorage = wx.getStorageSync('isStared')
      oldStorage[this.$mp.query.index] = this.isStared
      wx.setStorage({
        key: 'isStared',
        data: oldStorage
      })
    }
  }
}
</script>

<style scoped>
.imgContainer{
  width: 100%;
}
</style>

