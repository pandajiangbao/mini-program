<template>
    <div class="movie-detail-container">
      <img class="movie-img" :src="moviesDetailObj.images.large" alt="">
      <p class="movie-name">{{moviesDetailObj.original_title}}</p>
      <div class="detail-content">
        <span>评分:{{moviesDetailObj.rating.average}}</span>
        <span>导演:{{moviesDetailObj.directors[0].name}}</span>
        <span>主演:{{moviesDetailObj.casts[0].name}} {{moviesDetailObj.casts[1].name}} {{moviesDetailObj.casts[2].name}}</span>
      </div>
      <button>我要观影</button>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: [],
  data () {
    return {
      moviesDetailObj: {}
    }
  },
  computed: {
    ...mapState(['movies'])
  },
  created () {
  },
  beforeMount () {
    this.moviesDetailObj = this.movies[this.$mp.query.index]
  },
  watch: {

  },
  methods: {

  },
  components: {

  }
}
</script>

<style scoped>
.movie-img{
  width: 100%;
  height: 500rpx;
}

.movie-name{
  font-size: 36rpx;
  text-align: center;
  font-weight: bold;
}

.detail-content{
  display: flex;
  flex-direction: column;
  margin-left: 20%;
  margin-top: 30rpx;
  line-height: 50rpx;
  font-size: 26rpx;
}

button{
  widows: 70%;
  height: 80rpx;
  background: #E92B90;
  line-height: 80rpx;
  color: #fff;
  font-size: 28rpx;
  margin-top: 20rpx;
}
</style>
