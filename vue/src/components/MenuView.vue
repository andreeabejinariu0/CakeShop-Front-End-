<script setup>
//import Product from '../components/Product.vue';
import Category from '../components/Category.vue';

import {ref} from 'vue';

import { onMounted } from "vue";
import axios from "axios";

const allCategory = ref([]);
const categoryID = ref(1);
const categoryName= ref('');

onMounted(() => {
  axios({
    method: "get",
    url: "http://magazin.test/category",
  }).then((response) => {
    allCategory.value = response.data.slice();
    console.log(allCategory.value);
  });
});

function ChangeCategory(id, name)
{
  categoryID.value=id;
  categoryName.value=name;
}

</script>

<template>
<!-- ======= Menu Section ======= -->
<section id="menu" class=" col menu">
      <div class="container" data-aos="fade-up">

        <div class="section-header">
          <h2>Our Specialities</h2>
          <p>Check Our <span>Cake Menu</span></p>
        </div>

        <ul class="nav nav-tabs d-flex justify-content-center" data-aos="fade-up" data-aos-delay="300">

          <li 
          v-for="category in allCategory"
            :key="category.id"
            :id="category.id"
            :name="category.name"
          class="nav-item">
            <a
            class="nav-link active show" 
            data-bs-toggle="tab" 
            data-bs-target="#menu-starters"
            @click="ChangeCategory(category.id, category.name)"
            >
            <h4>{{category.name}}</h4>
            </a>
          </li><!-- End tab nav item -->

        </ul>



        <div class="tab-content" data-aos="fade-up" data-aos-delay="400">

          <Category 
          :id="categoryID"
          :name="categoryName"
          />
          <!-- End Starter Menu Content -->

   
        </div>

      </div>
    </section><!-- End Menu Section -->

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
