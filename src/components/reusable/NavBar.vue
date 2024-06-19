<script>
import { state, logout } from "@/EventBus.js";
import $ from "jquery";
export default {
  name: "NavBar",
  data: () => {
    return {
      notifications: [], // Array to store notifications
      notificationCount: 0, // Initial notification count
      userId: localStorage.getItem("userId"), // Retrieve user ID from localStorage
      title:"",
      msg:"",
      date:"",
      loading:false
    };
  },
  computed: {
    isLoggedIn() {
      return state.isLoggedIn;
    },
  },
  mounted() {
    this.fetchNotifications(); // Fetch notifications when the component is mounted
    // Set up interval to continuously fetch notifications every 30 seconds
    setInterval(this.fetchNotifications, 30000);
  },
  methods: {
    isCurrentRoute(route) {
      return this.$route.path === route;
    },
    logoutUser() {
      logout();
      window.location.href = "/";
      // this.$router.push('/');
    },
    viewNotification(id) {
      this.loading = true
      var settings = {
  "url": `${this.$url}/notification/${id}`,
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done((response) => {
  console.log(response.title);
  this.fetchNotifications(); // Fetch notifications when the component is mounted
  this.title = response.title;
  this.msg = response.message;
  this.date = response.created_at;
  var modal = document.getElementById("popup");
  modal.style.display = "block";
  this.loading = false
});

      // No need for DOM manipulation here
      
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
  this.fetchNotifications()
};
    },
    fetchNotifications() {
      if(this.userId != null){
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
        this.notificationCount = response.filter(
          (notification) => !notification.seen && !notification.disable
        ).length; // Update notification count
      });
      }
 
    },
    disablNotification(id, event) {
      event.stopPropagation();

  var settings = {
    url: `${this.$url}/disable/notification/${id}`,
    method: "GET",
    timeout: 0,
  };

  // Preserve the outer `this` context
  let self = this;

  $.ajax(settings).done(function(response) {
    console.log(response);
    const index = self.notifications.findIndex(
      notification => notification.id === id
    );
    if (index !== -1) {
      self.notifications.splice(index, 1);
      self.notificationCount--;
    }
  });
},
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      // Format the date to your desired format, for example: "Apr 26, 2024 13:36"
      const options = { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
      return date.toLocaleString('en-US', options);
    },
    truncatedMessage(message) {
      const maxLength = 35; // Maximum length of the truncated message
      if (message.length > maxLength) {
        return message.substring(0, maxLength) + '...'; // Truncate the message and add ellipsis
      }
      return message; // Return the original message if it's shorter than the maximum length
    }
  },
};
</script>

