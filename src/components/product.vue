<template>
  <div class="container" @tap="toDetail">
    <img class="product-img" :src="product.img">
    <div class="product-info">
      <p class="product-title">{{product.title}}</p>
      <p class="product-price">¥{{product.price}}<span class="product-sales">销量{{product.sales}}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'index'],
  methods: {
    toDetail () {
      wx.navigateTo({ url: '../productDetail/main?index=' + this.index })
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  width: 50%;
  height: 500rpx;
  display: flex;
  flex-direction: column;
  padding: 5rpx;
}
.container:nth-child(even) {
  border-left: 1rpx solid #999;
  border-bottom: 1rpx solid #999;
}

.container:nth-child(odd) {
  border-bottom: 1rpx solid #999;
  
  .container:nth-last-child(1) {
  border-bottom: 0rpx;
  }
  
  .container:nth-last-child(2) {
  border-bottom: 0rpx;
  }
}

.product-img {
  width: 100%;
  height: 70%;
}

.product-title {
  width: 100%;
  font-size: 28rpx;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}

.product-info {
  width: 100%;
  height: 30%;
  position:relative;
}

.product-price {
  font-size: 24rpx;
  width: 100%;
  color: red;
  position: absolute;
  bottom: 0rpx;
}

.product-sales {
  float: right;
  font-size: 24rpx;
  color: #999;
}
</style>
