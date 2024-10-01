<template>
  <div id="app">
    <AppHeader />
    <router-view @select-movie="handleSelectMovie" />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'; // Cập nhật đường dẫn
import AppFooter from './components/AppFooter.vue'; // Cập nhật đường dẫn

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      selectedMovie: null,
    };
  },
  methods: {
    handleSelectMovie(movie) {
      this.selectedMovie = movie;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
html, body {
    height: 100%;
    margin: 0;
}

body {
    display: flex;
    flex-direction: column;
}

footer {
    background-color: #f8f9fa;
    padding: 1rem;
}
</style>
