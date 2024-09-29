<template>
  <div id="app">
    <router-view @select-movie="handleSelectMovie" />
  </div>
</template>

<script>
export default {
  name: "App",
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
  margin-top: 60px;
}
</style>
