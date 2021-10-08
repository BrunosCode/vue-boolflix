<template>
<div v-if="visibleRow.length >= 1" class="c-collection">
  <h2 v-if="collection.title" class="c-collection__title">{{collection.title}}</h2>
  <div class="l-row l-wrap l-alignCenter c-collection__row">
    <button @click="slideLeft" v-if="!movieQuery"
    class="c-collection__arrow c-collection__arrow--left">
      <font-awesome-icon icon="chevron-left"/>
    </button>
    <Card v-for="(movie, i) in visibleRow" :key="i" :movie="movie" @emit-modal="openModal"
    class="c-collection__card"/>
    <button @click="slideRight" v-if="!movieQuery"
    class="c-collection__arrow c-collection__arrow--right">
      <font-awesome-icon icon="chevron-right"/>
    </button>

  <Modal v-if="modalOpen" :movie="movieModal" @close-modal="closeModal"/>
  </div>
</div>
</template>

<script>
import Card from "./Card.vue";
import Modal from './Modal.vue';
import axios from "axios";

export default {
  name: 'Collection',
  components: {
    Card,
    Modal
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
      movieModal: {},
      modalOpen: false
    }
  },
  computed: {
    filteredList: function() {
      if (this.movieQuery) {
        return this.moviesList.filter(movie => movie.media_type !== "person");
      } else if (this.genreFilter) {
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
      // if the list is based on a search show all the results
      if(this.movieQuery) {
        return this.filteredList;
      }
      return this.filteredList.slice(this.rowStart, this.rowEnd);
    }
  },
  methods: {
    generateMovieList: function() {
      this.moviesList = [];
      let requestedPage = 1;
      // To avoid empty rows when filtered by genre
      if (this.genreFilter) {
        requestedPage = 5;
      }
      for(let i = 0; i < requestedPage; i++) {
        axios
          .get(`https://api.themoviedb.org/3/${this.collection.url}`, {
            params: {
              api_key: "4e084792fe571911078b5fc34eaab7de",
              language: "it-IT",
              query: this.movieQuery,
              page: i + 1
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
    openModal: function(movieModal) {
      this.modalOpen = true;
      this.movieModal = {...movieModal};
    },
    closeModal: function() {
      this.modalOpen = false;
      this.movieModal = {};
    }
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
    z-index: 2;
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
