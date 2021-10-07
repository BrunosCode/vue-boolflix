<template>
<div class="c-collection">
  <h2 class="c-collection__title">{{collection.title}}</h2>
  <div class="l-row l-alignCenter c-collection__row">
    <button @click="slideLeft" class="c-collection__arrow c-collection__arrow--left">
      <font-awesome-icon icon="chevron-left"/>
    </button>
    <Card v-for="(movie, i) in visibleRow" :key="i" :movie="movie"
    class="c-collection__card"/>
    <button @click="slideRight" class="c-collection__arrow c-collection__arrow--right">
      <font-awesome-icon icon="chevron-right"/>
    </button>
  </div>
</div>
</template>

<script>
import Card from "./Card.vue"
import axios from "axios";

export default {
  name: 'Collection',
  components: {
    Card
  },
  props: {
    movieQuery: String,
    genreFilter: String,
    collection: Object
  },
  data() {
    return {
      moviesList: [],
      rowPosition: 0,
    }
  },
  computed: {
    filteredList: function() {
      if (this.genreFilter) {
        return this.moviesList.filter(movie => movie.genre_ids.includes(parseInt(this.genreFilter)));
      } else {
        return this.moviesList;
      }
    },
    // Calculate the possibile number of card per row based on window's width
    cardPerRow: function() {
      return parseInt(window.innerWidth / 300); 
    },
    rowStart: function() {
      return this.rowPosition;
    },
    rowEnd: function() {
      return this.rowPosition + this.cardPerRow;
    },
    visibleRow: function() {
      return this.filteredList.slice(this.rowStart, this.rowEnd);
    }
  },
  methods: {
    generateMovieList: function() {
      this.moviesList = [];
      axios
        .get(`https://api.themoviedb.org/3/${this.collection.url}`, {
          params: {
            api_key: "4e084792fe571911078b5fc34eaab7de",
            language: "it-IT",
            query: this.movieQuery
          }
        })
        .then((response) => {
          this.moviesList.push(...response.data.results);
        })
        .catch((error) => {
          console.log(error);
        })
      // To avoid empty rows when filtered by genre
      if (this.genreFilter) {
        axios
        .get(`https://api.themoviedb.org/3/${this.collection.url}`, {
          params: {
            api_key: "4e084792fe571911078b5fc34eaab7de",
            language: "it-IT",
            query: this.movieQuery,
            page: 2,
          }
        })
        .then((response) => {
          this.moviesList.push(...response.data.results);
        })
        .catch((error) => {
          console.log(error);
        })

        axios
        .get(`https://api.themoviedb.org/3/${this.collection.url}`, {
          params: {
            api_key: "4e084792fe571911078b5fc34eaab7de",
            language: "it-IT",
            query: this.movieQuery,
            page: 3,
          }
        })
        .then((response) => {
          this.moviesList.push(...response.data.results);
        })
        .catch((error) => {
          console.log(error);
        })

        axios
        .get(`https://api.themoviedb.org/3/${this.collection.url}`, {
          params: {
            api_key: "4e084792fe571911078b5fc34eaab7de",
            language: "it-IT",
            query: this.movieQuery,
            page: 4,
          }
        })
        .then((response) => {
          this.moviesList.push(...response.data.results);
        })
        .catch((error) => {
          console.log(error);
        })
      }
    },
    slideRight: function() {
      if (this.rowPosition < this.moviesList.length - 5) {
        this.rowPosition += 1;
      } else {
        this.rowPosition = 0;
      }
    },
    slideLeft: function() {
      if (this.rowPosition > 0) {
        this.rowPosition -= 1;
      } else {
        this.rowPosition = this.moviesList.length - 5;
      }
    },
  },
  created() {
    this.generateMovieList()
  },
  watch: {
    movieQuery: function() {
      this.generateMovieList()
    }
  }
}
</script>

<style lang="scss">
@import "../assets/style/variables.scss";

.c-collection {
  margin-bottom: 3rem;
  position: relative;
  margin-top: 3rem;

  &__title {
    margin-bottom: .75rem;
  }

  &__arrow {
    position: absolute;
    font-size: 2rem;
    z-index: 3;
    padding: 1rem .75rem;
    border-radius: .5rem;
    color: $text-secondary;
    background-color: $darkShadow;
    border: none;

    &:hover {
      cursor: pointer;
    }

    &--left {
      left: 0;
    }
    &--right {
      right: 0;
    }
  }
}
</style>
