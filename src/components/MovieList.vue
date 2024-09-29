<template>
  <div>
    <h1 class="text-center my-4">Danh Sách Anime</h1>
    <div class="container">
      <!-- Filter Section -->
      <div class="row mb-4">
        <div class="col-md-3">
          <select v-model="selectedCategory" @change="applyFilters" class="form-select">
            <option value="">Tất cả thể loại</option>
            <option v-for="category in categories" :key="category.slug" :value="category.slug">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="col-md-3">
          <select v-model="selectedYear" @change="applyFilters" class="form-select">
            <option value="">Tất cả năm</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <div class="col-md-3">
          <select v-model="selectedCountry" @change="applyFilters" class="form-select">
            <option value="">Tất cả quốc gia</option>
            <option v-for="country in countries" :key="country.slug" :value="country.slug">
              {{ country.name }}
            </option>
          </select>
        </div>
        <div class="col-md-3">
          <select v-model="selectedType" @change="applyFilters" class="form-select">
            <option value="">Tất cả loại phim</option>
            <option value="series">Phim bộ</option>
            <option value="single">Phim lẻ</option>
            <option value="hoathinh">Hoạt hình</option>
            <option value="tvshows">TV Shows</option>
          </select>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="input-group mb-4">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Tìm kiếm phim..."
          @input="debounceSearch"
        >
        <button @click="searchMovies" class="btn btn-primary">
          <i class="bi bi-search"></i>
        </button>
      </div>

      <!-- Loading & Error -->
      <div v-if="loading" class="text-center my-4">Đang tải dữ liệu...</div>
      <div v-if="error" class="text-danger text-center my-4">{{ error }}</div>

<!-- Movie List -->
<div v-if="movies.length > 0" class="row row-cols-2 row-cols-sm-2 row-cols-md-4 g-4">
  <div v-for="(movie, index) in movies" :key="index" class="col">
    <div class="card h-100">
      <img :src="getMovieImage(movie)" :alt="movie.name" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">{{ movie.name }}</h5>
        <p class="card-text">{{ movie.description }}</p>
        <router-link class="btn btn-primary" :to="`/movie/${movie.slug}`">Xem phim</router-link>
      </div>
    </div>
  </div>
</div>


      <!-- No Movies Message -->
      <div v-if="!loading && movies.length === 0" class="text-center my-4">Không có phim nào.</div>

      <!-- Pagination -->
      <div v-if="!isSearching" class="d-flex justify-content-center my-4">
        <button @click="fetchMovies(currentPage - 1)" class="btn btn-secondary mx-1" :disabled="currentPage === 1">Trang trước</button>
        <span v-for="page in getPaginationButtons()" :key="page">
          <button @click="fetchMovies(page)" :class="{ 'btn-primary': page === currentPage, 'btn-secondary': page !== currentPage }" class="btn mx-1">{{ page }}</button>
        </span>
        <button @click="fetchMovies(currentPage + 1)" class="btn btn-secondary mx-1" :disabled="currentPage === totalPages">Trang sau</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
      loading: false,
      error: null,
      searchQuery: '',
      isSearching: false,
      debounceTimer: null,
      selectedCategory: '',
      selectedYear: '',
      selectedCountry: '',
      selectedType: '',
      categories: [
  { slug: 'tinh-cam', name: 'Tình cảm' },
  { slug: 'hai-huoc', name: 'Hài hước' },
  { slug: 'hanh-dong', name: 'Hành động' },
  { slug: 'vien-tuong', name: 'Viễn tưởng' },
  { slug: 'kinh-di', name: 'Kinh dị' },
  { slug: 'vo-thuat', name: 'Võ thuật' },
  { slug: 'phieu-luu', name: 'Phiêu lưu' },
  { slug: 'co-trang', name: 'Cổ trang' },
  { slug: 'bi-an', name: 'Bí ẩn' },
  { slug: 'hoc-duong', name: 'Học đường' },
  { slug: 'am-nhac', name: 'Âm nhạc' },
  { slug: 'the-thao', name: 'Thể thao' },
  { slug: 'chinh-kich', name: 'Chính kịch' },
  { slug: 'gia-dinh', name: 'Gia đình' },
  { slug: 'tai-lieu', name: 'Tài liệu' },
  { slug: 'hoat-hinh', name: 'Hoạt hình' },
  { slug: 'than-thoai', name: 'Thần thoại' },
  { slug: 'trinh-tham', name: 'Trinh thám' },
  { slug: 'tu-linh', name: 'Tử linh' },
  { slug: 'khoa-hoc', name: 'Khoa học' },
  { slug: 'thieu-nhi', name: 'Thiếu nhi' },
  { slug: 'chien-tranh', name: 'Chiến tranh' },
  { slug: 'phim-ma', name: 'Phim ma' }
],

