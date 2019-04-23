<template>
  <div class="container" @tap="toSelect(userBonus.id,userBonus.bonus.targetAmount)">
    <p class="bonus-name">优惠券</p>
    <div class="bonus-info">
      <p class="bonus-target">满¥{{userBonus.bonus.targetAmount}}减</p>
      <p class="bonus-reduce">¥{{userBonus.bonus.reduceAmount}}</p>
      <p class="bonus-expired-time">有效期:{{userBonus.expiredTime}}</p>
    </div>
    <div class="bonus-category"><p>全场通用</p></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['userBonus', 'query'],
  methods: {
    ...mapMutations([
      'set_bonus_id'
    ]),
    toSelect (id, targetAmount) {
      if (this.query) {
        if (Number(this.query) >= Number(targetAmount)) {
          this.set_bonus_id(id)
          wx.navigateBack({delta: 1})
        } else {
          wx.showToast({
            title: '未达到目标金额', // 提示的内容,
            icon: 'none',
            duration: 1500, // 延迟时间,
            mask: true // 显示透明蒙层，防止触摸穿透,
          })
        }
      }
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
  border-bottom: 1rpx solid black;
}
.bonus-name {
  width: 8%;
  height: 100%;
  font-size: 50rpx;
  text-align: center;
  color: white;
  background-color: rgb(45, 135, 219);
}

.bonus-info {
  width: 76%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(161, 27, 202);
}
.bonus-target {
  float: right;
  font-size: 24rpx;
  color: white;
  text-align: center;
  margin-top: 30rpx;
}
.bonus-reduce {
  font-size: 50rpx;
  width: 100%;
  color: white;
  text-align: center
}
.bonus-expired-time{
  font-size: 20rpx;
  width: 100%;
  color: white;
  text-align: center;
}
.bonus-category{
  width: 16%;
  height: 100%;
  font-size: 60rpx;
  text-align: center;
  color: white;
  background-color: rgb(206, 28, 206);
  p {
    margin-top: 12rpx;
  }
}
</style>
