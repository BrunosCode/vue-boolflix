<template>
  <div class="c-card">
    <img :src="imgSrc" :alt="movieData.title || movieData.name">
    <h3>{{movieData.title || movieData.name}}</h3>
    <h5>{{movieData.original_title || movieData.original_name}}</h5>
    <img :src="flagImgSrc" :alt="this.movieData.original_language">
    <p>Language {{movieData.original_language}}</p>
    <font-awesome-icon v-for="star in stars" :key="star" icon="star" />
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movieData: Object
  },
  computed: {
    imgSrc: function() {
      return `https://image.tmdb.org/t/p/w300/${this.movieData.backdrop_path}`
    },
    flagImgSrc: function() {
      return `https://www.countryflags.io/${ (this.movieData.original_language == 'en') ? 'us' : this.movieData.original_language }/flat/24.png`;
    },
    stars: function() {
      return Math.floor(this.movieData.vote_average / 2);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
