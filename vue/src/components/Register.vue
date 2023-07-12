<template>
     <!-- ======= Contact Section ======= -->
     <section id="contact" class="contact">
      <div class="container- fluid" >

        <div class="section-header">
          <h1>Cake<span  style="color:rgb(193, 39, 39)">.</span></h1>
          <p>Sign <span>up</span></p>
        </div>



        <form action="forms/contact.php" method="post" role="form" class="php-email-form p-3 p-md-4">
          
            <div class="row">
            <div class="form-group">
              <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required>
            </div>
          </div>

          <div class="form-group">
            <input type="password" class="form-control" name="password" id="password" placeholder="Password" required>
          </div>
          <div class="my-3">
            <div class="loading">Loading</div>
            <div class="error-message"></div>
            <div class="sent-message">Your message has been sent. Thank you!</div>
          </div>
          <div class="text-center"><button type="submit">Register</button></div>
        </form><!--End Contact Form -->

      </div>
    </section><!-- End Contact Section -->
</template>