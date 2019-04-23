<template>
  <div class="container">
    <van-search :value="value" placeholder="请输入搜索关键词" use-action-slot @search="onSearch" @change="onSearchChange" @cancel="onCancel"/>
    <van-tabs @change="onChange">
      <van-tab title="全部">
        <div class="product-container">
          <product v-for="(item,index) in productList" :key="index" :product="item"></product>
        </div>
      </van-tab>
      <van-tab v-for="(item,index) in productCategoryList" :key="index" :title="item.name">
        <div class="product-container">
          <product v-for="(item,index2) in productListByCategory" :key="index2" :product="item"></product>
        </div>
      </van-tab>
    </van-tabs>
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
      'productList',
      'productListByCategory',
      'productCategoryList',
      'productListByQuery'
    ])
  },
  mounted () {
    this.getProductCategoryList()
  },
  methods: {
    ...mapActions([
      'getProductListByCategory',
      'getProductCategoryList',
      'getProductListByQuery'
    ]),
    onSearch () {
      this.getProductListByQuery(this.value).then(() => {
        wx.navigateTo({ url: `../search/main?value=${this.value}` })
      })
    },
    onSearchChange (event) {
      this.value = event.mp.detail
    },
    onChange (event) {
      this.getProductListByCategory(event.mp.detail.index)
    }
  },
  components: {
    product
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

van-tabs {
  width: 100%;
}
</style>
