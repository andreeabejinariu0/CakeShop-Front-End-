<script setup>
import axios from "axios";

const props = defineProps([
  "name",
  "price",
  "description",
  "image"
]);

//extract image from lavarel folder
function getImageUrl(image) 
{
    const baseUrl = 'http://magazin.test/img/'; // înlocuiți cu URL-ul de bază al proiectului Laravel
    return `${baseUrl}${image}`;
};

</script>

<template>
     <div class="col-lg-4 menu-item">
                <a href="assets/img/menu/menu-item-4.png" class="glightbox">
                  <img :src="getImageUrl(image)" class="img-fluid rounded border border-danger-emphasis border-3" alt=""></a>
                <h4>{{ name }}</h4>
                <p class="ingredients">
                    {{ description }}
                </p>
                <p class="price">
                    {{ price }} lei
                </p>
                <button type="button" class="btn btn-outline-danger">Adauga</button>
              

              </div><!-- Menu Item -->

</template>