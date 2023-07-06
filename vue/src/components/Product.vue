<script setup>
import axios from "axios";

const props = defineProps([
  "name",
  "category_id",
  "price",
  "description",
]);


</script>

<template>
     <div class="col-lg-4 menu-item">
                <a href="assets/img/menu/menu-item-4.png" class="glightbox"><img src="src/assets/img/menu/menu-item-4.png" class="menu-img img-fluid" alt=""></a>
                <h4>{{ name }}</h4>
                <p class="ingredients">
                    {{ description }}
                </p>
                <p class="price">
                    {{ price }}
                </p>
              </div><!-- Menu Item -->
</template>