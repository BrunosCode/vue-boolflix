<template>
  <div class="c-card">
    <img :src="imgSrc" :alt="movieData.title || movieData.name" 
    class="c-card__img">
    <h3 class="c-card__title">{{movieData.title || movieData.name}}</h3>
    <h4 class="c-card__data">{{movieData.original_title || movieData.original_name}}</h4>
    <p class="c-card__data">Language: 
      <lang-flag :iso="this.movieData.original_language" :squared="false" 
      class="c-flag"/>
    </p>
    <p class="c-card__data">Rating: 
      <font-awesome-icon v-for="star in stars" :key="star" icon="star" 
      class="c-star"/>
    </p>
  </div>
</template>

<script>
import LangFlag from 'vue-lang-code-flags';

export default {
  name: 'Card',
  components: {
    LangFlag
  },
  props: {
    movieData: Object
  },
  computed: {
    imgSrc: function() {
      return `https://image.tmdb.org/t/p/w300/${this.movieData.backdrop_path}`
    },
    flagImgSrc: function() {
      return `https://www.countryflags.io/${ (this.movieData.original_language == 'en') ? 'us' : this.movieData.original_language }/flat/24.png`;
    },
    stars: function() {
      return Math.ceil(this.movieData.vote_average / 2);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/variables.scss";

.c-card {
  padding: .5rem .75rem;
  margin-right: .5rem;
  background-color: $bg-secondary;

  > * {
    margin-bottom: .5rem;
  }

  &__data {
    color: $text-secondary;
  }
}

.c-star {
  color: $gold;
}
</style>
