<template>
  <div class="c-movies">
    <div v-for="(movie, i) in moviesList" :key="i" 
    class="c-movies__card">
      <h3>{{movie.title || movie.name}}</h3>
      <h5>{{movie.original_title || movie.original_name}}</h5>
      <img :src="`https://www.countryflags.io/${(movie.original_language == 'en') ? 'us' : movie.original_language }/flat/64.png`">
      <p>Language {{movie.original_language}}</p>
      <p>Vote {{movie.vote_average}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Movies',
  props: {
    movieQuery: String
  },
  data() {
    return {
      moviesList: []
    }
  },
  methods: {
    generateMovieList: function() {
      if(this.movieQuery !== "") {
        this.moviesList = [];
        axios
          .get('https://api.themoviedb.org/3/search/movie/', {
            params: {
              api_key: "4e084792fe571911078b5fc34eaab7de",
              language: "it-IT",
              query: this.movieQuery
            }
          })
          .then((response) => {
            this.moviesList.push(...response.data.results);
          })
          .catch((error) => {
            console.log(error);
          })
        axios
          .get('https://api.themoviedb.org/3/search/tv/', {
            params: {
              api_key: "4e084792fe571911078b5fc34eaab7de",
              language: "it-IT",
              query: this.movieQuery
            }
          })
          .then((response) => {
            this.moviesList.push(...response.data.results);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  },
  created() {
    this.generateMovieList()
  },
  watch: {
    movieQuery: function() {
      this.generateMovieList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
