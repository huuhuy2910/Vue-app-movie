<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="padding-left: 100px; padding-right: 100px;">
      <div class="container-fluid d-flex justify-content-between align-items-center">
          <a class="navbar-brand" href="/">
              <img src="@/assets/logo.png" alt="Logo" width="100" height="auto" />
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="/">Trang Chủ</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">Phim Mới</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">Liên Hệ</a>
                  </li>
              </ul>
          </div>
      </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader"
};
</script>

<style>
@media (max-width: 768px) {
    .navbar {
        padding-left: 10px !important;
        padding-right: 10px !important;
    }
}
</style>