<template>
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
  <div class="inner">
    <h1 v-if="!isLoggedIn" class="logo" style="margin-right: 13rem">
      <a href="/">HubAgro - Agriculture company</a>
    </h1>
    <h1 v-if="isLoggedIn" class="logo">
      <a href="/">HubAgro - Agriculture company</a>
    </h1>
    <nav>
      <ul class="sf-menu">
        <li  :class="{ 'current': isCurrentRoute('/') }"><a href="/">home</a></li>
        <li v-if="isLoggedIn" :class="{ 'current': isCurrentRoute('/market_price') }">
          <router-link to="/market_price" class="current">Market Prices</router-link>
        </li>

        <li v-if="isLoggedIn">
          <div class="dropdown_user" >
            <span class="a" :class="{ 'b': isCurrentRoute('/disease') || isCurrentRoute('/crops_pests') || isCurrentRoute('/weather_forcast') }">Predictions</span>

            <div class="dropdown-content">
              <div class="notification-container">
                <router-link to="/disease" class="notification">
                  <div class="notification-content">
                    <div class="notification-info">
                      <span class="notification-message">Diseases</span>
                    </div>
                  </div>
                </router-link>
                <hr class="notification-divider" />
              </div>

              <div class="notification-container">
                <router-link to="/crops_pests" class="notification">
                  <div class="notification-content">
                    <div class="notification-info">
                      <span class="notification-message">Pests and Crops</span>
                    </div>
                  </div>
                </router-link>
                <hr class="notification-divider" />
              </div>

              <div class="notification-container">
                <router-link to="/weather_forcast" class="notification">
                  <div class="notification-content">
                    <div class="notification-info">
                      <span class="notification-message">Weather Forcast</span>
                    </div>
                  </div>
                </router-link>
                <hr class="notification-divider" />
              </div>
              <!-- Additional notification containers go here -->
            </div>
          </div>
        </li>

       <li :class="{ 'current': isCurrentRoute('/contact') }" v-if="isLoggedIn"><router-link to="/contact" class="current">Contacts</router-link></li> 
        <li v-else> <router-link to="/login">Contacts</router-link></li> 
        
        <li v-if="!isLoggedIn" :class="{ 'current': isCurrentRoute('/login') }">
          <router-link to="/login" class="current">Get Started</router-link>
        </li>

        <li>
          
              <!-- Additional notification containers go here -->
            
          <div class="dropdown_user" style="background: none" v-if="isLoggedIn">
            <button type="button" class="icon-button">
              <span class="material-icons">notifications</span>

              <span class="icon-button__badge" v-if="notificationCount > 0">{{ notificationCount }}</span>
              <span class="icon-button__badge"  v-else style="display: none;">{{ notificationCount }}</span>
            </button>
            <div class="dropdown-content" v-if="notifications.length > 0">
              <h5 style="margin-top: 0.6rem; color: rgb(107, 107, 245);">NOTIFICATIONS</h5>
              <hr class="notification-divider" />
              <div class="message-container">
              <!-- <div class="" v-for="(notification, index) in notifications.slice(0, 5)" :key="index"> -->
                <div class="" v-for="(notification, index) in notifications" :key="index">
                  
    <a class="notification notification-container" v-if="!notification.seen" @click="viewNotification(notification.id)">
        <div class="notification-content">
            <div class="notification-info">
                <span class="notification-number">{{ index + 1 }}</span>
                <div style="display: grid;">
                    <span class="notification-message" style="margin-bottom: 0.5rem; font-weight: 700; text-transform: capitalize;">
                        {{ notification.title }}
                    </span>
                    <span class="notification-message" style="font-size: 0.9rem;">
                        {{ truncatedMessage(notification.message) }}
                    </span>
                    <span class="notification-date" style="font-size: 0.8rem; font-weight: 600;">
                        {{ formatDate(notification.created_at) }}
                    </span>
                </div>
            </div>
            <span class="material-icons delete-icon" @click="disablNotification(notification.id, $event)">cancel</span>
        </div>
    </a>
    <a class="notification notification-container1" v-else @click="viewNotification(notification.id)">
        <div class="notification-content">
            <div class="notification-info">
                <span class="notification-number">{{ index + 1 }}</span>
                <div style="display: grid;">
                    <span class="notification-message" style="margin-bottom: 0.5rem; font-weight: 700; text-transform: capitalize;">
                        {{ notification.title }}
                    </span>
                    <span class="notification-message" style="font-size: 0.9rem;">
                        {{ truncatedMessage(notification.message) }}
                    </span>
                    <span class="notification-date" style="font-size: 0.8rem; font-weight: 600;">
                        {{ formatDate(notification.created_at) }}
                    </span>
                </div>
            </div>
            <span class="material-icons delete-icon" @click="disablNotification(notification.id, $event)">cancel</span>
        </div>
    </a>
    <hr class="notification-divider" />
    </div>
</div>

              
              <div class="footer-notif" >
                <router-link to="/all_notifications" class="view-all" v-if="notificationCount > 0 && notificationCount >= 5"
                  >View All Notifications</router-link
                >
                <router-link to="/all_notifications" class="view-all" v-else
                  >@Fomo</router-link
                >
              </div>
              <!-- Additional notification containers go here -->
            </div>
          </div>
        </li>

        <div class="dropdown_user" v-if="isLoggedIn">
          <button
            class="icon-button dropdown_user-toggle"
            type="button"
            id="profileDropdown_user"
            data-bs-toggle="dropdown_user"
            aria-expanded="false"
          >
            <span class="material-icons">account_circle</span>
          </button>

          <div class="dropdown-content">
            <div class="notification-container">
              <router-link to="/my_account" class="notification">
                <div class="notification-content">
                  <div class="notification-info">
                    <span class="notification-message">My Account</span>
                  </div>
                </div>
              </router-link>
              <hr class="notification-divider" />
            </div>

            <div class="submenu">
              <a class="notification-container" @click="logoutUser()">
                <div class="notification">
                  <div class="notification-content">
                    <div class="notification-info">
                      <span class="notification-message"> Language</span>
                    </div>
                  </div>
                </div>
              </a>
              <div>
                <a class="notification-container">
                  <div class="notification">
                    <div class="notification-content">
                      <div class="notification-info">
                        <span class="notification-message"> French</span>
                      </div>
                    </div>
                  </div>
                </a>
                <hr class="notification-divider" />
                <a class="notification-container">
                  <div class="notification">
                    <div class="notification-content">
                      <div class="notification-info">
                        <span class="notification-message"> English</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <hr class="notification-divider" />
            </div>

            <a class="notification-container" @click="logoutUser()">
              <div class="notification">
                <div class="notification-content">
                  <div class="notification-info">
                    <span class="notification-message"> Logout</span>
                  </div>
                </div>
              </div>
            </a>
            <!-- Additional notification containers go here -->
          </div>
        </div>
        <!-- 
            <li class="dropdown_user">
    <button class="icon-button dropdown_user-toggle" type="button" id="profileDropdown_user" data-bs-toggle="dropdown_user" aria-expanded="false">
      <span class="material-icons">account_circle</span>
    </button>
    <ul class="dropdown_user-menu" aria-labelledby="profileDropdown_user">
      <li><a class="dropdown_user-item" @click="goToMyAccount">My Account</a></li>
      <li><a class="dropdown_user-item" @click="changeLanguage">Language</a></li>
      <li @click="logoutUser()"><a class="dropdown_user-item">Logout</a></li>
    </ul>
  </li> -->
      </ul>
    </nav>
    <div class="clear"></div>

    
    <div id="popup" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close_popup" @click="close_popup()">&times;</span>
    <h4>{{ title }}</h4>
    <hr />
    <div class="popup-message-container">
      <p class="message">{{ this.msg }}</p>
    </div>
    <div class="date-popup">{{ formatDate(date) }}</div>
    <div class="footer-popup">
      <a class="view-all">@Fomo</a>
    </div>
  </div>
