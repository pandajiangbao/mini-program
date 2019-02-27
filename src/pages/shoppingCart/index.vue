<template>
  <div class="container">
    <van-card
      class="shopping-cart-container"
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
        <van-button round size="mini">-</van-button>
        <van-button round size="mini">+</van-button>
        <p class="product-priceSum">
          <van-checkbox class="product-selected" :value="item.isSelected" @change="onChange(index)"></van-checkbox>
          <van-button class="product-delete" round size="mini" type="danger" @tap="onDelete(item.id)">删除</van-button>
          总价:¥{{item.priceSum}}
        </p>
      </view>
    </van-card>
    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
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
      allSelected: false
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
      let sum = 0
      this.shoppingCartList.forEach((item, index) => {
        sum = item.priceSum + sum
        console.log('sum :', sum)
      })
      return parseInt(sum).toFixed(2)
    }
  },
  methods: {
    ...mapActions([
      'getShoppingCartList',
      'updateShoppingCart',
      'deleteShoppingCart'
    ]),
    onChange (index) {
      console.log(index)
      this.shoppingCartList[index].isSelected = !this.shoppingCartList[index]
        .isSelected
    },
    onAllChange () {
      this.allSelected = !this.allSelected
    },
    onDelete (id) {
      this.deleteShoppingCart(id)
        .then(() => {
          // 刷新购物车
          return this.getShoppingCartList(this.userId)
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
van-submit-bar {
  width: 100%;
}
</style>

