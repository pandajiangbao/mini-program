<template>
  <div class="container">
    <img class="product-img" :src="product.img">
    <p class="product-name">{{product.title}}</p>
    <div class="product-content">
      <p class="product-price">
        ¥{{product.price}}
        <img
          class="product-star"
          @tap="handleStared"
          :src="isStared?'/static/icon/productDetail/stared.png':'/static/icon/productDetail/star.png'"
        >
      </p>
      <p class="product-sales">
        销量:{{product.sales}}
        <span class="product-stock">库存:{{product.stock}}</span>
      </p>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="home-o" text="首页" @tap="toHome"/>
      <van-goods-action-icon icon="cart-o" text="购物车" @tap="toShoppingCart"/>
      <van-goods-action-button text="加入购物车" type="warning" @tap="onShoppingCart"/>
      <van-goods-action-button text="立即购买" @tap="onBuy"/>
    </van-goods-action>
    <van-action-sheet
      :show="show"
      title="请选择数量规格"
      :actions="actions"
      cancel-text="确认"
      @close="onClose"
    >
      <view>一些内容</view>
    </van-action-sheet>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: [],
  data () {
    return {
      product: {},
      isStared: false,
      show: false,
      actions: [
        {
          name: '选项'
        },
        {
          name: '分享',
          subname: '描述信息',
          openType: 'share'
        },
        {
          loading: true
        },
        {
          name: '禁用选项',
          disabled: true
        }
      ]
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
    toHome () {
      wx.switchTab({ url: '../home/main' })
    },
    toShoppingCart () {
      console.log('购物车')
    },
    onClose () {
      this.show = false
    },
    onShoppingCart () {
      this.show = true
    },
    onBuy () {
      this.show = false
    },
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
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}
.product-img {
  width: 100%;
  height: 700rpx;
}

.product-name {
  width: 100%;
  margin-top: 20rpx;
  padding: 10rpx;
  font-size: 36rpx;
  font-weight: bold;
}

.product-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-top: 20rpx;
  line-height: 50rpx;
}

.product-price {
  width: 90%;
  margin-left: 5%;
  padding-right: 5%;
  color: red;
  font-size: 50rpx;
}

.product-star {
  height: 42rpx;
  width: 42rpx;
  float: right;
}

.product-sales {
  width: 90%;
  margin-top: 20rpx;
  padding-left: 5%;
  padding-right: 5%;
  color: #999;
  font-size: 26rpx;
}

.product-stock {
  float: right;
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

