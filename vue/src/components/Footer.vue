<script setup>
import ShoppingCartView from './ShoppingCartView.vue';
import { useClientStore } from "../stores/ClientStore.js";
import axios from "axios";
import { RouterLink } from 'vue-router'

const clientStore = useClientStore();



</script>

<template>
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center justify-content-between">
      <RouterLink to="/">
        <a href="#hero"> <img src="http://shop.test/img/logofly.png" class="img-fluid "
            style=" width: 100px;  height: 100px; margin-top: 25px;" alt="Home image" />
        </a>
      </RouterLink>

      <nav id="navbar" class="navbar">
        <ul>
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">About</RouterLink>
          </li>
          <li>
            <RouterLink to="/menu">Menu</RouterLink>
          </li>
          <li>
            <RouterLink to="/contact">Contact</RouterLink>
          </li>
          <li class="dropdown">
            <a href="#"><span>Account</span><i class="bi bi-person fs-6 fst-normal"></i></a>
            <ul>
              <li v-if="clientStore.clientToken == ''">
                <RouterLink to="/login">Log in</RouterLink>
              </li>
              <li v-if="clientStore.clientToken == ''">
                <RouterLink to="/register">Register</RouterLink>
              </li>
              <li v-if="clientStore.clientToken != ''">
                <p class="ms-3 mt-2">
                  {{ clientStore.clientName }}
                </p>
              </li>
              <li v-if="clientStore.clientToken != ''">
                <RouterLink to="/history">Istoric</RouterLink>
              </li>
              <li v-if="clientStore.clientToken != ''">
                <RouterLink @click=" clientStore.setClientToken(''), clientStore.setAdmin('false')" to="/">Log out</RouterLink>
              </li>

              <li v-if="clientStore.admin=='true'">
                <RouterLink to="/crudCategories">CRUD Categorii</RouterLink>
              </li>
              <li v-if="clientStore.admin=='true'">
                <RouterLink to="/crudProducts">CRUD Produse</RouterLink>
              </li>
              <li v-if="clientStore.admin=='true'">
                <RouterLink to="/crudUsers">CRUD Users</RouterLink>
              </li>

            </ul>
          </li>
        </ul>
      </nav><!-- .navbar -->


      <ShoppingCartView />

      <!---<a class="btn-book-a-table" href="#book-a-table">Cos de cumparaturi</a>-->
      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

    </div>
  </header><!-- End Header -->
</template>


