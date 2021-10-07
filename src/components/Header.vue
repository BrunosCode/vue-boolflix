<template>
  <div class="l-row l-alignCenter c-header">
    <h1  @click="setCurrentPage('home')" class="c-header__logo">BOOLFLIX</h1>
    <button v-for="(page, i) in pages" :key="i" @click="setCurrentPage(page)"
    :class="{'h-active': currentPage === page}" class="c-header__link">{{page}}</button>
    <Searchbar @movie-query="emitQuery" class="c-header__searchbar"/>
  </div>
</template>

<script>
import Searchbar from "./Searchbar.vue"

export default {
  name: 'Header',
  components: {
    Searchbar
  },
  data: function() {
    return {
      currentPage: "home",
      pages: ["home", "movies", "series"]
    }
  },
  methods: {
    emitQuery: function(movieQuery) {
      console.log("header", movieQuery)
      this.$emit("movie-query", movieQuery);
    },
    setCurrentPage: function(currentPage) {
      this.currentPage = currentPage;
      this.$emit("current-page", currentPage)
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/variables.scss";

.c-header {
  background-image: linear-gradient($bg-primary, $bg-secondary);
  padding: .5rem 1rem;

  &__logo {
    color: $red;
    font-family: 'Bebas Neue', cursive;
    text-transform: uppercase;

    &:hover {
      cursor: pointer;
    }
  }

  &__link {
    background-color: inherit;
    border: none; 
    color: $text-secondary;
    margin-left: 1.5rem;
    text-transform: capitalize;

    &:hover {
      color: $text-primary;
      cursor: pointer;
    }

    &.h-active {
      color: $text-primary;
    }
  }

  &__searchbar {
    margin-left: auto;
  }

  @media screen and (max-width: 500px){
    &__link {
      display: none;
    }
  }
}
</style>
