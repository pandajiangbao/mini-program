<template>
  <div>
    <div class="user-info">
      <img
        class="userinfo-avatar"
        v-if="userInfo.avatarUrl"
        :src="userInfo.avatarUrl"
        background-size="cover"
      >
      <div class="userinfo-block">
        <div class="userinfo-detail">
          <div class="userinfo-nickname">
            <p>{{userInfo.nickName}}</p>
          </div>
          <img
            class="userinfo-gender"
            v-if="userInfo.gender != 0"
            :src="userInfo.gender == 1?'/static/icon/my/man.png':'/static/icon/my/woman.png'"
          >
        </div>
        <div class="userinfo-location">
            <p>{{userInfo.province}} {{userInfo.city}}</p>
        </div>
      </div>
    </div>
    <button @tap="toOrder">我的订单</button>
    <button @tap="toAddress">我的地址</button>
    <button @tap="toBonus">我的优惠</button>
    <button @tap="toStar">我的收藏</button>
    <button @tap="toAbout">关于我们</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: [],
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    toOrder () {
      wx.navigateTo({ url: '../myOrder/main' })
    },
    toAddress () {
      wx.navigateTo({ url: '../myAddress/main' })
    },
    toBonus () {
      wx.navigateTo({ url: '../myBonus/main' })
    },
    toStar () {
      wx.navigateTo({ url: '../star/main' })
    },
    toAboout () {
      wx.navigateTo({ url: '../about/main' })
    }
  }
}
</script>

<style scoped>
.user-info {
  background-color: #e92b90;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 20rpx;
  font-size: 28rpx;
}
.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 10rpx;
  border-radius: 50%;
}

.userinfo-block {
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20rpx;
  font-size: 28rpx;
}

.userinfo-detail {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 20rpx;
  font-size: 28rpx;
}

.userinfo-nickname {
  color: #aaa;
}

.userinfo-gender {
  padding: 20rpx;
  width: 28rpx;
  height: 28rpx;
}
</style>