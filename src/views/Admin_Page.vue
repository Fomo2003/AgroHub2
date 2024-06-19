<template>
  <div >
    <QueriesCom v-if="showQueries" @close="hideQueries"  :userId="this.userIdQuery"/>
    <NotifSend v-if="showNotification" @close="hideNotification"/>
    <div id="popup" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close_popup" @click="close_popup()">&times;</span>
    <div class="dropdown-content" v-if="notifications.length > 0">
              <h5 style="margin-top: 0.6rem; color: rgb(107, 107, 245);">NOTIFICATIONS</h5>
              <hr class="notification-divider" />
              <div class="message-container" style="height: 78vh;   overflow-y: auto;">
              <!-- <div class="" v-for="(notification, index) in notifications.slice(0, 5)" :key="index"> -->
                <div class="" v-for="(notification, index) in notifications" :key="index">

    <a class="notification notification-container1" @click="viewNotification(notification.id)">
        <div class="notification-content" >
            <div class="notification-info" >
              <div style="width:5%;margin-left: 10px;">
                <span class="notification-number">{{ index + 1 }}</span>
              </div>
              <div style="width:100%; display: grid;margin-left: 10px;">
                <span class="notification-message" style="margin-bottom: 0.5rem; font-weight: 700; text-transform: capitalize;">
                        {{ notification.title }}
                    </span>
                    <span class="notification-message" style="font-size: 0.9rem;">
                        {{ truncatedMessage(notification.message) }}
                    </span>
              </div>
              <div style="width:20%;">
                <span class="notification-date" style="font-size: 0.8rem; font-weight: 600;">
                        {{ formatDate(notification.created_at) }}
                    </span>
              </div>
            </div>
        </div>
    </a>
    <hr class="notification-divider" />
    </div>
</div>

             
              <!-- Additional notification containers go here -->
            </div>

            <div class="footer-notif" >
              
              <router-link to="/all_notifications" class="view-all"
                >@Fomo</router-link
              >
            </div>
  </div>
</div>


    <!-- Banner -->
    <!-- <a href="https://webpixels.io/components?ref=codepen" class="btn w-full btn-primary text-truncate rounded-0 py-2 border-0 position-relative" style="z-index: 1000;">
    <strong>Crafted with Webpixels CSS:</strong> The design system for Bootstrap 5. Browse all components →
