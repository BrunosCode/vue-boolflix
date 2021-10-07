<template>
  <div class="l-row l-alignCenter c-searchbar">
    <input v-model="movieQuery" @enter="emitQuery"
    class="c-searchbar__input" 
    type="text" name="movieQuery" id="movieQuery" placeholder="Search title">
    <font-awesome-icon icon="search" class="c-searchbar__icon"/>
    <button @click="emitQuery"
    class="c-searchbar__btn c-btn">Search</button>
  </div>
</template>

<script>
export default {
  name: 'Searchbar',
  data() {
    return {
      movieQuery: ""
    }
  },
  methods: {
    emitQuery: function() {
      console.log("searchbar", this.movieQuery)
      this.$emit("movie-query", this.movieQuery);
    }
  }
  
}
</script>

<style scoped lang="scss">
@import "../assets/style/variables.scss";

.c-searchbar {
  position: relative; 

  &__input {
    background-color: inherit;
    color: inherit;
    border-color: transparent;
    outline: none;
    margin-right: 1rem;
    padding: .5rem 1rem;
    width: 0;
    border-radius: .25rem;
    transition: .5s;
  }
  &:hover &__input {
    background-color: $bg-primary;
    border-color: white;
    color: white;
    width: 15rem;
    padding: .5rem 2rem;
  }

  &__icon {
    position: absolute;
    left: 0;
    transition: .5s;
  }
  &:hover &__icon {
    left: .5rem;
  }

  &__btn {
    padding: .5rem 1rem;
    border-radius: .5rem;
    background-color: $bg-secondary;
    border: none;
    box-shadow: 0 0 4px $lightShadow;
    color: white;
    font-weight: 700;
    text-transform: uppercase;

    &:hover {
      cursor: pointer;
      box-shadow: 0 0 2px white;
    }
  }

}
</style>
