<script setup>
//Template Main JS File
import "./assets/js/main.js";

import MenuView from './components/MenuView.vue'
import Footer from './components/Footer.vue'
import HomeView from './components/HomeView.vue'
import "../node_modules/bootstrap/dist/js/bootstrap.js";
</script>

<template>
  <Footer  />
  <HomeView  />
  <MenuView  />
</template>

<style >
@import "bootstrap/dist/css/bootstrap.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

/*Template Main CSS File*/
@import "./assets/css/main.css";

/* Vendor CSS Files */
/*@import "./assets/vendor/aos/aos.css";
@import "./assets/vendor/glightbox/css/glightbox.min.css";
@import "./assets/vendor/swiper/swiper-bundle.min.css";*/
</style>
