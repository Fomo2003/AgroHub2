<script>
import $ from "jquery";
import NavBar from "@/components/reusable/NavBar.vue";
import Footer from '@/components/reusable/footer.vue'

export default {
  components: {
    NavBar, Footer
  },
  data() {
    return {
      email: "",
      name: "",
      title: "",
      message: "",
      userId: localStorage.getItem("userId"), // Retrieve user ID from localStorage
      loading: false,
    };
  },
  methods: {
    sendQuery() {
      if (!this.name || !this.email || !this.title || !this.message) {
        alert("All fields are required!");
      } else {
        this.loading = true;
        var settings = {
          url: `${this.$url}/send/queries/${this.userId}/?title=${this.title}&message=${this.message}&name=${this.name}&email=${this.email}`,
          method: "POST",
          timeout: 0,
        };

        // Use arrow function to preserve the 'this' context
        $.ajax(settings).done((response) => {
          console.log(response);
          alert("Query sent successfully!");
          this.loading = false; // Ensure 'this' refers to the Vue instance
        //   this.$router.push("/contact");
		window.location.reload()
        }).fail((jqXHR, textStatus, errorThrown) => {
          console.error("Login request failed:", textStatus, errorThrown);
          alert("Request failed!")
          this.loading = false
        });
      }
    },
  },
};
</script>

<template>
  <div class="main-bg">
    <!-- Header -->
    <header>
      <NavBar />
    </header>
    <!-- Content -->
    <section id="content">
      <div class="container_24">
        <div class="wrapper">
          <div class="grid_24 content-bg">
            <div class="wrapper">
              <article class="grid_6 suffix_1 prefix_1 alpha">
                <h2>Contact info:</h2>
                <p class="p1"><strong class="str-2"> AgroPlus </strong></p>
                <dl class="adress">
                  <dt style="margin-bottom: 2rem">
                    THE ICT UNIVERSITY YAOUNDE, CAMEROON.
                  </dt>
                  <dd><span>Telephone:</span><b>+237 6819 61660</b></dd>
                  <dd><span>Email:</span><a href="#">fomo@gmail.com</a></dd>
                </dl>
                <p></p>
              </article>
              <article class="grid_15 suffix_1 omega">
                <h2>Contact form:</h2>
                <form
                  @submit.prevent="sendQuery()"
                  id="contact-form"
                  method="post"
                >
                  <fieldset>
                    <label class="name">
                      <span>Full name:</span>
                      <input
                        type="text"
                        v-model="name"
                        style="color: white; font-size: 0.9rem"
                      />
                    </label>
                    <label class="email">
                      <span>Email:</span>
                      <input
                        v-model="email"
                        type="email"
                        style="color: white; font-size: 0.9rem"
                      />
                    </label>
                    <label class="email">
                      <span>Title:</span>
                      <input
                        v-model="title"
                        type="text"
                        style="color: white; font-size: 0.9rem"
                      />
                    </label>
                    <label class="message">
                      <span>Message:</span>
                      <textarea
                        v-model="message"
                        style="color: white; font-size: 0.9rem"
                      ></textarea>
                    </label>
                    <button class="button1" type="submit">
                      Send
                      <i
                        v-if="loading"
                        class="fa fa-circle-o-notch fa-spin"
                        style="font-size: 18px"
                      ></i>
                    </button>
                  </fieldset>
                </form>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.button1 {
  border-radius: 8px;
  border: 1px solid #4caf50;
  background-color: #1b4b1d;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  text-decoration: none;
  margin: 1rem 0 0 6rem;
}

.button1:active {
  transform: scale(0.95);
}

.button1:focus {
  outline: none;
}

.button1.ghost {
  background-color: transparent;
  border-color: #ffffff;
}
</style>
