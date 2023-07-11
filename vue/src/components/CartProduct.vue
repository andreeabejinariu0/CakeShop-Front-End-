<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useShoppingCartStore } from '../stores/shoppingCart';


const shoppingCartStore = useShoppingCartStore();

const props = defineProps(['id', 'quantity'])

const product = ref([])

onMounted(() => {
  axios({
    method: 'get',
    url: 'http://magazin.test/product/' + props.id
  }).then((response) => {
    product.value = response.data;
  })
 // console.log("in cart product")
})

// async function deleteProduct() {
//   axios({
//     method: 'delete',
//     url: '...',
//     data: {
//       name: props.name
//     }
//   });
// }

// stergerea produsului din cosul de cumparaturi
function deleteProduct() {
  shoppingCartStore.removeProductById(props.id, product.value[0].price)
}

// extragerea imaginii din laravel
function getImageUrl(image) {
  const baseUrl = 'http://magazin.test/img/'

  return `${baseUrl}${image}`
}

</script>
<template>
  <div class="col menu-item border-bottom mb-4" style="border-bottom: 2px solid grey;" >
    <img
      v-if="product[0]?.image"
      :src="getImageUrl(product[0].image)"
      class="img-fluid rounded border border-grey border-3"
      style="width: 18rem"
      alt="Menu image"
    />
    <h4>{{ product[0]?.name }}      </h4>
    <p class="ingredients"></p>
    <p class="price" style= "margin-right: 10px;">{{ product[0]?.price }} lei    
       <button type="button" class="btn btn-outline-secondary" @click="deleteProduct"><i class="bi bi-trash-fill"  style="font-size: 18px;"></i> </button></p> 
  </div>
  <!-- Shopping cart Item -->
</template>