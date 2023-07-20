<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useClientStore } from "../stores/ClientStore.js";
import { useUserStore } from "../stores/userStore.js";

const clientStore = useClientStore();
const userStore = useUserStore();

const userId = ref(0);
const userName = ref("");


const newUserName = ref("");
const newUserEmail = ref();
const newUserPassword = ref("");
const newUserCPassword = ref("");

const message = ref("");


onMounted(() => {
  axios
    .get("http://shop.test/users", {
      headers: {
        Authorization: "Bearer " + clientStore.clientToken,
        Accept: "application/json",
      },
    })
    .then(function (response) {
        userStore.users = response.data.slice();
    })
    .catch(function (error) {
      console.log(error);
      message.value = "Eroare!";
    });

});

function editUser() {
  axios
    .post(
      "http://shop.test/user/" + userId.value,
      {
        name: newUserName.value,
        email: newUserEmail.value,
        password: newUserPassword.value,
        c_password: newUserCPassword.value,
      },
      {
        headers: {
          Authorization: "Bearer " + clientStore.clientToken,
          Accept: "application/json",
        },
      }
    )
    .then(function (response) {
      const productIndex = userStore.users.findIndex(
        product => product.id == userId.value
      );
      if (productIndex !== -1) {
        //console.log( productsStore.products[productIndex]);
        userStore.users[productIndex].name = newUserName.value;
        userStore.users[productIndex].email = newUserEmail.value;
        userStore.users[productIndex].password =
          newUserPassword.value;
          userStore.users[productIndex].c_password =
          newUserCPassword.value;
      }
      message.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
      message.value = "Eroare!";
    });

}

function addUser() {
  axios
    .post(
      "http://shop.test/register",
      {
        name: newUserName.value,
        email: newUserEmail.value,
        password: newUserPassword.value,
        c_password: newUserCPassword.value,
      },
      {
        headers: {
          Authorization: "Bearer " + clientStore.clientToken,
          Accept: "application/json",
        },
      }
    )
    .then(function (response) {
      message.value = response.data;
      userStore.users.push({
        name: newUserName.value,
        email: newUserEmail.value,
      });
    })
    .catch(function (error) {
      console.log(error);
      message.value = "Eroare!";
    });
}

function deleteUser() {
  axios
    .delete(
      "http://shop.test/user/" + userId.value,
      {
        headers: {
          Authorization: "Bearer " + clientStore.clientToken,
          Accept: "application/json",
        },
      }
    )
    .then(function (response) {
      userStore.users.splice(
        userStore.users.findIndex(item => item.id == userId.value),
        1
      );
      message.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
      message.value = "Eroare!";
    });
}

function makeAdmin() {
  axios
    .post(
      "http://shop.test/admin/" + userId.value,
      {},
      {
        headers: {
          Authorization: "Bearer " + clientStore.clientToken,
          Accept: "application/json",
        },
      }
    )
    .then(function (response) {
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
              <h3>CRUD <b>Users</b></h3>
            </div>
            <div class="col-sm-6">
              <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addUser" @click="
                (newUserName = ''),
                (newUserEmail = ''),
                (newUserPassword = ''),
                (newUserCPassword = '')">
                <i class="bi bi-plus-circle-fill"></i>
                <span>Add New User</span>
              </button>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <tr>

              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userStore.users " :key="user.id">
              <td>{{ user.id }}</td>
              <td style=" width: 12rem">{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>role</td>
              <td>
                <button class="btn btn-outline-dark me-2" data-bs-toggle="modal" data-bs-target="#editUser" @click="
                  (userId = user.id),
                  (userName = user.name),
                  (newUserName = user.name),
                  (newUserEmail = user.email),
                  (newUserPassword = user.password)">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-outline-dark me-2" data-bs-toggle="modal" data-bs-target="#deleteUser" @click="
                  (userId = user.id), (userName = user.name)
                  ">
                  <i class="bi bi-trash"></i>
                </button>
                <button class="btn btn-outline-dark me-2" data-bs-toggle="modal" data-bs-target="#makeAdmin" @click="
                  (userId = user.id), (userName = user.name)
                  ">
                  <i class="bi bi-person-lock"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Add Product -->
    <div class="modal fade" id="addUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Adaugare
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input v-model="newUserName" type="text" class="input-group-text" placeholder="User name" />
            <br />
            <input v-model="newUserEmail" type="text" class="input-group-text" placeholder="User email" />
            <br />
            <input v-model="newUserPassword" type="text" class="input-group-text"
              placeholder="User password" />
            <br />
            <input v-model="newUserCPassword" type="text" class="input-group-text" placeholder="User c password" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="addUser()">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit Category -->
    <div class="modal fade" id="editUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              {{ userName }}
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input v-model="newUserName" type="text" class="input-group-text" placeholder="User name" />
            <br />
            <input v-model="newUserEmail" type="text" class="input-group-text" placeholder="User email" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="editUser()">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Delete Category -->
    <div class="modal fade" id="deleteUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Esti sigur ca vrei sa stergi userul {{ userName }}
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteUser()">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>

 <!-- Modal Make Admin -->
 <div class="modal fade" id="makeAdmin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Esti sigur ca vrei sa numesti admin pe {{ userName }}
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="makeAdmin()">
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
