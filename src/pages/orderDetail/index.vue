<template>
  <div class="container">
    <van-cell
      class="address-cell"
      :title="address.receiver"
      icon="location-o"
      size="large"
      :value="address.phoneNumber"
      :label="address.province+address.city+address.county+address.detail"
    />
    <van-cell title="商品" :value="order.orderStatus"/>
    <van-card
      v-for="(item,index) in order.orderDetailList"
      :key="index"
      :num="item.productAmount"
      :price="item.productSinglePrice"
      :title="item.productTitle"
      :thumb="item.productImg"
      lazy-load="true"
    />
    <van-cell title="订单号:" :value="order.orderNo"/>
    <van-cell title="下单时间:" :value="order.createdTime"/>
    <van-cell title="快递公司" :value="shippingCom.comName"/>
    <van-cell title="快递联系电话" :value="shippingCom.phoneNumber"/>
    <van-cell title="运费" :value="'¥'+order.shippingPrice"/>
    <van-cell title="优惠金额" :value="'-¥'+order.bonusPrice"/>
    <van-cell title="合计" :value="'¥'+order.totalPrice"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: [],
  data () {
    return {
      order: {},
      address: {},
      shippingCom: {}
    }
  },
  computed: {
    ...mapState(['userId', 'orderList', 'shoppingCartList', 'shippingComList', 'addressList'])
  },
  mounted () {
    this.order = this.orderList.find((item) => item.id.toString() === this.$mp.query.id)
    this.shippingCom = this.shippingComList.find((item) => item.id === this.order.shippingComId)
    this.address = this.addressList.find((item) => item.id === this.order.addressId)
  },
  onUnload () {
    wx.setTabBarBadge({
      index: 2,
      text: String(this.shoppingCartList.length)
    })
  },
  methods: {
    ...mapActions([
    ])
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
van-card {
  width: 100%;
}
van-cell {
  width: 100%;
}
</style>

