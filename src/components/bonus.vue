<template>
  <div class="container">
    <p class="bonus-name">优惠券</p>
    <div class="bonus-info">
      <p class="bonus-target">¥{{bonus.targetAmount}}</p>
      <p class="bonus-reduce">{{bonus.reduceAmount}}</p>
    </div>
    <p class="bonus-category">全场通用</p>
  </div>
</template>

<script>
export default {
  props: ['bonus'],
  methods: {
    toDetail () {
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  width: 100%;
  height: 200rpx;
  display: flex;
  flex-direction: row;
  padding: 5rpx;
}
.bonus-name {
  width: 20%;
  height: 100%;
  font-size: 30rpx;
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

.bonus-info {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.bonus-target {
  float: right;
  font-size: 24rpx;
  color: red;
}
.bonus-reduce {
  font-size: 24rpx;
  width: 100%;
  color: red;
}
.bonus-category{
  width: 50%;
  height: 100%;
  font-size: 30rpx;
}
</style>
