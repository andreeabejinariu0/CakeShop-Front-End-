<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useClientStore } from "../stores/ClientStore.js";

const clientStore = useClientStore();

const allOrders = ref([]);
const products = ref([]);

onMounted(() => {
    axios({
        method: "get",
        url: "http://shop.test/getOrders/" + clientStore.clientId,
    }).then(response => {
        allOrders.value = response.data.slice();
    });
});

async function showProducts(orderId) {
    await axios
        .get("http://shop.test/getOrderProducts/" + orderId)
        .then(function (response) {
            products.value = response.data.slice();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getImageUrl(image) {
    const baseUrl = 'http://shop.test/img/';
    return `${baseUrl}${image}`;
};


</script>



<template>
    <section id="contact" class="col contact">
        <div class="container">
            <div class="section-header">
                <h1>Cake<span style="color:rgb(193, 39, 39)">.</span></h1>
                <p>Istoric <span>Comenzi</span></p>
            </div>
            <div class="row gy-4">

                <div v-for="order in allOrders" :key="order.id" class="row gy-4 mb-2">
                    <div class="col-12" data-bs-toggle="modal" data-bs-target="#orderModal" @click="showProducts(order.id)">
                        <div class="info-item d-flex align-items-center">
                            <i class="icon bi bi-map flex-shrink-0"></i>
                            <div>
                                <h3 style="color:brown">Adresa comenzii : <br> </h3>
                                <h3>{{ order.address }}</h3>
                                <h7 style="color:brown">Pret: {{ order.price }} lei</h7>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
            <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                Produse:
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div v-for="product in products" :key="product.id">
                                <div style="margin-bottom: 10px">
                                    <img :src="getImageUrl(product.productImage)"
                                        class="img-fluid rounded border border-grey border-3" style="width: 18rem"
                                        alt=""><br>
                                    <strong>Nume:</strong> {{ product.productName }} <br>
                                    <strong>Preț:</strong> {{ product.productPrice }} lei
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>