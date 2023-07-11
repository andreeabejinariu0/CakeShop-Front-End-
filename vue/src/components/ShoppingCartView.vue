<script setup>
import Product from './Product.vue';
import CartProduct from '../components/CartProduct.vue';

import {ref} from 'vue';
import { onMounted } from "vue";
import axios from "axios";

import { useShoppingCartStore } from "../stores/shoppingCart";

const shoppingCartStore = useShoppingCartStore();


</script>

<template>

<button class="btn-book-a-table" type="button" data-bs-toggle="offcanvas"
 data-bs-target="#shoppingCart" aria-controls="shoppingCart">Cos de cumparaturi</button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="shoppingCart" aria-labelledby="shoppingCartLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="shoppingCartLabel">Detalii cos de cumparaturi</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <p class="fs-3" style="color: rgb(199, 53, 53);">Total: {{shoppingCartStore.total}} lei </p>
  <button class="btn-book-a-table">Plasare comanda</button> 

  <div class="offcanvas-body">
    <CartProduct
          v-for="product in shoppingCartStore.shoppingCart"
          :key="product.id"
          :id="product.id"
          :quantity="product.quantity"
        />
  </div>
</div>

</template>