<script setup>
import Product from '../components/Product.vue';

import {ref} from 'vue';
import { watch } from 'vue';
import { onMounted } from "vue";
import axios from "axios";

const allProducts = ref([]);

const props = defineProps([
    'id',
    'name'
]);

const categoryid= ref(props.id);

onMounted(() => {
  axios({
    method: "get",
    url: "http://magazin.test/products/"+ props.id,
  }).then((response) => {
    allProducts.value = response.data.slice();
    console.log(allProducts.value);
  });
});

watch(() => props.id ,() => {
    axios({
    method: "get",
    url: "http://magazin.test/products/" + props.id
  }).then((response) => {
    allProducts.value = response.data.slice()
  })
})

</script>

<template>

<div class="tab-pane fade active show" id="menu-starters">

<div class="tab-header text-center">
  <p>Menu</p>
  <h3>{{ name}} </h3>
</div>

<div class="row gy-5">

  <Product
     v-for="product in allProducts"
      :key="product.id"
      :id="product.id"
      :name="product.name"
      :price="product.price"
      :description="product.description"
      :image="product.image"

  />

</div>
</div><!-- End Starter Menu Content -->
</template>