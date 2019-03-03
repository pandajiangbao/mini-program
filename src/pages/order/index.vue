<template>
  <div class="container">
    <van-tabs @change="onChange">
      <van-tab title="全部">
        <div class="product-container">
          <product v-for="(item,index) in productList" :key="index" :product="item" :index="index" :status="0"></product>
        </div>
      </van-tab>
      <van-tab title="已付款">
        <div class="product-container">
          <product v-for="(item,index2) in productListByCategory" :key="index2" :product="item" :index="index2" :status="1"></product>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {

    }
  },
  beforeMount () {
  },
  computed: {
  },
  methods: {
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

</style>