</a> -->

    <!-- Dashboard -->
    <div class="d-flex flex-column flex-lg-row h-lg-full bg-gray-200">
      <!-- Vertical Navbar -->


      <!-- Main content -->
      <div class="flex-grow-1 " style="height: 138vh; margin: 0 10.5rem; ">
        <!-- Header -->
        <header class="bg-surface-primary border-bottom pt-6 mt-6" style="border-radius: 1rem 1rem 0 0;">
          <div class="container-fluid">
            <div class="mb-npx">
              <div class="row align-items-center" style="align-items: center; justify-content: center;">
                <div class="col-sm-6 col-12 mb-4 mb-sm-0" >
                  <!-- Title -->
                  <h1 class="h2 mb-0 ls-tight">Dashboard</h1>
                </div>
                <!-- Actions -->
     
              </div>
              <!-- Nav -->
              <ul class="nav nav-tabs mt-4 overflow-x border-0">
                <li class="nav-item" style="height: 7rem;">
                </li>
              </ul>
            </div>
          </div>
        </header>
        <!-- Main -->
        <main class="py-6 bg-gray-100" style="align-items: center; justify-content: center;border-radius: 2rem;">
          <div class="container-fluid">
            <!-- Card stats -->
            <div class="row g-6 mb-6">
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card shadow border-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <span
                          class="h6 font-semibold text-muted text-sm d-block mb-2"
                          >Active Users</span
                        >
                        <span class="h3 font-bold mb-0">{{ userCount }}</span>
                      </div>
                      <div class="col-auto">
                        <div
                          class="icon icon-shape bg-black text-white text-lg rounded-circle"
                        >
                          <i class="bi bi-people"></i>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 mb-0 text-sm">
                      <span
                        class="badge badge-pill bg-soft-success text-success me-2"
                      >
                        <i class="bi bi-arrow-up me-1"></i
                        >{{ userCount / 100 }}%
                      </span>
                      <span class="text-nowrap text-xs text-muted"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card shadow border-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <span
                          class="h6 font-semibold text-muted text-sm d-block mb-2"
                          >Notifications</span
                        >
                        <span class="h3 font-bold mb-0">{{ notificationCount }}</span>
                      </div>
                      <div class="col-auto">
                        <div
                          class="icon icon-shape bg-warning text-white text-lg rounded-circle"
                        >
                          <i
                            class="fa fa-bell"
                            style="font-size: 23px; margin-top: 5px"
                          ></i>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 mb-0 text-sm">
                      <span
                        class="badge badge-pill bg-soft-success text-success me-2"
                      >
                        <i class="bi bi-arrow-up me-1"></i
                        >{{ notificationCount / 100 }}%
                      </span>
                      <span class="text-nowrap text-xs text-muted"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card shadow border-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <span
                          class="h6 font-semibold text-muted text-sm d-block mb-2"
                          >Queries</span
                        >
                        <span class="h3 font-bold mb-0">{{ queries }}</span>
                      </div>
                      <div class="col-auto">
                        <div
                          class="icon icon-shape bg-info text-white text-lg rounded-circle"
                        >
                          <i class="bi bi-pencil-square"></i>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 mb-0 text-sm">
                      <span
                        class="badge badge-pill bg-soft-success text-success me-2"
                      >
                        <i class="bi bi-arrow-up me-1"></i
                        >{{ queries / 100 }}%
                      </span>
                      <span class="text-nowrap text-xs text-muted"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card shadow border-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <span
                          class="h6 font-semibold text-muted text-sm d-block mb-2"
                          >In-active Users</span
                        >
                        <span class="h3 font-bold mb-0">{{ disableUsers}}</span>
                      </div>
                      <div class="col-auto">
                        <div
                          class="icon icon-shape bg-danger text-white text-lg rounded-circle"
                        >
                          <i class="bi bi-trash"></i>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 mb-0 text-sm">
                      <span
                        class="badge badge-pill bg-soft-danger text-danger me-2"
                      >
                        <i class="bi bi-arrow-down me-1"></i
                        >{{ disableUsers / 100 }}%
                      </span>
                      <span class="text-nowrap text-xs text-muted"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            


            <div class="col-sm-6 col-12 text-sm-end" style="width: 100%; margin-bottom: 1rem;">
                            <div class="mx-n1">
                              
                                <a @click.prevent="fetchNotifications()" class="btn d-inline-flex btn-sm btn-primary mx-1">
                                    <span class=" pe-2">
                                        <i class="bi bi-bell"></i>
                                    </span>
                                    <span>View Notifications</span>
                                    <i v-if="spinner1" class="fa fa-circle-o-notch fa-spin" style="font-size:18px; margin-left: 3px;"></i>
                                </a>
                                <a href="#" class="btn d-inline-flex btn-sm btn-neutral border-base mx-1" @click="toggleNotification">
                                    <span class=" pe-2">
                                        <i class="bi bi-pencil"></i>
                                    </span>
                                    <span>Send Notification</span>
                                    <!-- <i v-if="spinner" class="fa fa-circle-o-notch fa-spin" style="font-size:18px; margin-left: 3px;"></i> -->
                                </a>
                                <a href="#" class="btn d-inline-flex btn-sm btn-neutral border-base mx-1" @click="logoutUser()">
                                    <span class=" pe-2">
                                        <!-- <i class="bi bi-pencil"></i> -->
                                    </span>
                                    <span>Logout</span>
                                    <!-- <i v-if="spinner" class="fa fa-circle-o-notch fa-spin" style="font-size:18px; margin-left: 3px;"></i> -->
                                </a>
                            </div>
                        </div>

                            



            <div class="card shadow border-0 mb-7">
                <div class="card-header" style="display: flex; align-items: center; justify-content: space-between;">

                  
    <div>
        <h1 class="mb-0">All Users</h1>
    </div>
    <div class="ml-auto">
        <form class="search-box">
            <input
                v-model="userInput"
                name="q"
                size="35"
                type="text"
                placeholder="Rechercher un client par e-mail"
            />
        </form>
    </div>
