<template>
  <div class="container">
    <van-search :value="value" placeholder="请输入搜索关键词" use-action-slot @search="onSearch">
      <view slot="action" @tap="toSearch">搜索</view>
    </van-search>
    <van-notice-bar
      left-icon="/static/icon/index/speaker.png"
      speed=70
      text="AnimeStore全新上线,共有103款二次元周边任君选择,欢迎各位宅友前来选购!"
    />
    <swiper
      @tap="bindViewTap"
      indicator-dots
      indicator-color="pink"
      autoplay
      circular
      interval="2000"
    >
      <block v-for="(item,index) in URLs" :index="index" :key="index">
        <swiper-item>
          <img :src="item" mode="scaleToFill">
        </swiper-item>
      </block>
    </swiper>
    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model">
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy">
    </form>
    <!-- <button open-type="getUserInfo" lang="zh_CN" @tap="onGotUserInfo">获取用户信息</button> -->
    <button @tap="toVuex" class="counter">去往胖达列表页面</button>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      value: '',
      URLs: [
        '//img.alicdn.com/bao/uploaded/i3/2138521987/TB1erP4Xzgy_uJjSZSyXXbqvVXa_!!0-item_pic.jpg',
        '//img.alicdn.com/bao/uploaded/i1/2138521987/TB1pEgRh4PI8KJjSspoXXX6MFXa_!!0-item_pic.jpg',
        '//img.alicdn.com/bao/uploaded/i2/2138521987/O1CN011QY5S3QZvhpONc3_!!0-item_pic.jpg',
        '//img.alicdn.com/bao/uploaded/i2/2138521987/TB10H9ipCtYBeNjSspkXXbU8VXa_!!0-item_pic.jpg'
      ],
      motto: '胖达酱'
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      wx.navigateTo({ url: '../logs/main' })
    },
    toSearch () {
      console.log(111)
    },
    toVuex () {
      wx.switchTab({ url: '../category/main' })
    },
    clickHandle (msg, ev) {
      console.log(this)
      console.log('clickHandle:', msg, ev)
    }
  },
  created () { }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.usermotto {
  margin-top: 50px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
van-search {
  width: 100%;
}
van-notice-bar {
  width: 100%;
}
swiper {
  width: 100%;
  height: 400rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
