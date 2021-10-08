<template>
  <div :class="{'h-active': movieQuery}" class="l-row l-alignCenter c-searchbar">
    <input v-model="movieQuery" @keyup.enter="emitQuery"
    class="c-searchbar__input" 
    type="text" name="movieQuery" id="movieQuery" placeholder="Search title">
    <font-awesome-icon icon="search" class="c-searchbar__icon--left"/>
    <font-awesome-icon v-if="movieQuery" @click="movieQuery = ''" icon="times" class="c-searchbar__icon--right"/>
    <button @click="emitQuery"
    class="c-searchbar__btn c-btn">Search</button>
  </div>
</template>

<script>
export default {
  name: 'Searchbar',
  data() {
    return {
      movieQuery: "",
    }
  },
  methods: {
    emitQuery: function() {
      this.$emit("movie-query", this.movieQuery);
    },
  }
  
}
</script>

<style scoped lang="scss">
@import "../assets/style/variables.scss";

.c-searchbar {
  position: relative;
  z-index: 1;

  &__input {
    background-color: inherit;
    color: inherit;
    border-color: transparent;
    outline: none;
    margin-right: 1rem;
    padding: .5rem 1rem;
    width: 2rem;
    border-radius: .25rem;
    transition: .5s;
    color: $bg-primary;
  }
  &:hover &__input,
  &:focus &__input,
  &.h-active &__input{
    background-color: $bg-primary;
    border-color: $text-primary;
    color: $text-primary;
    width: 12rem;
    padding: .5rem 3rem;

  }
  &__icon--left {
    position: absolute;
    left: .5rem;
    transition: .5s;
    &:hover {
      cursor: pointer;
    }
  }
  &__icon--right {
    display: none;
    position: absolute;
    left: 10.5rem;
  }
  &:hover &__icon--right,
  &:focus &__icon--right,
  &.h-active &__icon--right{
    display: inline-block;  
    cursor: pointer;
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
  @media screen and (max-width: 500px){
    &__btn {
      display: none;
    }
  }
}
</style>
