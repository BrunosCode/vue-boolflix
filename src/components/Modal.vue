<template>
  <div class="l-grid-col2 c-modal">
    <img :src="imgSrc" :alt="movie.title || movie.name" class="c-modal__img">
    <div class="c-modal__info">
      <button @click="closeModal" class="c-modal__closeBtn">
        <font-awesome-icon icon="times" />
      </button>
      <h3 class="c-modal__title">{{movie.title || movie.name}}</h3>
      <p v-if="!isTitleOriginal(movie)" class="c-modal__subtitle">{{movie.original_title || movie.original_name}}</p>
      <p class="c-modal__data">Language: 
        <lang-flag :iso="movie.original_language" :squared="false" 
        class="c-flag"/>
      </p>
      <p class="c-modal__data">Rating: 
        <font-awesome-icon v-for="(star, i) in stars" :key="i" :icon="['fas', 'star']"
        class="c-star"/>
        <font-awesome-icon v-for="(emptyStar, i) in ( 5 - stars )" :key="i + 5" :icon="['far', 'star']" 
        class="c-star"/>
      </p>
      <p v-if="movie.overview" class="c-modal__subtitle">Descrizione: </p>
      <p v-if="movie.overview" class="c-modal__data">{{movie.overview}}</p>
    </div>
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
      return `https://image.tmdb.org/t/p/w400/${this.movie.poster_path}`
    },
    stars: function() {
      return Math.ceil(this.movie.vote_average / 2);
    },
  },
  methods: {
    isTitleOriginal: function(movie) {
      return (movie.title || movie.name) === (movie.original_title || movie.original_name);
    },
    closeModal: function() {
      this.$emit("close-modal");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/variables.scss";

.c-modal {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  z-index: 4;
  max-width: 900px;
  padding: 1rem;
  background-color: $bg-secondary;
  box-shadow: 0 0 2rem $darkShadow;

  &__info {
    padding: 1rem;
  }
  &__title {
    color: $text-primary;
    font-weight: 700;
  }
  &__subtitle {
    color: $text-secondary;
    font-weight: 700;
    margin: .125rem 0;
  }
  &__data {
    color: $text-secondary;
    margin: .5rem 0;
  }
}



</style>