</div>




  </div>
</template>

<style lang="scss" scoped>
/* Import Google font - Open Sans */

@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

@import url(https://fonts.googleapis.com/css?family=Changa+One);
$font: "Changa One", arial, serif;
.currentP{
}
.modal {
  display: none;
  position: fixed;
  z-index: 200;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  max-width: 500px;
  background-color: rgba(0, 0, 0, 0.71);
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  background-color: #e1dfdf;
  border: 1px solid #000000;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden; /* Hide overflowing content */
}
.popup-message-container {
  max-height: 200px; /* Set maximum height for message area */
  overflow-y: auto; /* Enable vertical scrolling if message exceeds maximum height */
}
.message-container {
  max-height: 400px; /* Set maximum height for message area */
  overflow-y: auto; /* Enable vertical scrolling if message exceeds maximum height */
}
.message{
  font-size: 0.8rem;
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

.date-popup {
  margin-top: 10px;
  font-style: italic;
  font-size: 1rem;
  color: rgb(107, 107, 245);
}

.footer-popup {
  margin-top: 20px;
  text-align: center;
}

.footer-popup {
  color: #ffffff;
  background-color: #a4a4a4;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
}

.footer-popup:hover {
  background-color: #7f7f7f;
}
// modal end

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
  justify-content: space-between;
}

.notification-info {
  display: flex;
  align-items: center;
}

.notification-number {
  margin-right: 0.5rem;
  background-color: #898989; /* Customize background color */
  color: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 50%;
}

.notification-date {
  margin-top: 0.5rem;
color: rgb(107, 107, 245);
}

.delete-icon {
  cursor: pointer;
  margin-left: 1rem;
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

.dropdown_user button {
  border: none;
  padding: 8px 16px;
  background-color: rgb(166, 166, 166);
  color: #fff;
  transition: 0.3s;
  cursor: pointer;
}

.dropdown_user:hover button {
  background-color: rgb(139, 139, 139);
}
.dropdown_user:hover {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}
.dropdown_user > div {
  background-color: #c9c9c9;
  z-index: 100;
  visibility: hidden;
  position: absolute;
  top: calc(100% + 5px); /* Position dropdown below the button */
  left: 0;
  width: max-content; /* Adjust width to content */
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
  opacity: 0;
  transform: translateY(-10px); /* Slide in effect */
  transition: opacity 0.3s, transform 0.2s;
}
.dropdown_user .submenu {
  position: relative;
}
.dropdown_user .submenu > div {
  background-color: #e1e1e1;
  visibility: hidden;
  position: absolute;
  left: 100%;
  top: 2;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
  opacity: 0;
  transform: translateY(-10px); /* Slide in effect */
  transition: opacity 0.3s, transform 0.2s;
}
/*use the following commented class if you wanna show submenu at left*/
/*
.dropdown_user .submenu.atLeft > div{
  left:-100%;
}
*/
.dropdown_user .submenu:hover > div {
  visibility: visible;
  opacity: 1;
}

.dropdown_user:hover > div {
  visibility: visible;
  opacity: 1;
}
.a {
  color:white;
	text-decoration:none;
  display: block;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  line-height: 18px;
  text-transform: uppercase;
  padding: 10px 0 0 0;
  margin-bottom: 0.5rem;
}
.b{
  color:#afaa9b;
	text-decoration:none;
  background: url('../../../public/images/nav-active.png') no-repeat center 0;
}
.dropdown_user a {
  display: block;
  text-decoration: none;
  padding: 8px;
  color: #000000;
  text-align: left;
  transition: 0.1s;
  white-space: nowrap;
  z-index: 1000;
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
}

.dropdown_user a:hover,
.dropdown_user .submenu:hover > a {
  color: #fff;
}

.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: #333333;
  background: #dddddd;
  border: none;
  outline: none;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

.icon-button:hover {
  cursor: pointer;
}

.icon-button:active {
  background: #cccccc;
}

.icon-button__badge {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 25px;
  height: 25px;
  background: red;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>