</div>





              <div class="table-responsive overflow-y-lg-auto" style="height: 55vh;">
                <div v-if="this.alert.display" class="alert">
                  {{ alert.message }}
                </div>
                <table class="table table-hover table-nowrap">
                  <thead class="thead-light">
                    <tr class="thead-light1">
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Disable</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody v-for="user in allUsers" :key="user">
                    <tr class="tr">
                      <td class="mx-0">
                        <div style="display: flex">
                          <div
                            style="
                              margin-top: -15px;
                              margin-right: 10px;
                              position: relative;
                            "
                          >
                            <span
                              style="
                                border-radius: 50%; height: 3.7rem; 
                                text-transform: uppercase; padding-top: 1.2rem; font-weight: 700; font-size: 1.2rem;
                              "
                              class="btn btn-circle btn-primary text-white"
                              >{{ user.username[0] + user.username[1] }}</span
                            >
                          </div>
                          <div>
                            <span
                              class="text-heading font-semibold"
                              href="#"
                              v-on:click="viewImg(user.profileImage)"
                              data-target="#exampleModal"
                              style="cursor: pointer"
                              data-toggle="modal"
                            >
                              {{ user.username }}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a class="text-heading font-semibold" href="#">
                          {{ user.email }}
                        </a>
                      </td>
                      <td>
                        <span class="badge badge-lg badge-dot">
                          {{ user.phone }}
                        </span>
                      </td>

                      <td>
    <label class="switch">
      <input type="checkbox" @change="toggleDisable(user.id)" v-model="user.disable" />
      <span class="slider round"></span>
    </label>
  </td>

                      <!-- <td> -->
                      <!-- onclick="javascript: return false; -->
                      <!-- <label class="switch">
                        <input type="checkbox" id="1" @click="change()" :checked="user.authorized ===true" >            
                        <span class="slider round"></span>
                                </label>
                               </td> -->

                      <!-- <td>


<a v-if="!user.authorized"  class="btn btn-sm btn-warning mx-6">Autoriser
       </a>
    
    <a v-else type="button" class="btn mx-12 btn-sm btn-square btn-success text-danger-hover">
    <i class="bi bi-hand-thumbs-up"></i>
</a>
</td> -->
                      <td >
                        <a @click="toggleQueries(user.id)" class="btn d-inline-flex btn-sm btn-primary mx-1" >
                                    <span class=" pe-2">
                                        <i class="bi bi-envelope"></i>
                                    </span>
                                    <span>Queries</span>
                                </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { state, logout } from "@/EventBus.js";
import NotifSend from "@/components/reusable/notification.vue";
import QueriesCom from "@/components/reusable/queries.vue";

