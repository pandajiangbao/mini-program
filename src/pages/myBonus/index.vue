<template>
  <div class="container">
    <bonus v-for="(item,index) in userBonusList" :key="index" :bonus="item"></bonus>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import bonus from '@/components/bonus'
export default {
  data () {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState([
      'userBonusList'
    ])
  },
  mounted () {
    this.getProductCategoryList()
  },
  methods: {
    ...mapActions([
      'getProductListByQuery'
    ]),
    onSearchChange (event) {
      this.value = event.mp.detail
    },
    onChange (event) {
      this.getProductListByCategory(event.mp.detail.index)
    }
  },
  components: {
    bonus
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
