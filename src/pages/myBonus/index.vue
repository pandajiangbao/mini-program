<template>
  <div class="container">
    <bonus v-for="(item,index) in userBonusList" :key="index" :userBonus="item"></bonus>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  },
  methods: {
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
