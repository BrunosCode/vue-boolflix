<template>
  <div id="app">
    <Header @movie-query="storeQuery" @current-page="storeCurrentPage"/>

    <main class="c-main">
      <!-- Common pages -->
      <div v-if="!movieQuery">
        <!-- Series and movies Page filter -->
        <div v-if="currentPage === 'series' || currentPage === 'movies'"
        class="c-main__header">
          <h2 class="c-main__title">{{currentPage}}</h2>
          <select v-model="genreFilter" 
          class="c-main__filter" name="genre" id="genre">
            <option value="" disabled selected>Select a Genre</option>
            <option value="prova">Prova</option>
          </select>
        </div>

        <Collection v-for="(collection, i) in collections" :key="i" 
        :movie-query="movieQuery" :collection="collection" :genre-filter="genreFilter"/>
      </div>

      <!-- Search resutls page -->
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
import pages from './data/pages.json';

export default {
  name: 'App',
  components: {
    Header,
    Collection
  },
  data() {
    return {
      movieQuery: "",
      genreFilter: "",
      pages: pages,
      currentPage: "home"
      }
    
  },
  methods: {
    storeQuery: function(movieQuery) {
      console.log("app", movieQuery);
      this.movieQuery = movieQuery;
    },
    storeCurrentPage: function(currentPage) {
      console.log("app", currentPage);
      this.currentPage = currentPage;
    }
  },
  computed: {
    collections: function() {
      return this.pages[this.currentPage];
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

  &__title {
    display: inline-block;
    text-transform: capitalize;
    margin-right: 4rem;
    font-size: 2rem;
  }

  &__filter {
    background-color: black;
    color: white;
    padding: .5rem .75rem .325rem;
    vertical-align: super;
    font-weight: 700;
  }
}

</style>