export default {
  name: "AdminAllUsers",
  components: {
    NotifSend,
    QueriesCom
  },
  data() {
    return {
      userIdQuery: null,
      showNotification: false,
      showQueries: false,

      pic: "",
      $url: this.$url,
      spinner: true,
      spinner1: false,
      allUsers: [],
      loading: false,
      users: [],
      users1: [],
      deviRejecteted: [],
      visaRejecteted: [],
      allRejected: [],
      userCount: "",
      visaCount: "",
      deviCount: "",
      visaCountR: "",
      deviCountR: "",
      alert: {
        display: false,
        message: "",
      },
      userInput: "",

      notifications: [], // Array to store notifications
      notificationCount: 0, // Initial notification count
      queries: 0,
      disableUsers: 0,
      userId: localStorage.getItem("userId"), // Retrieve user ID from localStorage
      title:"",
      msg:"",
      date:"",
    };
  },
  computed: {
    isLoggedIn() {
      return state.isLoggedIn;
    },
  },

  watch: {
      userInput(word) {
        if (word.length > 0) {
          this.allUsers = this.users.filter((element) =>
            element.email.includes(word)
          );
          if (this.allUsers.length === 0) {
            this.alert.message = "l'adresse mail n'existe pas";
            this.alert.display = true;
            console.log("Introuvable!");
          } else {
            this.alert.message = "";
            this.alert.display = false;
          }
        } else {
            this.allUsers = this.users;
        }
      }
    },
  mounted() {
    var settings = {
  "url": `${this.$url}/users`,
  "method": "GET",
  "timeout": 0,
};

// Initialize allUsers as an empty array
this.allUsers = [];

var self = this; // store 'this' reference

$.ajax(settings).done(function (response) {
  let disableUsers = []
  // Iterate over the response array
  for(let i = 0; i < response.length; i++) {
    // Push each user object into the allUsers array
    if( response[i].role != "admin"){
      self.allUsers.push(response[i]);
    }
    if(response[i].disable){
       disableUsers.push(response[i]);
    }
    
  }
  
  self.disableUsers = disableUsers.length
  // Set users to allUsers
  self.users = self.allUsers;
  self.userCount = self.users.length

  // Log users
  console.log(self.users);
}).fail((jqXHR, textStatus, errorThrown) => {
          console.error("Login request failed:", textStatus, errorThrown);
          alert("Request failed!")
        });

        this.viewNotificationsSent()

var queries = {
"url": `${this.$url}/all/queries`,
"method": "GET",
"timeout": 0,
};

$.ajax(queries).done((response) => {
this.queries = response.length; // Update notification count
  console.log( this.queries)}).fail((jqXHR, textStatus, errorThrown) => {
    console.error("Login request failed:", textStatus, errorThrown);
    alert("Request failed!")
  });
  },
  created() {

  },

  methods: {
    viewNotificationsSent(){
    var settings = {
        url: `${this.$url}/notifications/user/${this.userId}`, // Use user ID in the URL
        method: "GET",
        timeout: 0,
      };

      // Perform AJAX request to fetch notifications
      $.ajax(settings).done((response) => {
        this.notificationCount = response.length; // Update notification count
        console.log( this.notificationCount)
      }).fail((jqXHR, textStatus, errorThrown) => {
          console.error("Login request failed:", textStatus, errorThrown);
          alert("Request failed!")
        });
  },
    logoutUser() {
      logout();
      window.location.href = "/";
      // this.$router.push('/');
    },
    toggleNotification() {
      this.showNotification = !this.showNotification;
    },
    hideNotification() {
      this.showNotification = false;
    },
    toggleQueries(userIdP) {
this.userIdQuery = userIdP
      this.showQueries = !this.showQueries;
    },
    hideQueries() {
      this.showQueries = false;
    },
    close_popup(){
           // Get the modal
     var modal = document.getElementById("popup");

// Get the <span> element that close_popups the modal
var span = document.getElementsByClassName("close_popup")[0];

// When the user clicks on <span> (x), close_popup the modal
span.onclick = function () {
  modal.style.display = "none";
  // window.location.reload();
};
    },

    fetchNotifications() {
      this.spinner1 = true
      var settings = {
        url: `${this.$url}/notifications/user/${this.userId}`, // Use user ID in the URL
        method: "GET",
        timeout: 0,
      };

      // Perform AJAX request to fetch notifications
      $.ajax(settings).done((response) => {
        this.notifications = response.filter(
          (notification) => !notification.disable 
        ); // Update notifications array
        this.notifications.reverse()
        this.notificationCount = response.length; // Update notification count
        console.log( this.notificationCount)
        this.spinner1 = false
        var modal = document.getElementById("popup");
        modal.style.display = "block";
      }).fail((jqXHR, textStatus, errorThrown) => {
          console.error("Login request failed:", textStatus, errorThrown);
          alert("Request failed!")
          this.spinner1 = false
        });
    },
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      // Format the date to your desired format, for example: "Apr 26, 2024 13:36"
      const options = { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
      return date.toLocaleString('en-US', options);
    },
    truncatedMessage(message) {
      const maxLength = 200; // Maximum length of the truncated message
      if (message.length > maxLength) {
        return message.substring(0, maxLength) + '...'; // Truncate the message and add ellipsis
      }
      return message; // Return the original message if it's shorter than the maximum length
    },
    toggleDisable(userId) {
      var settings = {
        url: `${this.$url}/user/disable/${userId}`,
        method: "DELETE",
        timeout: 0,
      };

      $.ajax(settings).done((response) => {
  console.log(response);
  alert("User disabled status is: " + response.disable);
  // Optionally, you can update the user data in your Vue component after successful toggle
}).fail((jqXHR, textStatus, errorThrown) => {
          console.error("Login request failed:", textStatus, errorThrown);
          alert("Request failed!")
        });
    }
  },
};
</script>

<style lang="scss" scoped>
/* Webpixels CSS */
/* Utility and component-centric Design System based on Bootstrap for fast, responsive UI development */
/* URL: https://github.com/webpixels/css */

@import url(https://unpkg.com/@webpixels/css@1.1.5/dist/index.css);
@import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,200,0,0);

/* Bootstrap Icons */
@import url("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.4.0/font/bootstrap-icons.min.css");

@font-face {
  font-family: Proxima Nova;
  src: url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_1_0.eot);
  src: url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_1_0.eot?#iefix)
      format("embedded-opentype"),
    url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_1_0.woff2)
      format("woff2"),
    url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_1_0.woff)
      format("woff"),
    url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_1_0.ttf)
      format("truetype"),
    url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_1_0.svg#wf)
      format("svg");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: Proxima Nova;
  src: url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_4_0.eot);
  src: url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_4_0.eot?#iefix)
      format("embedded-opentype"),
    url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_4_0.woff2)
      format("woff2"),
    url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_4_0.woff)
      format("woff"),
    url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_4_0.ttf)
      format("truetype"),
    url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_4_0.svg#wf)
      format("svg");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: Proxima Nova;
  src: url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_5_0.eot);
  src: url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_5_0.eot?#iefix)
      format("embedded-opentype"),
    url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_5_0.woff2)
      format("woff2"),
    url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_5_0.woff)
      format("woff"),
    url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_5_0.ttf)
      format("truetype"),
    url(https://d25purrcgqtc5w.cloudfront.net/dist/fonts/proximanova/302D42_5_0.svg#wf)
      format("svg");
  font-weight: 700;
  font-style: normal;
}

