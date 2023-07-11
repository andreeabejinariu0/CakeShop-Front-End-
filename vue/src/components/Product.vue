<script setup>
import axios from "axios";
import { ref } from 'vue';
import { useShoppingCartStore } from '../stores/shoppingCart';

const shoppingCartStore = useShoppingCartStore();

const props = defineProps([
  "id",
  "name",
  "price",
  "description",
  "image"
]);

//extract image from lavarel folder
function getImageUrl(image) 
{
    const baseUrl = 'http://magazin.test/img/'; 
    return `${baseUrl}${image}`;
};

//adaugarea unui produs in cos
function addProduct() {
//   let cartProducts = JSON.parse(localStorage.getItem('cartProducts'))

//   cartProducts.push({
//     id: props.id,
//     quantity: 1
//   })

//   localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
//   shoppingCartStore.shoppingCart = cartProducts;

//   let total = localStorage.getItem('total');

// total = Number(total) + Number(props.price);

// localStorage.setItem('total', total);

// shoppingCartStore.total = total;

  shoppingCartStore.updateShoppingCart({
      id: props.id,
      quantity: 1
  });

  shoppingCartStore. addToTotal(props.price) ;

}

</script>

<template>
     <div class="col-lg-4 menu-item">
                <a class="glightbox">
                  <img :src="getImageUrl(image)" class="img-fluid rounded border border-danger-emphasis border-3" alt=""></a>
                <h4>{{ name }}</h4>
                <p class="ingredients">
                    {{ description }}
                </p>
                <p class="price">
                    {{ price }} lei
                </p>
                <button type="button"  class="btn btn-outline-danger"   @click="addProduct">Adauga</button>
              

              </div><!-- Menu Item -->

</template>