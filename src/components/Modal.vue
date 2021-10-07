<template>
  <div @click="closeModal" class="c-modal__bg">
    <div class="c-modal">
      <div class="c-modal__imgContainer">
        <img :src="imgSrc" :alt="movie.title || movie.name" class="c-modal__img">
      </div>
      <button @click="closeModal" class="c-modal__closeBtn">
        <font-awesome-icon icon="times" />
      </button>

      <div class="c-modal__info">
        <h3 class="c-modal__title">{{movie.title || movie.name}}</h3>
        <div class="l-grid--col2 l-col--gap">
          <!-- first column  -->
          <div>
            <p v-if="!isTitleOriginal(movie)" class="c-modal__subtitle">{{movie.original_title || movie.original_name}}</p>
            <p v-if="movie.overview" class="c-modal__data">{{movie.overview}}</p>
          </div>
          <!-- /first column  -->

          <!-- second column  -->
          <div>
            <p class="c-modal__data">Genres: 
              <span v-for="(genre, i) in genres" :key="i"
              class="h-text--primary">{{genre.name}}<span v-if="genres.length - 1 > i">, </span></span>
            </p>
            <p class="c-modal__data">Cast: 
              <span v-for="(cast, i) in castList" :key="i"
              class="h-text--primary">{{cast.name}}<span v-if="castList.length - 1 > i">, </span></span>
            </p>
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
          </div>
          <!-- /second column  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LangFlag from 'vue-lang-code-flags';
import axios from "axios";

export default {
  name: 'Modal',
  components: {
    LangFlag
  },
  props: {
    movie: Object
  },
  data: function() {
    return {
      castList: [],
      genres: []
    }
  },
  computed: {
    imgSrc: function() {
      let imgWidth = 300;
      if (window.innerWidth > 900) {
        imgWidth = 780;
      }
      // if (window.innerWidth > 1400) {
      //   imgWidth = 1280;
      // }
      return `https://image.tmdb.org/t/p/w${imgWidth}/${this.movie.backdrop_path}`
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
  },
  created() {
    let category = "";
    // if is a series
    if (this.movie.name) {
      category = "tv"
    }
    // if is a movie
    if (this.movie.title) {
      category = "movie"
    }
    axios 
        .get(`https://api.themoviedb.org/3/${category}/${this.movie.id}?`, {
          params: {
            api_key: "4e084792fe571911078b5fc34eaab7de",
            language: "en-US",
            append_to_response: "credits"
          }
        })
        .then((response) => {
          // Get movie Genres
          this.genres.push(...response.data.genres)
          // Get movie Cast
          this.castList.push(...response.data.credits.cast.slice(0, 4));
        })
        .catch((error) => {
          console.log(error);
        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/variables.scss";

.c-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  border-radius: 1rem;
  overflow: hidden;
  z-index: 5;
  background-color: $bg-secondary;
  box-shadow: 0 0 5rem $bg-primary;

  &__bg {
    z-index: 4;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: $darkShadow;
  }

  &__closeBtn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: inline-block;
    height: 3rem;
    width: 3rem;
    line-height: 3rem;
    font-size: 1.5rem;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
    border: none;
    color: $text-secondary;
    background-color: $darkShadow;
  }
  &__imgContainer {
    position: relative;
  }
  &__imgContainer::after {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // background-image: linear-gradient(to top, rgba(0,0,0,0), 20% $bg-secondary);
    background: linear-gradient(to top, $bg-secondary 0%, transparent 40%);
    z-index: 5;
  }
  &__img {
    width: 100%;
    background-color: black;
  }
  &__info {
    padding: 1rem;
  }
  &__title {
    color: $text-primary;
    font-weight: 700;
    font-size: 2rem;
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

  @media screen and (max-width: 500px) {
    & {
      left: 0;
      transform: translate(0, -50%);
    }
  }
}
</style>
