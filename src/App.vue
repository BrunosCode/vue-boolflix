<template>
  <div id="app">
    <Header @movie-query="storeQuery"/>

    <main class="c-main">
      <div v-if="!movieQuery">
        <Collection v-for="(collection, i) in collections" :key="i" 
        :movie-query="movieQuery" :collection="collection"/>
      </div>

      <div v-if="movieQuery">
        <Collection v-for="(collection, i) in searchedCollection" :key="i" 
        :movie-query="movieQuery" :collection="collection"/>
      </div>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Collection from './components/Collection.vue';

export default {
  name: 'App',
  components: {
    Header,
    Collection
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
@import "./assets/style/variables.scss";
@import "./assets/style/common.scss";

#app {
  background-color: $bg-primary;
  color: $text-primary;
  font-family: 'Open Sans', sans-serif;

  min-height: 100vh;
}

.c-main {
  padding: 1rem;
  display: flex;
  justify-content: center;
}

</style>
