<template>
  <div class="c-movies">
    <MovieCard v-for="(movie, i) in moviesList" :key="i" :movieData="movie"
    class="c-movies__card" />
  </div>
</template>

<script>
import MovieCard from "./MovieCard.vue"
import axios from "axios";

export default {
  name: 'Movies',
  components: {
    MovieCard
  },
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
