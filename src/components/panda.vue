<template>
  <div class="pandaListContainer" @tap="toDetail">
    <p>{{item.title}}</p>
    <img class="pandaListImgContainer" :src="item.url" alt="">
    <p>{{item.date}}</p>
  </div>
</template>

<script>
export default {
  props: ['item', 'index'],
  methods: {
    toDetail () {
      wx.navigateTo({ url: '../detail/main?index=' + this.index })
    }
  }
}
</script>

<style scoped>
.pandaListContainer{
  padding: 10rpx;
  border: 1rpx solid #E92B90;
}
.pandaListImgContainer{
  width:100%
}
</style>
