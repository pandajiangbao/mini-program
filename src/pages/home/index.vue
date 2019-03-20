<template>
  <div class="container">
    <van-search v-model="value" placeholder="请输入搜索关键词" use-action-slot @search="onSearch" @change="onChange" @cancel="onCancel"/>
    <van-notice-bar
      left-icon="/static/icon/index/speaker.png"
      speed=70
      text="AnimeStore全新上线,共有103款二次元周边任君选择,欢迎各位宅友前来选购!"
    />
    <swiper
      indicator-dots
      indicator-color="pink"
      autoplay
      circular
      interval="2000"
    >
      <block v-for="(item,index) in productListToSwiper"  :index="index" :key="index">
        <swiper-item @tap="toDetail(item.id)">
          <img :src="item.img" mode="scaleToFill">
        </swiper-item>
      </block>
    </swiper>
    <p class="product-text">商品推荐</p>
    <div class="product-container">
      <product v-for="(item,index) in productListToRecommend" :key="index" :product="item" ></product>
    </div>
    <!-- <button open-type="getUserInfo" lang="zh_CN" @tap="onGotUserInfo">获取用户信息</button> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import product from '@/components/product'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'productList'
    ]),
    productListToSwiper: function () {
      return this.productList.filter((item) => item.id <= 4)
    },
    productListToRecommend: function () {
      return this.productList.filter((item) => item.id > 4 && item.id <= 8)
    }
  },
  methods: {
    ...mapActions([
      'getProductListByQuery'
    ]),
    onSearch () {
      this.getProductListByQuery(this.value).then(() => {
        wx.navigateTo({ url: '../search/main' })
      })
    },
    onChange (event) {
      this.value = event.mp.detail
    },
    toDetail (id) {
      wx.navigateTo({ url: `../productDetail/main?id=${id}` })
    },
    toVuex () {
      wx.switchTab({ url: '../category/main' })
    }
  },
  components: {
    product
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-text{
  width: 100%;
  text-align: center;
  font-size: 28rpx;
  color: #333;
  border-top: 1rpx solid #999;
  border-bottom: 1rpx solid #999;
}
.product-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  height: 100%;
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
