<template>
  <div class="container">
    <van-card
      class="shopping-cart-container"
      @tap="toDetail(item.product.id)"
      v-for="(item,index) in shoppingCartList"
      :key="index"
      :num="item.productAmount"
      :desc="'库存:'+item.product.stock"
      :price="item.product.price"
      :title="item.product.title"
      :thumb="item.product.img"
      lazy-load="true"
    >
      <view slot="footer">
        <van-button @tap.stop="handleAmount(item,-1)" round size="mini">-</van-button>
        <van-button @tap.stop="handleAmount(item,1)" round size="mini">+</van-button>
        <p class="product-priceSum">
          <van-checkbox class="product-selected" :value="item.isSelected" @change.stop="onSelect(item)"></van-checkbox>
          <van-button class="product-delete" round size="mini" type="danger" @tap.stop="onDelete(item.id)">删除</van-button>
          总价:¥{{item.priceSum}}
        </p>
      </view>
    </van-card>
    <van-submit-bar class="submit-bar" :price="totalPrice" button-text="提交订单" @submit="onSubmit">
      <view slot="select">
        <van-checkbox class="all-selected" :value="allSelected" @change="onAllChange">全选</van-checkbox>
      </view>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: [],
  data () {
    return {
    }
  },
  beforeMount () {},
  mounted () {
  },
  computed: {
    ...mapState([
      'userId',
      'shoppingCartList'
    ]),
    totalPrice: function () {
      return this.shoppingCartList.reduce((accumulator, item) => {
        if (item.isSelected) return accumulator + Number(item.priceSum)
        else return accumulator
      }, 0.00)
    },
    allSelected: function () {
      if (this.shoppingCartList.length !== 0) {
        return this.shoppingCartList.every((item) => item.isSelected === true)
      } else return false
    }
  },
  methods: {
    ...mapActions([
      'getShoppingCartList',
      'updateShoppingCart',
      'deleteShoppingCart'
    ]),
    handleAmount (item, amount) {
      item.productAmount += amount
      item.priceSum = (item.product.price * item.productAmount).toFixed(2)
      if (item.productAmount === 0) {
        this.deleteShoppingCart(item.id)
        return
      }
      this.updateShoppingCart({
        id: item.id,
        sum: item.priceSum,
        amount: item.productAmount
      })
    },
    toDetail (id) {
      wx.navigateTo({ url: `../productDetail/main?id=${id}` })
    },
    onSelect (item) {
      item.isSelected = !item.isSelected
      this.updateShoppingCart({
        id: item.id,
        isSelected: item.isSelected
      })
    },
    onAllChange () {
      if (!this.allSelected) {
        this.shoppingCartList.forEach((item) => {
          item.isSelected = true
        })
      } else {
        this.shoppingCartList.forEach((item) => {
          item.isSelected = false
        })
      }
    },
    onDelete (id) {
      this.deleteShoppingCart(id)
    },
    onSubmit () {
      wx.navigateTo({ url: `../pay/main` })
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

.shopping-cart-container {
  width: 100%;
  border-bottom: 1rpx solid #999;
}
.product-priceSum {
  color: red;
  font-size: 28rpx;
}
.product-selected {
  float: left;
}
.product-delete{
  float: left;
  margin-left:10rpx;
}
.all-selected{
  margin-left:60rpx;
}
.submit-bar {
  width: 100%;
  height: 200rpx;
}
</style>

