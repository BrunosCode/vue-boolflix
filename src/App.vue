<template>
  <div id="app">
    <Header @movie-query="storeQuery"/>
    <div v-if="!movieQuery">
      <Movies v-for="(collection, i) in collections" :key="i" 
      :movie-query="movieQuery" :collection="collection"/>
    </div>
    <div v-if="movieQuery">
      <Movies v-for="(collection, i) in searchedCollection" :key="i" 
      :movie-query="movieQuery" :collection="collection"/>
    </div>
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
      movieQuery: "",
      collections: {
        discoverPopularMovie: {
          title: "Discover Popular Movies",
          url: "discover/movie/?sort_by=popularity.desc&",
        },
        discoverPopularSeries: {
          title: "Discover Popular Series",
          url: "discover/tv/?sort_by=popularity.desc&",
        }
      },
      searchedCollection: {
        searchedMovies: {
          title: "Movies Results",
          url: "search/movie/?",
        },
        searchedSeries: {
          title: "Series Results",
          url: "search/tv/?",
        }
      }
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
