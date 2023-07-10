<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const props = defineProps(['id', 'quantity'])

const product = ref([])

onMounted(() => {
  axios({
    method: 'get',
    url: 'http://magazin.test/product/' + props.id
  }).then((response) => {
    product.value = response.data;
  })
  console.log("in cart product")
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

// extragerea imaginii din laravel
function getImageUrl(image) {
  const baseUrl = 'http://magazin.test/img/'

  return `${baseUrl}${image}`
}
</script>
<template>
  <div class="col menu-item">
    <img
      :src="getImageUrl(product[0]?.image)"
      class="img-fluid rounded border border-grey border-3"
      style="width: 18rem"
      alt="Menu image"
    />
    <h4>{{ product[0]?.name }}</h4>
    <p class="ingredients"></p>
    <p class="price">{{ product[0]?.price }} lei</p>
  </div>
  <!-- Shopping cart Item -->
</template>