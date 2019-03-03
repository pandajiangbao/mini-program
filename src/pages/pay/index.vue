<template>
  <div class="container">
    <van-cell
      class="address-cell"
      title="伍时宏"
      icon="location-o"
      size="large"
      value="18520554670"
      :label="province+city+county+detail"
      is-link
    />
    <van-cell title="优惠券:" value="满100减20" is-link/>
    <van-cell title="快递公司" :value="shippingCom" is-link/>
    <van-cell title="运费" :value="'¥'+shippingPrice"/>
    <van-cell title="商品"/>
    <van-card
      v-for="(item,index) in productListToPay"
      :key="index"
      :num="item.productAmount"
      :price="item.product.price"
      :title="item.product.title"
      :thumb="item.product.img"
      lazy-load="true"
    />
    <van-submit-bar class="submit-bar" :price="totalPrice " button-text="付款" @submit="onSubmit"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: [],
  data () {
    return {
      province: '广东省',
      city: '广州市',
      county: '天河区',
      detail: '五山路华南农业大学华山区14栋302',
      shippingCom: '熊猫快递',
      shippingPrice: 10.00,
      bonusPrice: 20.00

    }
  },
  computed: {
    ...mapState(['userId', 'shoppingCartList']),
    productListToPay: function () {
      return this.shoppingCartList.filter(item => item.isSelected === true)
    },
    productPrice: function () {
      return this.productListToPay.reduce((accumulator, item) => {
        return accumulator + Number(item.priceSum)
      })
    },
    totalPrice: function () {
      return this.productPrice + this.shippingPrice - this.bonusPrice
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getShoppingCartList',
      'deleteShoppingCart',
      'createOrder'
    ]),
    onSumbit () {
      console.log('todo')
      // this.createOrder({
      // })
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
.cell-group {
  width: 100%;
  margin-top: 50rpx;
}
.address-cell {
  background-color: rgb(240, 139, 15);
}
van-cell {
  width: 100%;
}
.submit-bar {
  width: 100%;
  height: 200rpx;
}
</style>

