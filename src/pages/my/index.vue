<template>
  <div>
    <div class="user-info">
      <img
        class="userinfo-avatar"
        v-if="userInfo.avatarUrl"
        :src="userInfo.avatarUrl"
        background-size="cover"
      >
      <div class="userinfo-nickname">
        <p>{{userInfo.nickName}}</p>
      </div>
    </div>
    <button>添加地址</button>
    <button>关于我们</button>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  props: [],
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    getUserInfo () {
      wx.getUserInfo({
        success: res => {
          console.log(res)
          this.userInfo = res.userInfo
          console.log(this.userInfo)
          console.log('card :', card)
        }
      })
    }
  },
  comments: {
    card
  }
}
</script>

<style scoped>
.user-info{
  background-color: #E92B90;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 30rpx;
  font-size: 28rpx;
}
.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  padding: 30rpx;
  color: #aaa;
}

.usermotto {
  margin-top: 50px;
}
</style>