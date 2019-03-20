<template>
  <div class="container">
    <p class="not-content-container" v-if="addressList.length===0">亲~你还没有填写地址噢~</p>
    <van-panel
      class="address-container"
      v-for="(item,index) in addressList"
      @tap="toSelect(item.id)"
      :key="index"
      :title="'收货人:'+item.receiver"
      :status="item.phoneNumber"
      use-footer-slot
    >
    <p class="address-detail">{{item.province+item.city+item.county+item.detail}}</p>
      <view class="button-container" slot="footer">
        <van-button class="update-button" size="small" @tap="toUpdate(item.id)">修改</van-button>
        <van-button class="delete-button" size="small" type="danger" @tap="toDelete(item.id)">删除</van-button>
      </view>
    </van-panel>
    <button class="add-address" @tap="toAdd">+ 新增地址</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['addressList'])
  },
  mounted () {
    this.getAddressList()
  },
  methods: {
    ...mapMutations(['set_address_id']),
    ...mapActions([
      'getAddressList',
      'deleteAddress'
    ]),
    toSelect (id) {
      if (this.$mp.query.select) {
        this.set_address_id(id)
        wx.navigateBack({delta: 1})
      }
    },
    toUpdate (id) {
      wx.navigateTo({url: `../editAddress/main?id=${id}`})
    },
    toDelete (id) {
      this.deleteAddress(id)
    },
    toAdd () {
      wx.navigateTo({url: '../editAddress/main'})
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}
.not-content-container {
  width: 100%;
  color: #999;
  font-size: 28rpx;
  text-align: center;
}
.addres-container {
  width: 100%;
  border-bottom: 1rpx solid black;
}
.address-detail{
  margin-left: 28rpx;
  font-size: 28rpx;
}
.button-container{
  display: flex;
}
.add-address {
  width: 100%;
  position:fixed; 
  bottom:0;
}
.update-button{
  margin-left: 65%;
  padding: 10rpx;
}

.delete-button{
  padding: 10rpx;
}
van-panel {
  width: 100%;
  height: 250rpx;
}
</style>
