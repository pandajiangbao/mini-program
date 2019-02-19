<script>
import {mapMutations} from 'vuex'
import * as types from './store/mutation-types'
export default {
  created () {
    // 调用登录接口
    wx.login({
      success: loginRes => {
        wx.getUserInfo({
          success: infoRes => {
            this.setUserInfo(infoRes.userInfo)
            this.$fly.post(
              'http://localhost:8082/user/login',
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
                if (response.data.token) {
                  console.log('登录成功')
                }
                wx.setStorageSync('token', response.data.token)
                wx.setStorageSync('userId', response.data.userId)
                // token放入header中
                this.$fly.config.headers = {token: response.data.token}
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
      setUserInfo: types.RECEIVE_USERINFO // map `this.add()` to `this.$store.commit('increment')`
    })
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
