<template>
  <div class="container">
    <p class="not-content-container" v-if="userStarList.length===0">亲~这里还没有收藏商品噢~</p>
    <van-card
      class="user-star-container"
      @tap="toDetail(item.product.id)"
      v-for="(item,index) in userStarList"
      :key="index"
      :desc="'库存:'+item.product.stock+' 销量:'+item.product.sales"
      :price="item.product.price"
      :title="item.product.title"
      :thumb="item.product.img"
      lazy-load="true"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: [],
  data () {
    return {}
  },
  mounted () {
  },
  computed: {
    ...mapState(['userStarList'])
  },
  methods: {
    toDetail (id) {
      wx.navigateTo({ url: `../productDetail/main?id=${id}` })
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
.user-star-container{
  width: 100%;
  border-bottom: 1rpx solid #999
}

</style>

