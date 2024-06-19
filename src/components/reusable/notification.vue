<template>
  <div>
    
    <div id="popup_send" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close_popup_send" @click="close_popup_send()">&times;</span>
    <h4>Send Notification</h4>
    <hr />
  <form @submit.prevent="sendNotif()" method="post" enctype="text/plain" style="margin-right: 2rem;">

    <label for="subject" class="subject">Subject</label>
    <input type="text" v-model="title" name="subject" maxlength="45">

    <label for="message" class="message">Message</label>
    <textarea name="message" v-model="message" cols="30" rows="7" required maxlength="500"></textarea>

    <p class="button-container">

        <button class="button" type="submit"> SEND
          <i v-if="spinner" class="fa fa-circle-o-notch fa-spin" style="font-size:18px; margin-left: 3px;"></i>
        </button>
    </p>
  </form>
  </div>
</div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  components: {},
  data: () => {
    return {
      title: null,
      message: null,
      spinner: false
    };
  },
  mounted() {

  },
methods: {
sendNotif(){
this.spinner = true
  var settings = {
  "url": `${this.$url}/push-message?message=${this.message}&title=${this.title}`,
  "method": "POST",
  "timeout": 0,
};
$.ajax(settings).done((response) => {
  console.log(response);
  alert("Notification sent to all users")
  this.spinner = false
  this.message = ""
  this.title = ""
});

},

close_popup_send(){
           // Get the modal
     var modal = document.getElementById("popup_send");

// Get the <span> element that close_popup_sends the modal
var span = document.getElementsByClassName("close_popup_send")[0];

// When the user clicks on <span> (x), close_popup_send the modal
span.onclick = function () {
  modal.style.display = "none";
  // window.location.reload();
  this.$router.push('/admin_page')
};
    },
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
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden; /* Hide overflowing content */
}
.popup_send-message-container {
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
.close_popup_send {
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


.message-title {
  margin-top: 0;
  padding-bottom: 0.75em;
  border-bottom: solid 1px rgb(221, 221, 221);
  text-align: left;
}

.message-container {
  margin-bottom: 8em;
  max-width: 600px;
}

form {
  display: grid;

  grid-template-columns: 90px auto auto;
  grid-column-gap: 0.5em;
  grid-row-gap: 2em;
}

label {
  font-weight: bold;
  grid-column: 1/2;
}

input {
  /* May help keep right column responsive
	width: cal(100%-200px); */
  grid-column: 2/4;
  height: 3em;
  border: solid 3px var(--primary-clr);
  border-radius: 4em;
  padding: 0 1em;
}

input,
textarea {
  font-family: "Roboto", sans-serif;
}

textarea {
  grid-column: 2/4;
  border-radius: 2em;
  border: solid 3px var(--primary-clr);
  padding: 0.5em 1em;
}

input:focus,
textarea:focus {
  background: rgb(211, 230, 253);
}

.button-container {
  grid-column: 1/4;
  display: flex;
  justify-content: center;
  
}

.button {
  width: 200px;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
  transition: .4s ease;
  text-decoration: none;
  margin-left: 5.5rem;

  grid-column: 2/4;
  height: 3em;
  border: solid 3px var(--primary-clr);
  border-radius: 4em;
  padding: 0 1em;
}

.button:hover {
  opacity: 0.7;
}

@media screen and (max-width: 1024px) {
  /* Specific to background image */
  img #background-img {
    left: 50%;
    left: -512px; /* 50% */
  }
}

/* For Mobile */
@media (max-width: 750px) {
  .container {
    width: 90%;
  }

  form {
    display: flex;
    flex-direction: column;
    grid-row-gap: 0;
  }

 

  input,
  textarea {
    margin: 1em 0;
  }

  p#break {
    display: inline;
  }
}

</style>
