<template>
     <div class="main-bg">
      <div
      v-if="loading"
      style="
        background: rgba(0, 0, 0, 0.7);
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 500;
      "
    >
      <div class="spinner-square">
        <div class="square-1 square"></div>
        <div class="square-2 square"></div>
        <div class="square-3 square"></div>
      </div>
    </div>
    <!-- Header -->
    <header>
      <NavBar/>
    </header>
    <!-- Content -->
    <section id="content">
      <div class="container_24" >
        <div class="wrapper" >
          <div class="grid_24">
            

            <div class="wrapper">
  <div class="container" id="container">
    <div class="form-container sign-up-container">

      <form @submit.prevent="signUp">
        <h1>Join Us</h1>
        <input v-model="name" type="text" placeholder="Name" />
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="phone" type="tel" placeholder="Phone Number" />
        <input v-model="password" type="password" placeholder="Password" />
        <button class="button" style="margin-top: 1rem;">Sign Up</button>
      </form>


    </div>
    <div class="form-container sign-in-container">
      <form @submit.prevent="login(this.email, this.password)">
        <h1>Welcome Back</h1>
    
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <!-- <a href="#">Forgot your password?</a> -->
        <button class="button" style="margin-top: 1rem;">Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>Please sign in with your personal information.</p>
          <button class="ghost button" id="SignIn">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start your journey with us.</p>
          <button class="ghost button" id="SignUp">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</div>




          </div>
        </div>
      </div>
    </section>
    <footer>
      <Footer/>
    </footer>
    <!-- Footer -->
  </div>
  </template>
  
  <script>
  // import Pusher from 'pusher-js';
  import $ from 'jquery'
  import { login, checkLogin, logout } from '../EventBus.js';
  import NavBar from '@/components/reusable/NavBar.vue'
  import Footer from '@/components/reusable/footer.vue'


  // import { computed } from 'vue';
  import { state } from '../EventBus.js';
  export default {
    name: "login",
    components: {NavBar, Footer},
    data() {
      return {
        name: null,
        email: null,
        password: null,
        phone: null,
        role: 'user',
        loading: false
      };
    },
    computed: {
    isLoggedIn() {
      return state.isLoggedIn;
    },
  },
    mounted() {
      const SignUpButton = document.getElementById("SignUp");
      const SignInButton = document.getElementById("SignIn");
      const container = document.getElementById("container");
  
      SignUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active")
      });
  
      SignInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active")
      });
    },
    methods: {
      logouto(){
        logout()
        checkLogin();
        this.$router.push('/');
      },
      login(email, password) {
        this.loading = true
        var form = new FormData();
        form.append("email", email);
        form.append("password", password);
  
        var loginSettings = {
          "url": `${this.$url}/login`,
          "method": "POST",
          "timeout": 0,
          "processData": false,
          "mimeType": "multipart/form-data",
          "contentType": false,
          "data": form
        };
  
        $.ajax(loginSettings).done((loginResponse) => {
          console.log("Login response:", loginResponse);
          // Store loginResponse in local storage
          localStorage.setItem('user', loginResponse);
          localStorage.setItem('access_token', JSON.parse(loginResponse).access_token);
          localStorage.setItem('userId', JSON.parse(loginResponse).user.id);
          this.loading = false
          login()
          checkLogin();
          // this.$router.push('/');
          if (JSON.parse(loginResponse).user.role !== "admin" && !JSON.parse(loginResponse).user.disable) {
    window.location.href = "/";
} else if (JSON.parse(loginResponse).user.disable) {
    alert("This user was disabled by the Admin. Please contact administrator for more info.");
} else {
    window.location.href = "/admin_page";
}

          
        }).fail((jqXHR, textStatus, errorThrown) => {
          console.error("Login request failed:", textStatus, errorThrown);
          alert("Login request failed!")
          this.loading = false
        });
      },
      signUp() {
        if (!this.name || !this.email || !this.password || !this.phone) {
          alert("All fields are required!");
        } else {
          var settings = {
            "url":  `${this.$url}/signup `,
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json",
              "Cookie": "session_id=91dbad035525d94db2ccd82796584baf92716edb"
            },
            "data": JSON.stringify({
              "email": this.email,
              "username": this.name,
              "password": this.password,
              "phone": this.phone,
              "role": "user"
            }),
          };
  
          // Using an arrow function to maintain the correct 'this' context
          $.ajax(settings).done((response) => {
            console.log(response);
            this.login(this.email, this.password); // Call login method using 'this'
          }).fail((jqXHR, textStatus, errorThrown) => {
            console.error("Sign up request failed:", textStatus, errorThrown);
          });
        }
      }
    }
  };
  </script>
  
  
  <style scoped>.wrapper {
    overflow: visible;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  h1 {
    color: #4CAF50;
    font-weight: bold;
    margin: 0;
  }
  
  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }
  
  span {
    font-size: 12px;
  }
  
  a {
    color: #2196F3;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }
  
  .button {
    border-radius: 20px;
    border: 1px solid #4CAF50;
    background-color: #4CAF50;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    text-decoration: none;
  }
  
  .button:active {
    transform: scale(0.95);
  }
  
  .button:focus {
    outline: none;
  }
  
  .button.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }
  
  form {
    background-color: rgba(0, 0, 0, 0.879); /* Adjust opacity as needed */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }
  
  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }
  
  .social-container {
    margin: 20px 0;
  }
  
  .social-container a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
    color: #000;
  }
  
  .container {
    background-color: #ffffff;
    border-radius: 1px;
    box-shadow: 0 14px 28px rgb(0, 0, 0), 0 10px 10px rgb(0, 0, 0);
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    min-height: 480px;
  }
  
  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }
  
  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }
  
  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }
  
  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }
  
  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }
  
  @keyframes show {
    0%, 49.99% {
      opacity: 0;
      z-index: 1;
    }
  
    50%, 100% {
      opacity: 1;
      z-index: 5;
    }
  }
  
  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }
  
  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }
  
  .overlay {
    background: #4CAF50; 
    background: -webkit-linear-gradient(to top, #8BC34A, #4CAF50); 
    background: linear-gradient(to top, #8BC34A, #4CAF50);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }
  
  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }
  
  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }
  
  .overlay-panel h1 {
    color: white;
  }
  
  .overlay-left {
    transform: translateX(-20%);
  }
  
  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }
  
  .overlay-right {
    right: 0;
    transform: translateX(0);
  }
  
  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }
  
  #info {
    margin-top: 1rem;
    text-align: center; 
  }
  
  </style>