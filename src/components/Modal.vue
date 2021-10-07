<template>
  <div class="c-container">
    
  </div>
</template>

<script>
import LangFlag from 'vue-lang-code-flags';

export default {
  name: 'Modal',
  components: {
    LangFlag
  },
  props: {
    movie: Object
  },
  computed: {
    imgSrc: function() {
      return `https://image.tmdb.org/t/p/w500/${this.movie.backdrop_path}`
    },
    stars: function() {
      return Math.ceil(this.movie.vote_average / 2);
    },
  },
  methods: {
    isTitleOriginal: function(movie) {
      return (movie.title || movie.name) === (movie.original_title || movie.original_name);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/variables.scss";




</style>
