<template>
  <div>
    <p>{{detailObj.title}}</p>
    <p>{{detailObj.date}}</p>
    <img class="imgContainer" :src="detailObj.url" alt="">
    <p>{{detailObj.detail}}</p>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: [],
  data () {
    return {
      detailObj: {}
    }
  },
  beforeMount () {
    console.log(this.pandaList)
    this.detailObj = this.pandaList.pandaData[this.$mp.query.index]
  },
  computed: {
    ...mapState(['pandaList'])
  }
}
</script>

<style scoped>
.imgContainer{
  width: 100%;
}
</style>

