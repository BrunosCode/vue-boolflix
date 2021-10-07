<template>
  <div class="c-container">
    <div @click="emitModal(movie)" class="c-card">
      <div class="c-card__cover">
        <h3 class="c-card__titleCover">{{movie.title || movie.name}}</h3>
        <img :src="imgSrc" :alt="movie.title || movie.name" 
        class="c-card__img" loading="lazy">
      </div>

      <div class="c-card__info">
        <h3 class="c-card__title">{{movie.title || movie.name}}</h3>
        <p v-if="!isTitleOriginal(movie)" class="c-card__subtitle">{{movie.original_title || movie.original_name}}</p>
        
        <div class="l-grid--col2">
          <p class="c-card__data">Language: 
            <lang-flag :iso="movie.original_language" :squared="false" 
            class="c-flag"/>
          </p>
          <p class="c-card__data">Rating: 
            <font-awesome-icon v-for="(star, i) in stars" :key="i" :icon="['fas', 'star']"
            class="c-star"/>
            <font-awesome-icon v-for="(emptyStar, i) in ( 5 - stars )" :key="i + 5" :icon="['far', 'star']" 
            class="c-star"/>
          </p>
        </div>

        <p v-if="movie.overview" class="c-card__subtitle">Descrizione: </p>
        <p v-if="movie.overview" class="c-card__data c-card__overview">{{movie.overview}}</p>
      </div>
    </div>
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
    },
    emitModal: function(movie) {
      this.$emit("emit-modal", movie);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/variables.scss";

.c-container {
  position: relative;
  min-width: 300px;
  margin-right: .5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:last-of-type {
    margin-right: 0;
  }
}
.c-card {
  border-radius: 1rem;
  &:hover {
    position: absolute;
    box-shadow: 0 0 20px $darkShadow;
    z-index: 2;
  }

  &__cover {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 300px;
    height: 200px;
    padding: .5rem;
  }
  &:hover &__cover {
    width: calc(300px + 300px/3);
    height: calc(200px + 200px/3);
  }
  &__titleCover {
    z-index: 1;
    padding: 0 .5rem;
    background-color: $textShadow;  
  }
  &:hover &__titleCover {
    display: none;
  }

  &__img {
    background-color: $bg-secondary;
    color: $bg-secondary;
    position: absolute;
    display: block;
    border-radius: .5rem;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover &__img {
    border-radius: 0;
  }


  &__info {
    padding: .75rem 1rem;
    width: 100%;
    display: none;
  }
  &:hover &__info {
    background-color: $bg-secondary;
    display: block;
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

  &__overview {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; 
  }
}
</style>
