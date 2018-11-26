<template>
  <div @tap="toDetail">
    <p>{{item.title}}</p>
    <img :src="item.url" alt="">
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
</style>
