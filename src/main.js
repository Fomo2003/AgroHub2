import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import BackToTop from 'vue-backtotop';
import eventBus from './EventBus'; // Import your custom EventBus

const feather = require('feather-icons');
feather.replace();

const app = createApp(App);
app.use(router);
app.use(BackToTop);

app.config.globalProperties.$url = "http://127.0.0.1:8200"; 

// Provide the EventBus to all components
app.provide('$bus', eventBus);

app.mount('#app');
