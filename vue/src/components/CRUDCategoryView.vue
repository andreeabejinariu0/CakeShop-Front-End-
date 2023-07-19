<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useClientStore } from "../stores/ClientStore.js";
import { useCategoryStore } from "../stores/categoryStore.js";

const clientStore = useClientStore();

const categoryStore = useCategoryStore();

const categoryId = ref(0);
const categoryName = ref("");
const newCategoryName = ref("");
const message = ref("");


onMounted(() => {
    axios
        .get("http://shop.test/category", {
            headers: {
                Authorization: "Bearer " + clientStore.clientToken,
                Accept: "application/json",
            },
        })
        .then(function (response) {
            categoryStore.categories = response.data.slice();
        })
        .catch(function (error) {
            console.log(error);
            message.value = "Eroare!";
        });
});

function editCategory() {
    axios
        .post(
            "http://shop.test/category/" + categoryId.value,
            {
                name: newCategoryName.value,
            },
            {
                headers: {
                    Authorization: "Bearer " + clientStore.clientToken,
                    Accept: "application/json",
                },
            }
        )
        .then(function (response) {
            // Caută categoria în store și actualizează numele
            const categoryIndex = categoryStore.categories.findIndex(
                category => category.id == categoryId.value
            );
            if (categoryIndex !== -1) {
                categoryStore.categories[categoryIndex].name = newCategoryName.value;
            }
            message.value = response.data;
        })
        .catch(function (error) {
            console.log(error);
            message.value = "Eroare!";
        });
}

function addCategory() {
    axios
        .post(
            "http://shop.test/category",
            {
                id: categoryId.value,
                name: newCategoryName.value,
            },
            {
                headers: {
                    Authorization: "Bearer " + clientStore.clientToken,
                    Accept: "application/json",
                },
            }
        )
        .then(function (response) {
            categoryStore.categories.push({
                id: response.data.id,
                name: response.data.name,
            });
            message.value = response.data;
        })
        .catch(function (error) {
            console.log(error);
            message.value = "Eroare!";
        });
}

function deleteCategory() {
    axios
        .delete(
            "http://shop.test/category/" + categoryId.value,
            {
                headers: {
                    Authorization: "Bearer " + clientStore.clientToken,
                    Accept: "application/json",
                },
            }
        )
        .then(function (response) {
            categoryStore.categories.splice(
                categoryStore.categories.findIndex(item => item.id == categoryId.value),
                1
            );
            message.value = response.data;
        })
        .catch(function (error) {
            console.log(error);
            message.value = "Eroare!";
        });
}


</script>
<template>
    <section class="col contact mt-2">
        <div class="container">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h3>CRUD <b>Category</b></h3>
                        </div>
                        <div class="col-sm-6">
                            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addCategory" @click="
                                (categoryId = category.id), (categoryName = category.name)
                                ">
                                <i class="bi bi-plus-circle-fill"></i>
                                <span>Add New Category</span>
                            </button>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>

                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="category in categoryStore.categories " :key="category.id">
                            <td>{{ category.id }}</td>
                            <td>{{ category.name }}</td>
                            <td>
                                <button class="btn btn-outline-dark me-2" data-bs-toggle="modal"
                                    data-bs-target="#editCategory" @click="
                                        (categoryId = category.id), (categoryName = category.name)
                                        ">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#deleteCategory"
                                    @click="categoryId = category.id">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal Add Category -->
        <div class="modal fade" id="addCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Adaugare
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input v-model="newCategoryName" type="text" class="input-group-text" placeholder="Category name" />
                        <br />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="addCategory()">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Edit Category -->
        <div class="modal fade" id="editCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            {{ categoryName }}
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input v-model="newCategoryName" type="text" class="input-group-text" placeholder="Category name" />
                        <br />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="editCategory()">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Delete Category -->
        <div class="modal fade" id="deleteCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Esti sigur ca vrei sa stergi categoria ?
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteCategory()">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
body {
    color: #566787;
    background: #f5f5f5;
    font-family: "Varela Round", sans-serif;
    font-size: 13px;
}

