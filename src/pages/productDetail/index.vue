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
      <van-goods-action-button text="加入购物车" type="warning" @tap="show=true;showState=0;"/>
      <van-goods-action-button text="立即购买" @tap="show=true;showState=1;"/>
    </van-goods-action>
    <van-action-sheet
      :show="show"
      title="请选择数量规格"
      cancel-text="确认"
      @cancel="onConfirm"
      @close="show = false"
    >
      <div class="action-sheet-container">
        <img class="action-img" :src="product.img">
        <div class="action-content">
          <p class="action-title">{{product.title}}</p>
          <p class="action-stock">库存:{{product.stock}}</p>
          <p class="action-price">单价:¥{{product.price}}</p>
          <div class="action-amount">
            <van-button round size="mini" @tap="handleAmount">-</van-button>
            {{amount}}
            <van-button round size="mini" @tap="amount++">+</van-button>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: [],
  data () {
    return {
      product: {},
      amount: 1,
      isStared: false,
      show: false,
      showState: Number, // 0为购物车,1为订单
      shoppingCart: {}
    }
  },
  mounted () {
    if (this.$mp.query.status === '1') {
      this.product = this.productListByCategory[this.$mp.query.index]
    } else if (this.$mp.query.status === '0') {
      this.product = this.productList[this.$mp.query.index]
    }
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
  onUnload () {
    this.amount = 1
  },
  computed: {
    ...mapState([
      'userId',
      'productList',
      'productListByCategory',
      'shoppingCartList'
    ]),
    sum: function () {
      return (this.product.price * this.amount).toFixed(2)
    }
  },
  methods: {
    ...mapActions([
      'getShoppingCartList',
      'addShoppingCart'
    ]),
    toHome () {
      wx.switchTab({ url: '../home/main' })
    },
    toShoppingCart () {
      wx.switchTab({ url: '../shoppingCart/main' })
    },
    handleAmount () {
      if (this.amount > 1) {
        this.amount--
      }
    },
    onConfirm () {
      if (this.showState === 0) {
        this.addShoppingCart(
          {
            sum: this.product.price * this.amount,
            amount: this.amount,
            pid: this.product.id,
            uid: this.userId
          })
          .then(() => {
            // 刷新购物车
            return this.getShoppingCartList(this.userId)
          })
          .then(() => {
            wx.showToast({
              title: '添加成功', // 提示的内容,
              duration: 1500, // 延迟时间,
              mask: true // 显示透明蒙层，防止触摸穿透,
            })
            this.show = false
          })
          .catch(() => {
            wx.showToast({
              title: '网络延迟,请稍后再试', // 提示的内容,
              icon: 'none',
              duration: 1500, // 延迟时间,
              mask: true // 显示透明蒙层，防止触摸穿透,
            })
          })
      } else if (this.showState === 1) {
        console.log('buy')
      }
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

<style lang='scss' scoped>
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
.action-sheet-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.action-img {
  width: 180rpx;
  height: 180rpx;
}
.action-content {
  width: 75%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  .action-title {
    font-size: 32rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .action-stock {
    font-size: 24rpx;
    color: #999;
  }
  .action-price {
    font-size: 24rpx;
    color: red;
  }
  .action-amount {
    font-size: 24rpx;
  }
}
</style>

