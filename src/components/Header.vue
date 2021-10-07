<template>
  <div class="l-row l-spaceBetween l-alignCenter c-header">
    <h1 class="c-header__logo">BOOLFLIX</h1>
    <Searchbar @movie-query="emitQuery"/>
  </div>
</template>

<script>
import Searchbar from "./Searchbar.vue"

export default {
  name: 'Header',
  components: {
    Searchbar
  },
  methods: {
    emitQuery: function(movieQuery) {
      console.log("header", movieQuery)
      this.$emit("movie-query", movieQuery);
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
  margin-bottom: 3rem;

  &__logo {
    color: $red;
    font-family: 'Bebas Neue', cursive;
    text-transform: uppercase;
  }
}
</style>
