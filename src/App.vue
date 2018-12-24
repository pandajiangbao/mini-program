<script>
export default {
  created () {
    // 调用登录接口
    wx.login({
      success: res => {
        if (res.code) {
          this.$fly.post(
            'http://localhost:8082/api/login',
            {code: res.code,
              oldToken: wx.getStorageSync('token')},
            {headers: {
              'content-type': 'application/x-www-form-urlencoded'
            }})
            .then((response) => {
              console.log('response :', response)
              wx.setStorageSync('token', response.data.token)
              // token放入header中
              this.$fly.config.headers = {token: response.data.token}
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    })
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
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
  padding: 200rpx 0;
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
