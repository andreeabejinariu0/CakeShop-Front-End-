<script setup>
import { ref } from "vue";
import axios from "axios";
import { useClientStore } from "../stores/ClientStore.js";

const clientStore = useClientStore();

const email = ref("");
const password = ref("");
const message = ref("");

async function login() {
  await axios
    .post("http://shop.test/login", {
      email: email.value,
      password: password.value,
    })
    .then(function (response) {
      console.log(response.data);

        clientStore.setClientToken(response.data.success.token);
        clientStore.setClientName(response.data.name);
        message.value = "Bun venit " + response.data.name + "!" ;
      
    })

    .catch(function (error) {
      console.log(error);
      message.value = "Email sau parola incorecta!";
    });

    
    await axios
    .get("http://shop.test/role", {
      headers: {
        Authorization: "Bearer " + clientStore.clientToken,
        Accept: "application/json",
      },
    })
    .then(function (response) {
      if (response.data.role == "admin") clientStore.setAdmin("true");
      else clientStore.setAdmin("false");
    })
    .catch(function () {
    });

}
</script>

<template>
  <section id="contact" class="col contact" >
    <div class="container" >
      <div class="section-header">
        <RouterLink to="/">
          <img src="http://shop.test/img/logofly.png" class="img-fluid "
            style=" width: 150px;  height: 150px; margin-top: 25px;" alt="Home image" />
        </RouterLink>
        <p>Log <span>in</span></p>
      </div>

      <div class="php-email-form p-3 p-md-4" >
        <div class="row">
          <div class="col-12 form-group">
            <input type="email" class="form-control" name="email" id="email" v-model="email" placeholder="Your Email"
              required />
          </div>
          <div class="col-12 form-group">
            <input type="password" class="form-control" name="password" id="password" v-model="password"
              placeholder="Password" required />
          </div>
        </div>
        <div class="my-3">
          <div class="loading">Loading</div>
          <div class="error-message"></div>
          <div class="sent-message">Your message has been sent. Thank you!</div>
        </div>
        <div class="text-center">
          <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="login()">
            Login
          </button>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {{ message }}
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- <div class="modal-body">Email sau parola incorecta</div> -->
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- <style>
container {
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}
</style> -->