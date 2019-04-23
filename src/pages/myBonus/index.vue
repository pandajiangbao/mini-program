<template>
  <div  class="container">
    <bonus v-for="(item,index) in userBonusList" :key="index" :userBonus="item" :query="$mp.query.productPrice"></bonus>
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
    this.getUserBonusList()
  },
  methods: {
    ...mapActions([
      'getUserBonusList'
    ])
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
</style>
