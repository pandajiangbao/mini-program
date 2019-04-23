<template>
  <div class="container" @tap="onTest">
    <van-tabs @change="onChange">
      <van-tab title="全部">
        <p class="not-content-container" v-if="orderList.length===0">亲~这里还没有订单噢~</p>
        <van-panel
          class="order-container"
          v-for="(item,index) in orderList"
          :key="index"
          @tap="toDetail(item.id)"
          :title="'订单号:'+item.orderNo"
          :desc="'下单时间:'+item.createdTime"
          :status="item.orderStatus"
        >
          <div class="order-detail-container">
            <img
              class="order-detail-img"
              v-for="(item1,index1) in item.orderDetailList"
              :key="index1"
              :src="item1.productImg"
            >
          </div>
        </van-panel>
      </van-tab>
      <van-tab title="已付款">
        <van-panel
          v-for="(item,index) in orderListIsPay"
          :key="index"
          @tap="toDetail(item.id)"
          :title="'订单号:'+item.orderNo"
          :desc="'下单时间:'+item.createdTime"
          :status="item.orderStatus"
        >
          <div class="order-detail-container">
            <img
              class="order-detail-img"
              v-for="(item1,index1) in item.orderDetailList"
              :key="index1"
              :src="item1.productImg"
            >
          </div>
        </van-panel>
      </van-tab>
      <van-tab title="已送达">
        <van-panel
          v-for="(item,index) in orderListIsReceviced"
          :key="index"
          @tap="toDetail(item.id)"
          :title="'订单号:'+item.orderNo"
          :desc="'下单时间:'+item.createdTime"
          :status="item.orderStatus"
        >
          <div class="order-detail-container">
            <img
              class="order-detail-img"
              v-for="(item1,index1) in item.orderDetailList"
              :key="index1"
              :src="item1.productImg"
            >
          </div>
        </van-panel>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: [],
  data () {
    return {}
  },
  mounted () {
    this.getOrderList()
  },
  computed: {
    ...mapState(['productList', 'orderList']),
    orderListIsPay: function () {
      return this.orderList.filter(item => item.orderStatus === '已付款')
    },
    orderListIsReceviced: function () {
      return this.orderList.filter(item => item.orderStatus === '已送达')
    }
  },
  methods: {
    ...mapActions(['getOrderList']),
    toDetail (id) {
      console.log('id :', id)
      wx.navigateTo({url: `../orderDetail/main?id=${id}`})
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
van-tabs {
  width: 100%;
}
.not-content-container {
  width: 100%;
  color: #999;
  font-size: 28rpx;
  text-align: center;
}
.order-container{
  width: 100%;
  border-bottom: 1rpx solid black
}
.order-detail-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.order-detail-img {
  width: 120rpx;
  height: 120rpx;
  margin: 10rpx;
}
</style>

