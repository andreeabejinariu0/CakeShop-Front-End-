<script setup></script>

<template>
  <!-- ======= Hero Section ======= -->
  <section id="hero" class="col hero d-flex align-items-center section-bg">
    <div class="container">
      <div class="row justify-content-between gy-5">
        <div
          class="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start"
        >
          <h2 data-aos="fade-up">Ai pofta de dulce?</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            Suntem aici pentru tine!
          </p>
          <div  >
            <RouterLink to="/menu" class="btn-book-a-table" style=" float: right;">Alege ce poftesti</RouterLink>
            
          </div>
        </div>
        <div class="col-lg-5 order-1 order-lg-2 ">
          <img
            src="http://shop.test/img/logo.png" style="position: absolute; top: 10%;  right: 10%; "
            class="img-fluid "  
            alt="Home image"
          />
        </div>
      </div>
    </div>
  </section>
  <!-- End Hero Section -->
</template>