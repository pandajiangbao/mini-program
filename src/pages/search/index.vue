<template>
  <div class="container">
    <van-search v-model="value" placeholder="请输入搜索关键词" use-action-slot @search="onSearch" @change="onChange" @cancel="onCancel"/>
    <p class="not-content-container" v-if="productListByQuery.length===0">亲~这里没有你所搜索的商品噢~</p>
    <div class="product-container">
      <product v-for="(item,index) in productListByQuery" :key="index" :product="item" :index="index" :status="0"></product>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import product from '@/components/product'
export default {
  data () {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState([
      'productListByQuery'
    ])
  },
  mounted () {
    this.value = this.$mp.query.value
  },
  methods: {
    ...mapActions([
      'getProductListByQuery'
    ]),
    onSearch () {
      this.getProductListByQuery(this.value)
    },
    onChange (event) {
      this.value = event.mp.detail
    }
  },
  components: {
    product
  }
}
</script>

<style lang='scss' scoped>
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
.product-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

van-search {
  width: 100%;
}
</style>

