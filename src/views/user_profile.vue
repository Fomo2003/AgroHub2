<template>
    <div class="main-bg">
    <!-- Header -->
    <header>
      <NavBar/>
    </header>
    <!-- Content -->
    <section id="content">
      <div class="container_24" >
        <div class="wrapper" >
          <div class="grid_24 content-bg">
            

            <!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous"> -->

<main class="profile">
  <div class="profile-bg"></div>
  <section class="user-container">
    <aside class="user-profile-image">
      <a class="camera" href="#">
                    <i class="fas fa-camera"></i>
                </a>
    </aside>
    <section class="profile-info">
      <h1 class="first-name">{{ name }}</h1>
      <h2 style="font-size: 1.5rem;">Welcome to AgroPlus</h2>
      <p>
        Empowering farmers with cutting-edge technology. Upload images, get instant forecasts for weather, crop health 🌱, and pest infestations. Optimize your farming 🌿 practices effortlessly. Start now!
      </p>

      <aside class="social-media-icons">
        <a>
                        <i class="fab fa-twitter"></i>
                    </a>
        <a>
                        <i class="fab fa-codepen"></i>
                    </a>
        <a>
                        <i class="fab fa-github"></i>
                    </a>
        <a>
                        <i class="fab fa-medium"></i>
                    </a>
      </aside>
    </section>
  </section>
  <section class="statistics_">
  
    <p><strong>EMAIL:
</strong> {{ email }}</p>
    <p><strong>PHONE:
</strong> {{ phone }}</p>
  </section>
</main>


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
//   import Pusher from 'pusher-js';
import NavBar from '@/components/reusable/NavBar.vue'
import Footer from '@/components/reusable/footer.vue'

import $ from 'jquery'
  export default {
    components: {NavBar, Footer},
    data: () => {
      return {
        name:null,
        email:null,
        phone:null,
        userId:null
      };
    },
    mounted() {
      this.userId = localStorage.getItem("userId")
      var settings = {
  "url": `${this.$url}/user/${this.userId}`,
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done((response) => {
  console.log(response);
  this.name = response.username
  this.phone = response.phone
  this.email = response.email
}).fail((jqXHR, textStatus, errorThrown) => {
          console.error("Login request failed:", textStatus, errorThrown);
          localStorage.clear();
        });
    },
    method(){

    }
  };
  </script>
  
  <style lang="scss" scoped>
  .wrapper {
  overflow: visible;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

@import url("https://fonts.googleapis.com/css?family=Montserrat:600");
@import url("https://fonts.googleapis.com/css?family=Montserrat:800");
@import url("https://fonts.googleapis.com/css?family=Montserrat");


.profile {
  animation: loadProfile 0.6s ease-in-out;
  animation-fill-mode: both;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 750px;
  max-width: 900px;
}

.profile-bg {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 10px;
  background: white;
  box-shadow: 0 30px 50px -20px rgba(14, 0, 47, 0.21);
  width: calc(100% - 75px);
  height: calc(100% - 110px);
  z-index: -1;
}

.user-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
} 

.user-profile-image {
  animation: loadProfileImage 1s ease-in-out 0.5s;
  animation-fill-mode: both;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 25px 45px -20px rgba(0, 0, 0, 0.55),
    inset 0 0px 120px rgba(255, 0, 47, 0.75);
  width: 45%;
  flex: none;
  background-image: url("https://zephyo.github.io/22Days/code/3/graphics/profile.png");
  background-size: cover;
  background-position: center;
}

.user-profile-image::before {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #ff2256;
  opacity: 0.8;
  mix-blend-mode: screen;
}

.camera {
  color: #FFFF;
  position: absolute;
  bottom: 28px;
  left: 28px;
  font-size: 1.3rem;
}

.profile-info {
  margin-top: 120px;
  padding: 8% 8% 2% 8%;
  position: relative;
}

.profile-info h1 {
  font-size: 3rem;
  font-weight: 800;
  margin: 0.7rem;
  position: absolute;
  animation-fill-mode: both;
}

h1.first-name {
  animation: titleEffect 1s cubic-bezier(0,0.2,0.4,1);
  
  left: -300px;
} 

h1.second-name {
  animation: titleEffect 1s cubic-bezier(0,0,0.3,1);
  top: -50px;
  left: -165px;
}

.profile-info h2 {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.2rem;
  margin-top: 0;
  margin-bottom: 5%;
}

.social-media-icons a,
.profile-info h2 {
  color: #f63d47;
}

.profile-info p {
  line-height: 1.5rem;
}

.social-media-icons {
  display: flex;
}

.social-media-icons a {
  margin-top: 7%;
  font-size: 1.2rem;
  flex: auto;
  text-align: center;
}

.camera,
.social-media-icons a {
  transition: text-shadow 0.5s ease;
}

.camera:hover,
.social-media-icons a:hover {
  text-shadow: 0px 5px 15px rgba(255, 0, 47, 0.45);
}

.statistics_ {
  margin-left: 4rem;
  line-height: 2rem;
  width: 91.6%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;
}

.statistics_ p {
  margin: 3%;
  flex: auto;
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'Courier New', Courier, monospace;
  color: #f63d47;
}

.statistics_ p strong {
  font-size: 1.1rem;
  color: #000;
  font-weight: 200;
  margin-right: 0.3rem;
}

.icon {
  background: transparent no-repeat center;
  background-size: contain;
  background-origin: content-box;
  width: 60px;
  height: 60px;
  padding: 15px;
  border: none;
  transition: transform 0.5s ease;
}

.icon:hover {
  transform: scale(0.9);
}

.arrow {
  flex: 0 1 75px;
  background-image: url("https://zephyo.github.io/22Days/code/3/graphics/arrow.svg");
}

.right {
  transform: rotate(180deg);
}

.right:hover {
  transform: scale(0.9) rotate(180deg);
}

.close {
  background-image: url("https://zephyo.github.io/22Days/code/3/graphics/close.svg");
  position: absolute;
  top: 5px;
  right: 10px;
}

@media only screen and (max-aspect-ratio: 4/7) and (max-width: 600px) {
  .profile {
    margin: 3%;
    height: 97%;
  }
  .user-container {
    height: 86%;
    flex-direction: column;
  }
  .user-profile-image {
    height: 40%;
    width: calc(100% - 90px);
  }
  .profile-bg {
    width: 100%;
  }
  h1.first-name {
    left: 10px;
  }
  h1.second-name {
    left: 60px;
  }
}

@media screen and (min-aspect-ratio: 4/7) {
  .profile {
    margin-left: 10%;
    margin-right: 10%;
  }
}

@keyframes backgroundAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes loadProfile {
 from{
    transform: translateY(100px);
    opacity: 0;
  }
 to {
     transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes loadProfileImage {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
 to {
     transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes titleEffect {
 from {
   opacity:0;
     transform: translateX(-75px);
  }
  to {
     transform: translateX(0px);
    opacity: 1;
  }
}

  </style>
  