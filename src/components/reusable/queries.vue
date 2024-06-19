<template>
    <div>
      


        <div
      v-if="loadingQueries"
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




      <div id="popup_send" class="modal" v-if="queryLength != 0">
    <!-- Modal content -->
    <div class="modal-content">
      <span class="close_popup_send" @click="close_popup_send()" >&times;</span>
     
      

     
      

      <div class="dropdown-content">
              <h5 style="margin-top: 1.6rem; margin-bottom: 0.7rem; color: rgb(107, 107, 245);">USER QUERIES</h5>
              <hr class="notification-divider" />
              <div class="message-container" style="height: 78vh;   overflow-y: auto;">
              <!-- <div class="" v-for="(notification, index) in notifications.slice(0, 5)" :key="index"> -->
                <div class="" v-for="(notification, index) in notifications" :key="index">

    <a class="notification notification-container1">
        <div class="notification-content" >
            <div class="notification-info" >

                
              <div style="width:5%;margin-left: 10px;">
                <span class="notification-number">{{ index + 1 }}</span>
              </div>


              <div style="width:100%; display: grid;margin-left: 10px;  ">

                <div style="display: grid; width: 20%; margin-bottom: -4rem;">
                    <span class="notification-message" style="font-weight: 700; text-transform: capitalize; ">
                        {{notification.name }}
                    </span>
                    <span class="notification-message" style="font-weight: 400; font-size: 0.9rem;">
                        {{ notification.email }}
                    </span>
                </div>
                <div style="display: grid; width: 70%; margin-left: 11rem;">
                    <span class="notification-message" style="margin-bottom: 0.5rem; font-weight: 700; text-transform: capitalize;  ">
                        {{ notification.title }}
                    </span>
                    <span class="notification-message" style="font-size: 0.9rem; ">
                        {{ truncatedMessage(notification.message) }}
                    </span>
                </div>
                
                  
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

  
    </div>
  </template>
  
  <script>
  import $ from 'jquery';
  
  export default {
    components: {},
    props: {
    userId: String,
  },
    data: () => {
      return {
        spinner: false,
        notifications:[],
        loadingQueries: false,
        queryLength: 0,
      };
    },
    mounted() {
        this.loadingQueries = true
        var settings = {
  "url": `${this.$url}/get_user/queries/${this.userId}`,
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done((response) => {
  console.log(response);
    this.notifications = response;
    this.queryLength = response.length
    this.loadingQueries = false; 
}).fail((jqXHR, textStatus, errorThrown) => {
          console.error("Login request failed:", textStatus, errorThrown);
          this.loadingQueries = false
          if( this.userId != ''){
            alert("No  Query from this User.")
          }
        });

    },
  methods: {
  sendNotif(){

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
  
  close_popup_send() {
        this.$emit("close");
      }
  },
  };
  </script>
  
  <style lang="scss" scoped>
  
  
  .modal {
    display: block;
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
    box-sizing: border-box;
    position: relative;
    overflow: hidden; /* Hide overflowing content */
  }
  .popup_send-message-container {
    max-height: 200px; /* Set maximum height for message area */
    overflow-y: auto; /* Enable vertical scrolling if message exceeds maximum height */
  }
  .message-container {
    max-height: 800px; /* Set maximum height for message area */
    overflow-y: auto; /* Enable vertical scrolling if message exceeds maximum height */
    background-color: #ffffff;
    padding-right: 1rem;
    padding-left: 1rem;
  }


  .message{
    font-size: 0.8rem;
  }
  .close_popup_send {
    color: #000000;
    position: absolute;
    top: 10px;
    bottom: 3rem;
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

.notification-info:hover {
  background-color: rgb(34, 33, 33); /* Adjust background color */
  color: #fff;
}

.notification-info:hover .notification {
  color: #fff;
}


.notification-container1{
  background-color: #eae5e5;
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
  