<template>
<div class="c-collection">
  <h2 class="c-collection__title">{{collection.title}}</h2>
  <div class="c-collection__row">
    <MovieCard v-for="(movie, i) in moviesList" :key="i" :movieData="movie"
    class="c-collection__card" />
  </div>
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
    movieQuery: String,
    collection: Object
  },
  data() {
    return {
      moviesList: []
    }
  },
  methods: {
    generateMovieList: function() {
      this.moviesList = [];
      axios
        .get(`https://api.themoviedb.org/3/${this.collection.url}`, {
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
.c-collection__row {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
}
</style>
