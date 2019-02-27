<template>
  <div class="container">
    <van-search :value="value" placeholder="请输入搜索关键词" use-action-slot @search="onSearch">
      <view slot="action" @tap="toSearch">搜索</view>
    </van-search>
    <van-tabs @change="onChange">
      <van-tab title="全部">
        <div class="product-container">
          <product v-for="(item,index) in productList" :key="index" :product="item" :index="index" :status="0"></product>
        </div>
      </van-tab>
      <van-tab v-for="(item,index) in productCategoryList" :key="index" :title="item.name">
        <div class="product-container">
          <product v-for="(item,index2) in productListByCategory" :key="index2" :product="item" :index="index2" :status="1"></product>
        </div>
      </van-tab>
    </van-tabs>
    <!-- <van-card
      v-for="(item,index) in productList"
      :key="index"
      :item="item"
      :index="index"
      :price="item.price"
      :desc="item.info"
      :title="item.title"
      :thumb="item.img"
    >
      <view slot="footer">
        <van-button size="mini">购买</van-button>
        <van-button size="mini">取消</van-button>
      </view>
    </van-card>-->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import product from '@/components/product'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['productList', 'productListByCategory', 'productCategoryList'])
  },
  mounted () {
    this.getProductList()
    this.getProductCategoryList()
  },
  methods: {
    ...mapActions(['getProductList', 'getProductListByCategory', 'getProductCategoryList']),
    toSearch () {
      console.log(111)
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
