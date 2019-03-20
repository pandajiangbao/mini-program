<template>
  <div class="container">
    <van-cell
      class="address-cell"
      @tap="toAddress"
      :title="address?address.receiver:'地址'"
      icon="location-o"
      size="large"
      :value="address?address.phoneNumber:'请选择'"
      :label="address?address.province+address.city+address.county+address.detail:''"
      is-link
    />
    <van-cell title="优惠券:" :value="bonusPrice?bonusPrice:'未选择'" is-link/>
    <van-cell title="快递公司" @tap="show = true" :value="shippingComName?shippingComName:'未选择'" is-link/>
    <van-cell title="运费" :value="shippingPrice?'¥'+shippingPrice:'请选择快递公司'"/>
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
    <van-submit-bar class="submit-bar" :price="totalPrice" button-text="付款" @submit="onSubmit"/>
    <van-action-sheet
      :show="show"
      title="请选择快递公司"
      :actions="shippingComListToShow"
      @select="onSelect"
      @close="show = false"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  props: [],
  data () {
    return {
      temp: null,
      flag: false,
      shippingCom: {},
      shippingComId: null,
      shippingComName: null,
      shippingPrice: null,
      bonusPrice: null,
      show: false
    }
  },
  computed: {
    ...mapState(['userId', 'productList', 'shoppingCartList', 'selectAddressId', 'addressList', 'shippingComList']),
    productListToPay: function () {
      if (this.temp) {
        const singleProdcut = this.productList.find((item) => {
          return item.id.toString() === this.temp
        })
        let singlePayList = [{
          userId: this.userId,
          productId: this.$mp.query.id,
          productAmount: this.$mp.query.amount,
          priceSum: this.$mp.query.amount * singleProdcut.price,
          product: singleProdcut
        }]
        return singlePayList
      } else {
        return this.shoppingCartList.filter(item => item.isSelected === true)
      }
    },
    productPrice: function () {
      return this.productListToPay.reduce((accumulator, item) => {
        return accumulator + Number(item.priceSum)
      }, 0.00)
    },
    totalPrice: function () {
      return this.productPrice + this.shippingPrice - this.bonusPrice
    },
    address: function () {
      return this.addressList.find((item) => item.id === this.selectAddressId)
    },
    shippingComListToShow: function () {
      return this.shippingComList.map((item) => {
        return {
          id: item.id,
          name: item.comName,
          subname: '运费:¥' + item.comPrice + ' 联系电话:' + item.phoneNumber
        }
      })
    },
    orderDetailList: function () {
      return this.productListToPay.map((item) => {
        return {
          productId: item.productId,
          productTitle: item.product.title,
          productAmount: item.productAmount,
          productImg: item.product.img,
          productSinglePrice: item.product.price,
          productTotalPrice: item.priceSum
        }
      })
    }
  },
  mounted () {
    if (this.$mp.query.id) {
      this.temp = this.$mp.query.id
      this.flag = true
    }
  },
  onUnload () {
    this.shippingComId = null
    this.shippingComName = null
    this.shippingCom = null
    this.shippingPrice = null
    this.flag = false
    this.temp = null
    this.address = null
    this.clear_address_id()
  },
  methods: {
    ...mapMutations(['clear_address_id']),
    ...mapActions([
      'getShoppingCartList',
      'deleteShoppingCart',
      'createOrder'
    ]),
    toAddress () {
      wx.navigateTo({url: `../myAddress/main?select=true`})
    },
    onSelect (event) {
      this.shippingCom = this.shippingComList.find((item) => item.id === event.mp.detail.id)
      this.shippingComId = this.shippingCom.id
      this.shippingComName = this.shippingCom.comName
      this.shippingPrice = this.shippingCom.comPrice
      this.show = false
    },
    onSubmit () {
      if (this.shippingComId && this.address) {
        this.createOrder({
          productPrice: this.productPrice,
          shippingPrice: this.shippingPrice,
          bonusPrice: this.bonusPrice,
          totalPrice: this.totalPrice,
          addressId: this.address.id,
          shippingComId: this.shippingComId,
          shoppingCartList: this.productListToPay,
          orderDetailList: this.orderDetailList,
          flag: this.flag
        })
      } else if (!this.address) {
        wx.showToast({
          title: '请选择地址', // 提示的内容,
          icon: 'none',
          duration: 1000, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      } else if (!this.shippingComId) {
        wx.showToast({
          title: '请选择快递公司', // 提示的内容,
          icon: 'none',
          duration: 1000, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      }
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
van-card {
  width: 100%;
  border-bottom: 1rpx solid #999;
}
van-cell {
  width: 100%;
}
.submit-bar {
  width: 100%;
  height: 200rpx;
}
</style>

