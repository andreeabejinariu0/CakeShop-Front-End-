<script setup>
import ShoppingCartView from './ShoppingCartView.vue';
import { RouterLink } from 'vue-router'
</script>
<template>
    <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center justify-content-between">
      <RouterLink to="/">
      <a href="#hero" class="logo d-flex align-items-center me-auto me-lg-0">
        <!-- Uncomment the line below if you also wish to use an image logo -->
        <!-- <img src="assets/img/logo.png" alt=""> -->
        <h1>Cake<span>.</span></h1>
      </a>
    </RouterLink>

      <nav id="navbar" class="navbar">
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><a href="#about">About</a></li>
          <li><RouterLink to="/menu">Menu</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
          <li class="dropdown">
            <a href="#"><span>Account</span><i class="bi bi-person fs-6 fst-normal"></i></a>
            <ul>
              <li><RouterLink to="/register">Register</RouterLink></li>
              <li><RouterLink to="/login">Login</RouterLink></li>
            </ul>
          </li>
        </ul>
      </nav><!-- .navbar -->
      
  
      <ShoppingCartView  />
      
     <!---<a class="btn-book-a-table" href="#book-a-table">Cos de cumparaturi</a>-->
      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

    </div>
  </header><!-- End Header -->
</template>


