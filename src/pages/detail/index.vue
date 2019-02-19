<template>
  <div>
    <img class="product-img" :src="product.img" alt>
    <p class="product-name">{{product.title}}</p>
    <div class="product-content">
      <span>价格:{{product.price}}¥</span>
      <span>销量:{{product.sales}}</span>
      <span>库存:{{product.stock}}</span>
    </div>
    <button @tap="handleStared" v-if="isStared">已收藏</button>
    <button @tap="handleStared" v-else>点击收藏</button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: [],
  data () {
    return {
      product: {},
      isStared: false
    }
  },
  beforeMount () {
    this.product = this.productList[this.$mp.query.index]
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
    ...mapState(['productList'])
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
.product-img {
  width: 80%;
  height: 600rpx;
  margin-left: 10%;
}

.product-name {
  width: 80%;
  margin-left: 10%;
  font-size: 36rpx;
  text-align: center;
  font-weight: bold;
}

.product-content {
  display: flex;
  flex-direction: column;
  margin-left: 20%;
  margin-top: 30rpx;
  line-height: 50rpx;
  font-size: 26rpx;
}

button {
  widows: 70%;
  width: 80%;
  height: 80rpx;
  margin-left: 10%;
  background: #e92b90;
  line-height: 80rpx;
  color: #fff;
  font-size: 28rpx;
  margin-top: 20rpx;
}
</style>

