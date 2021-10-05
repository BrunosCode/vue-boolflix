<template>
  <div class="c-header">
    <h1 class="c-header__logo">BOOLFLIX</h1>
    <Searchbar />
  </div>
</template>

<script>
import Searchbar from "./Searchbar.vue"

export default {
  name: 'Header',
  components: {
    Searchbar
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
