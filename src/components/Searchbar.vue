<template>
  <div class="c-searchbar">
    <input v-model="movieQuery"
    class="c-searchbar__input" type="text" name="movieQuery" id="movieQuery">
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

</style>