.table-wrapper {
    background: #fff;
    padding: 20px 25px;
    margin: 30px 0;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

.table-title {
    padding-bottom: 15px;
    background: #a91111;
    color: #fff;
    padding: 16px 30px;
    margin: -20px -25px 10px;
    border-radius: 3px 3px 0 0;
}

.table-title h2 {
    margin: 5px 0 0;
    font-size: 24px;
}

.table-title .btn-group {
    float: right;
}

.table-title .btn {
    color: #fff;
    float: right;
    font-size: 13px;
    border: none;
    min-width: 50px;
    border-radius: 2px;
    border: none;
    outline: none !important;
    margin-left: 10px;
}

.table-title .btn i {
    float: left;
    font-size: 21px;
    margin-right: 5px;
}

.table-title .btn span {
    float: left;
    margin-top: 2px;
}

table.table tr th,
table.table tr td {
    border-color: #e9e9e9;
    padding: 12px 15px;
    vertical-align: middle;
}

table.table tr th:first-child {
    width: 60px;
}

table.table tr th:last-child {
    width: 100px;
}

table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #fcfcfc;
}

table.table-striped.table-hover tbody tr:hover {
    background: #f5f5f5;
}

table.table th i {
    font-size: 13px;
    margin: 0 5px;
    cursor: pointer;
}

table.table td:last-child i {
    opacity: 0.9;
    font-size: 22px;
    margin: 0 5px;
}

table.table td a {
    font-weight: bold;
    color: #566787;
    display: inline-block;
    text-decoration: none;
    outline: none !important;
}

table.table td a:hover {
    color: #2196f3;
}

table.table td a.edit {
    color: #ffc107;
}

table.table td a.delete {
    color: #f44336;
}

table.table td i {
    font-size: 19px;
}

table.table .avatar {
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
}

/*  Custom checkbox  */
.custom-checkbox {
    position: relative;
}

.custom-checkbox input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    margin: 5px 0 0 3px;
    z-index: 9;
}

.custom-checkbox label:before {
    width: 18px;
    height: 18px;
}

.custom-checkbox label:before {
    content: "";
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    background: white;
    border: 1px solid #bbb;
    border-radius: 2px;
    box-sizing: border-box;
    z-index: 2;
}

.custom-checkbox input[type="checkbox"]:checked+label:after {
    content: "";
    position: absolute;
    left: 6px;
    top: 3px;
    width: 6px;
    height: 11px;
    border: solid #000;
    border-width: 0 3px 3px 0;
    transform: inherit;
    z-index: 3;
    transform: rotateZ(45deg);
}

.custom-checkbox input[type="checkbox"]:checked+label:before {
    border-color: #03a9f4;
    background: #03a9f4;
}

.custom-checkbox input[type="checkbox"]:checked+label:after {
    border-color: #fff;
}

.custom-checkbox input[type="checkbox"]:disabled+label:before {
    color: #b8b8b8;
    cursor: auto;
    box-shadow: none;
    background: #ddd;
}

/* Modal styles */
.modal .modal-dialog {
    max-width: 400px;
}

.modal .modal-header,
.modal .modal-body,
.modal .modal-footer {
    padding: 20px 30px;
}

.modal .modal-content {
    border-radius: 3px;
}

.modal .modal-footer {
    background: #ecf0f1;
    border-radius: 0 0 3px 3px;
}

.modal .modal-title {
    display: inline-block;
}

.modal .form-control {
    border-radius: 2px;
    box-shadow: none;
    border-color: #dddddd;
}

.modal textarea.form-control {
    resize: vertical;
}

.modal .btn {
    border-radius: 2px;
    min-width: 100px;
}

.modal form label {
    font-weight: normal;
}
</style>
