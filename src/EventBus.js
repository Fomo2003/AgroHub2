import { reactive } from 'vue';
import mitt from 'mitt';

// Create an event bus
const eventBus = mitt();

// Check if login state exists in localStorage
const storedLoginState = localStorage.getItem('isLoggedIn');

// Create a reactive store for login state
const state = reactive({
  isLoggedIn: storedLoginState ? JSON.parse(storedLoginState) : false,
});

// Function to update localStorage with the current login state
function updateLoginStateInStorage() {
  localStorage.setItem('isLoggedIn', JSON.stringify(state.isLoggedIn));
}

// Login function
// Login function
function login() {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && accessToken.trim() !== '') {
      state.isLoggedIn = true;
    } else {
      state.isLoggedIn = false; // Ensure isLoggedIn is false if no access token found
    }
    updateLoginStateInStorage();
    eventBus.emit('login');
  }  

// Logout function
function logout() {
  state.isLoggedIn = false;
  updateLoginStateInStorage();
  eventBus.emit('logout');
  localStorage.clear();
  
}

// Function to check login state
function checkLogin() {
  console.log("Current login state:", state.isLoggedIn);
  return state.isLoggedIn;
}

export { eventBus, state, login, logout, checkLogin };
