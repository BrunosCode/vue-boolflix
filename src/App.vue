<template>
  <div id="app">
    <Header @movie-query="storeQuery" @current-page="storeCurrentPage"/>

    <main class="c-main">
      <!-- Common pages -->
      <div v-if="!movieQuery">
        <!-- Series and movies Page filter -->
        <div v-if="filtersAllowed(currentPage)" class="c-main__header">
          <h2 class="c-main__title">{{currentPage}}</h2>
          <select v-model="genreFilter" 
          class="c-main__filter" name="genre" id="genre">
            <option value="" selected>Select a Genre</option>
            <option v-for="(genre, i) in allGenres" :key="i" 
            :value="genre.id">{{genre.name}}</option>
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
import axios from "axios";

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
      allGenres: [],
      pages: pages,
      currentPage: "home",
      }
    
  },
  methods: {
    filtersAllowed: function(currentPage) {
      return currentPage === 'series' || currentPage === 'movies' ;
    },
    generateGenreList: function() {
      this.genreList = [];
      if (this.filtersAllowed(this.currentPage)) {
        // I didn't want to change all variables names
        let filterType = this.currentPage;
        if (filterType === "series") {
          filterType = "tv"
        }
        if (filterType === "movies") {
          filterType = "movie"
        }

        axios
          .get(`https://api.themoviedb.org/3/genre/${filterType}/list?`, {
            params: {
              api_key: "4e084792fe571911078b5fc34eaab7de",
              language: "en-US",
            }
          })
          .then((response) => {
            console.log("response", response.data.genres)
            this.allGenres.push(...response.data.genres);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    storeQuery: function(movieQuery) {
      this.movieQuery = movieQuery;
    },
    storeCurrentPage: function(currentPage) {
      this.currentPage = currentPage;
    },
  },
  computed: {
    collections: function() {
      return this.pages[this.currentPage];
    }
  },
  watch: {
    currentPage: function() {
      this.generateGenreList();
    }
  },

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
  position: relative;

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
