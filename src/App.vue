<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import * as types from './store/mutation-types'
// import Dialog from '../static/vant/dialog/dialog'
export default {
  computed: {
    ...mapState([
      'userId',
      'userInfo'
    ])
  },
  created () {
    // 调用登录接口
    wx.login({
      success: loginRes => {
        wx.getUserInfo({
          success: infoRes => {
            this.setUserInfo(infoRes.userInfo)
            this.$fly.post(
              '/users/login',
              {
                code: loginRes.code, // 临时登录凭证
                rawData: infoRes.rawData, // 用户非敏感信息
                oldToken: wx.getStorageSync('token')}, // 旧登录token
              {
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                }
              })
              .then((response) => {
                if (response.data.isNew) {
                  console.log('新用户登录')
                  this.setIsNewUser()
                }
                // token存入storage并放入header中
                wx.setStorageSync('token', response.data.token)
                this.$fly.config.headers = {token: response.data.token}
                // userId存入vuex中
                this.setUserId(response.data.userId)
                // 获取用户收藏列表
                this.getUserStarList()
                // 获取全部物品信息
                this.getProductList()
                // 获取购物车信息
                this.getShoppingCartList()
                // 获取订单信息
                this.getOrderList()
                // 获取快递公司信息
                this.getShippingComList()
                // 获取地址信息
                this.getAddressList()
                // 获取用户优惠券
                this.getUserBonusList()
              })
              .catch((error) => {
                console.log(error)
              })
          }
        })
      }
    })
  },
  methods: {
    ...mapMutations({
      setUserId: types.RECEIVE_USER_ID,
      setIsNewUser: types.SET_IS_NEW_USER,
      setUserInfo: types.RECEIVE_USER_INFO
    }),
    ...mapActions([
      'getShoppingCartList',
      'getUserStarList',
      'getProductList',
      'getOrderList',
      'getShippingComList',
      'getAddressList',
      'getUserBonusList',
      'bonusToNewUser'
    ])
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