h1 {
  background: linear-gradient(
    to bottom,
    #634f2c 24%,
    #686254 26%,
    #605c52 27%,
    #c6b173 40%,
    #3b2b0c 78%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #fff;
  font-family: "Playfair Display", serif;
  position: relative;
  text-transform: uppercase;
  font-size: 2vw;
  margin: 0;
  font-weight: 700;
  text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
}

h1:after {
  background: none;
  content: attr(data-heading);
  left: 0;
  top: 0;
  z-index: -1;
  position: absolute;
  text-shadow: -1px 0 1px #c6bb9f, 0 1px 1px #c6bb9f,
    5px 5px 10px rgba(0, 0, 0, 0.4), -5px -5px 10px rgba(0, 0, 0, 0.4);
}
.card-header {
  display: flex;
}

.thead-light1 th {
  font-size: 0.9rem;
}
.tr td {
  font-size: 1rem;
}
.tr span {
  text-transform: capitalize;
}

.search-box {
  font-size: 18px;
  padding: 0.5rem 1rem;
  border: 1px solid #5bdb44;
  background-color: white;
  border-radius: 10px;
  transition: 0.2s;
}

.search-box:hover {
  border-color: #aaaaaa;
}

.search-box:focus-within {
  border-color: #ff0080;
  box-shadow: 0 0 0 5px rgba(255, 0, 128, 0.4);
}

input {
  font-family: Proxima Nova;
  letter-spacing: -0.2px;
  font-size: 18px;
  border: none;
  max-width: 100%;
  color: #323232;
}

button:hover {
  cursor: pointer;
}

input:focus {
  outline: none;
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
}

.clear:not(:valid) ~ .search-clear {
  display: none;
}
.alert {
  padding: 10px 14px 10px 14px;
  background-color: #f2f2f2;
  color: red;
  font-size: 20px;
  font-weight: 200px;
  position: relative;
  text-align: center;
}

@media screen and (max-width: 650px) {
  .card-header {
    display: block;
  }
  .search-box {
    margin-top: 1rem;
    font-size: 18px;
    padding: 0.5rem 1rem;
    border: 1px solid #c1c1c1;
    background-color: white;
    border-radius: 10px;
    transition: 0.2s;
  }
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #59db32;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #f32121;
}

input:focus + .slider {
  box-shadow: 0 0 1px #471111;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}


.modal {
  display: none;
  position: fixed;
  z-index: 200;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1400px;
  background-color: rgba(0, 0, 0, 0.71);
  padding: 20px;
  box-sizing: border-box;
  padding-left: 20rem;
  padding-right: 20rem;
}

.modal-content {
  background-color: #e1dfdf;
  border: 1px solid #000000;
  padding: 20px 0 0 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden; /* Hide overflowing content */
}

.close_popup {
  color: #000000;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 28px;
  cursor: pointer;
}

h4 {
  margin-top: 0;
  color: #000;
}





.dropdown_user {
  display: inline-block;
  position: relative;
}

.notification-divider {
  margin: 0 0;
  border: 0.5px solid rgba(0, 0, 0, 0.1); /* Change color as needed */
}

.notification {
  text-decoration: none;
  color: #000;
}
.notification-container1{
  background-color: #eae5e5;
}
.notification-container1:hover {
  background-color: rgba(34, 33, 33, 0.917); /* Adjust background color */
}

.notification-container1:hover .notification {
  color: #fff;
}

.notification-container1:hover .delete-icon {
  color: #fff;
}

.notification-container:hover {
  background-color: rgba(34, 33, 33, 0.917); /* Adjust background color */
}

.notification-container:hover .notification {
  color: #fff;
}

.notification-container:hover .delete-icon {
  color: #fff;
}

.notification-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 7px;
}

.notification-info {
  display: flex;
  align-items: center;
  width: 100%;
}

.notification-number {
  margin-right: 0.5rem;
  background-color: #898989; /* Customize background color */
  color: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 50%;
  width: 7%;
  margin-left: 0.5rem;
}

.notification-date {
  margin-top: 0.5rem;
color: rgb(107, 107, 245);
}


.footer-notif {
  padding: 0.1rem;
  text-align: center;
  background-color: #a4a4a4; /* Background color of the footer */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Box shadow effect */
  display: flex; /* Flex container */
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically (optional) */
}


.view-all {
  text-decoration: none;
  color: #333; /* Text color of the link */
  font-weight: bold;
  transition: color 0.3s ease;
}

.view-all:hover {
  color: #555; /* Hover color of the link */
}

</style>
