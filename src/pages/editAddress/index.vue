<template>
  <div class="container">
    <van-cell-group>
      <van-field
        :value="receiver"
        @change="onReceiver"
        required
        clearable
        label="收货人"
        placeholder="请输入收货人名称"
      />
      <van-field
        :value="phone"
        @change="onPhone"
        label="联系电话"
        clearable
        required
        placeholder="请输入联系电话"
      />
      <van-cell @tap="onShow" title="地域" :value="province?province+city+county:'请选择省市区'" required is-link/>
      <van-popup :show="show" position="bottom">
        <van-area :show="show" @confirm="onConfirm" @close="onClose" @cancel="onClose" :area-list="areaList" :value="code"/>
      </van-popup>
      <van-field
        :value="detail"
        @change="onDetail"
        label="详细地址"
        clearable
        required
        placeholder="请输入详细地址"
      />
    </van-cell-group>
    <button class="submit" @tap="onSubmit">保存</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import aL from './areaList.js'
export default {
  data () {
    return {
      area: null,
      receiver: null,
      phone: null,
      detail: null,
      code: 110101,
      province: null,
      city: null,
      county: null,
      show: false,
      areaList: aL
    }
  },
  computed: {
    ...mapState(['addressList'])
  },
  mounted () {
    if (this.$mp.query.id) {
      this.area = this.addressList.find((item) => {
        return item.id.toString() === this.$mp.query.id
      })
      this.receiver = this.area.receiver
      this.phone = this.area.phoneNumber
      this.province = this.area.province
      this.city = this.area.city
      this.county = this.area.county
      this.detail = this.area.detail
    }
  },
  onUnload () {
    this.show = false
    this.area = null
    this.receiver = null
    this.phone = null
    this.detail = null
    this.code = 110101
  },
  methods: {
    ...mapActions(['getAddressList', 'addAddress', 'updateAddress', 'deleteAddress']),
    onReceiver (event) {
      this.receiver = event.mp.detail
    },
    onPhone (event) {
      this.phone = event.mp.detail
    },
    onDetail (event) {
      this.detail = event.mp.detail
    },
    onShow () {
      this.show = true
    },
    onConfirm (event) {
      this.province = event.mp.detail.values[0].name
      this.city = event.mp.detail.values[1].name
      this.county = event.mp.detail.values[2].name
      this.code = event.mp.detail.values[2].code
      this.show = false
    },
    onClose () {
      this.show = false
    },
    onSubmit () {
      if (this.receiver && this.phone && this.detail && this.province) {
        if (this.$mp.query.id) {
          this.updateAddress({
            id: this.$mp.query.id,
            receiver: this.receiver,
            phoneNumber: this.phone,
            province: this.province,
            city: this.city,
            county: this.county,
            detail: this.detail
          })
        } else {
          this.addAddress({
            receiver: this.receiver,
            phoneNumber: this.phone,
            province: this.province,
            city: this.city,
            county: this.county,
            detail: this.detail
          })
        }
      } else {
        wx.showToast({
          title: '请填上必填项', // 提示的内容,
          icon: 'none',
          duration: 1000, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      }
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

.submit {
  width: 100%;
  position: fixed;
  bottom: 0;
}

van-cell-group {
  width: 100%;
  height: 250rpx;
}
</style>