years: Array.from({ length: 30 }, (_, i) => 2023 - i),

countries: [
  { slug: 'viet-nam', name: 'Việt Nam' },
  { slug: 'trung-quoc', name: 'Trung Quốc' },
  { slug: 'han-quoc', name: 'Hàn Quốc' },
  { slug: 'nhat-ban', name: 'Nhật Bản' },
  { slug: 'my', name: 'Mỹ' },
  { slug: 'anh', name: 'Anh' },
  { slug: 'phap', name: 'Pháp' },
  { slug: 'duc', name: 'Đức' },
  { slug: 'thai-lan', name: 'Thái Lan' },
  { slug: 'an-do', name: 'Ấn Độ' },
  { slug: 'hong-kong', name: 'Hồng Kông' },
  { slug: 'italia', name: 'Italia' },
  { slug: 'nga', name: 'Nga' },
  { slug: 'uc', name: 'Úc' },
  { slug: 'canada', name: 'Canada' },
  { slug: 'mexico', name: 'Mexico' },
  { slug: 'tay-ban-nha', name: 'Tây Ban Nha' },
  { slug: 'thai-lan', name: 'Thái Lan' },
  { slug: 'philipin', name: 'Philippines' },
  { slug: 'malaysia', name: 'Malaysia' }
]

    };
  },
  mounted() {
    this.fetchMovies(this.currentPage);
  },
  methods: {
    async fetchMovies(page) {
      this.loading = true;
      this.error = null;
      try {
        let url = `https://apii.online/api/danh-sach?type=hoathinh&page=${page}`;
        if (this.selectedCategory) url += `&category=${this.selectedCategory}`;
        if (this.selectedYear) url += `&year=${this.selectedYear}`;
        if (this.selectedCountry) url += `&country=${this.selectedCountry}`;
        if (this.selectedType) url += `&type=${this.selectedType}`;

        const response = await fetch(url);
        const data = await response.json();
        this.movies = data.items || [];
        this.currentPage = page;
        this.totalPages = data.pagination.totalPages;
      } catch (err) {
        this.error = 'Lỗi khi tải danh sách phim.';
      } finally {
        this.loading = false;
      }
    },
    async searchMovies() {
      if (!this.searchQuery.trim()) {
        this.isSearching = false;
        return this.fetchMovies(1);
      }

      this.isSearching = true;
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`https://apii.online/api/danh-sach?search=${encodeURIComponent(this.searchQuery)}`);
        const data = await response.json();
        this.movies = data.items || [];
        this.totalPages = 1;
      } catch (err) {
        this.error = 'Lỗi khi tìm kiếm phim.';
      } finally {
        this.loading = false;
      }
    },
    debounceSearch() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.searchMovies();
      }, 300);
    },
    getPaginationButtons() {
      const buttons = [];
      for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
        if (i > 0 && i <= this.totalPages) {
          buttons.push(i);
        }
      }
      return buttons;
    },
    getMovieImage(movie) {
      if (movie.thumb_url) {
        return movie.thumb_url.startsWith('http') ? movie.thumb_url : `https://apii.online${movie.thumb_url}`;
      } else {
        return 'default-thumbnail.jpg';
      }
    },
    applyFilters() {
      this.fetchMovies(1);
    },
  }
};
</script>
<style scoped>
.card-img-top {
    width: 100%; /* Đảm bảo ảnh chiếm toàn bộ chiều rộng của card */
    height: 400px; /* Chiều cao cố định cho tất cả các hình ảnh */
    object-fit: cover; /* Đảm bảo ảnh được cắt bớt để giữ tỉ lệ */
}

@media (max-width: 768px) { /* Sửa lại cú pháp media query */
    .card-img-top {
        height: 250px; /* Chiều cao cố định cho tất cả các hình ảnh trên màn hình nhỏ */
    }
}

</style>
