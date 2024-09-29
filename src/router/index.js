import { createRouter, createWebHistory } from 'vue-router';
import MovieList from '../components/MovieList.vue';
import MovieDetails from '../components/MovieDetails.vue';
import MoviePlayer from '../components/MoviePlayer.vue'; // Import MoviePlayer

const routes = [
  { path: '/', component: MovieList },
  { path: '/movie/:slug', name: 'MovieDetails', component: MovieDetails, props: true },
  { path: '/movie/:slug/player/:episode', name: 'MoviePlayer', component: MoviePlayer, props: true } // Thêm tuyến đường cho MoviePlayer
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;