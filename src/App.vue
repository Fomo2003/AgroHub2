<template>
  <div :class="appTheme" class="pt-0.5">
    <!-- App header -->

    <!-- Render active component contents with vue transition -->
    <transition name="fade" mode="out-in">
      <router-view :theme="appTheme" />
    </transition>

    <!-- Scroll to top -->
    <back-to-top
      visibleoffset="500"
      right="30px"
      bottom="20px"
      class="shadow-lg"
    >
      <i data-feather="chevron-up"></i>
    </back-to-top>

    <!-- App footer -->
    <div id="app">
      <ul>
        <li v-for="message in messages" :key="message">
          {{ message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Pusher from 'pusher-js';
import $ from 'jquery'
export default {
  components: {},
  data: () => {
    return {
      messages: [],
      userId: null, // Retrieve user ID from localStorage
    };
  },
  mounted() {
    this.userId = localStorage.getItem("userId")
    if(this.userId != null){
      var settings = {
  "url": `${this.$url}/user/${this.userId}`,
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {
  console.log(response);
}).fail((jqXHR, textStatus, errorThrown) => {
          console.error("Login request failed:", textStatus, errorThrown);
          localStorage.clear();
                this.$router.push('/');
        });
    }
 

    let notif = (title, body) => {
  const options = {
    body: body,
    icon: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKnkLCa54buY0CjzEwa04fTadyOFHrzAUKgYoeJE4jzw&s`,
    badge: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKnkLCa54buY0CjzEwa04fTadyOFHrzAUKgYoeJE4jzw&s`
  };
  const n = new Notification(title, options);
  console.log(n);
}

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher("a7d67608f236b9565325", {
  cluster: "eu",
});

var channel = pusher.subscribe("my-channel");
channel.bind("my-event", (data) => {
  this.messages.push(data.message); // Push the actual message without stringifying
  if (Notification.permission === "granted") {
    notif("New Message", data.message);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(perm => {
      if (perm === 'granted') {
        notif("New Message", data.message);
      }
    });
  }
});

  },
  updated() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.vue-back-to-top {
  @apply p-2 bg-indigo-500 hover:bg-indigo-600 text-white transition
        duration-500
        ease-in-out
        transform
        hover:-translate-y-1 hover:scale-110;
  border-radius: 50%;
  font-size: 102px;
  line-height: 22px;
}

.fade-enter-active {
  animation: coming 0.4s;
  animation-delay: 0.2s;
  opacity: 0;
}

.fade-leave-active {
  animation: going 0.4s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-10px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }

  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>
