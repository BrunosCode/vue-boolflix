<template>
  <div id="app">
    <Header @movie-query="storeQuery"/>
    <Movies :movie-query="movieQuery"/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Movies from './components/Movies.vue';

export default {
  name: 'App',
  components: {
    Header,
    Movies
  },
  data() {
    return {
      movieQuery: "ritorno al futuro",
    }
  },
  methods: {
    storeQuery: function(movieQuery) {
      console.log("app", movieQuery);
      this.movieQuery = movieQuery;
    }
  }
}
</script>

<style lang="scss">

</style>
