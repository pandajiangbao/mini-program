<template>
  <div>
    <div @tap="toMoviesDetail(index)" v-for="(item, index) in movies" :key="index" class="movies-container">
      <img class="movies-img" :src="item.images.large" alt="">
      <div class="movies-info">
        <p class="movies-name">{{item.original_title}}</p>
        <p class="movies-year">年份:{{item.year}}</p>
        <p class="movies-dir">导演:{{item.directors[0].name}}</p>
      </div>
      <p class="movies-rating">{{item.rating.average}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      movies: []
    }
  },
  beforeMount () {
    this.$fly.get('http://t.yushu.im/v2/movie/top250')
      .then((response) => {
        this.$store.dispatch('getMovies', response.data.subjects)
        this.movies = response.data.subjects
      })
      .catch((error) => {
        console.log(error)
      })
  },
  computed: {
  },
  methods: {
    toMoviesDetail (index) {
      wx.navigateTo({ url: '../moviesDetail/main?index=' + index })
    }
  }
}
</script>

<style scoped>
.movies-container{
  display: flex;
  padding: 10rpx;
  border-bottom: 1rpx solid rgb(121, 36, 36);
}

.movies-img{
  width:128rpx;
  height: 128rpx;
  margin-right: 20rpx;
}

.movies-info{
  width: 70%;
}

.movies-name{
  font-size: 32rpx;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movies-year{
  font-size: 28rpx;
  color: #999;
  margin: 5rpx 0;
}

.movies-dir{
  font-size: 30rpx;
  color: #666;
}

.movies-rating{
  font-size: 36rpx;
  font-weight: bold;
  color:red;
}
</style>