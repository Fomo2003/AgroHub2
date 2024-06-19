<script>
import $ from "jquery";
// import jQuery from "jquery";
import NavBar from '@/components/reusable/NavBar.vue'
import Footer from '@/components/reusable/footer.vue'

export default {
  name: "disease",
  data() {
    return {
      imageUrl: null,
      response: null,
      prediction: null,
      confidence_level: null,
      disease_explanation: null,
      loading: false
    };
  },
  components: { NavBar, Footer},
  methods: {
    previewImage(event) {
      this.loading = true
      const fileInput = event.target.files[0];
      const form = new FormData();
      form.append("file", fileInput);

      const settings = {
        url: `${this.$url}/predict/disease`,
        method: "POST",
        timeout: 0,
        headers: {
          Cookie: "session_id=91dbad035525d94db2ccd82796584baf92716edb",
        },
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: form,
      };

      // AJAX request
      $.ajax(settings)
        .done((response) => {
          console.log(response);
          this.response = JSON.parse(response); // Assign response to data property
          console.log("Response:", response); // Debugging
          console.log("this.response:", this.response); // Debugging
          this.prediction = this.response.prediction;
          this.confidence_level = this.response.confidence_level;
          this.disease_explanation = this.response.disease_explanation;
          this.loading = false

          if (fileInput) {
            const reader = new FileReader();
            reader.readAsDataURL(fileInput);
            reader.onload = (e) => {
              this.imageUrl = e.target.result;
            };
          }
        })
        .fail((error) => {
          console.error("Error:", error);
          alert("Error.", error);
          this.loading = false
          // Handle error here
        });
    },
  },
};
</script>
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
      <div class="container_24">
        <div class="wrapper">
          <div class="grid_24 content-bg">
            <div class="wrapper">
              <div class="card">
                <div class="card-pic-wrap">
                  <!-- Image preview -->
                  <img v-if="imageUrl" :src="imageUrl" alt="Selected image"  style="border: 5px solid #fff; border-radius: 8px; display: inline-block;"/>
                  <img 
                    v-else
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1145795/plant-1.png"
                    alt="Default image"
                  />
                </div>
                <div class="card-content">
                  <h3
                    v-if="prediction == 'Common_Rust'"
                    style="background-color: #ffa500"
                  >
                    COMMON RUST {{ (confidence_level * 100).toFixed(2)  }}%
                  </h3>
                  <h3
                    v-else-if="prediction == 'Gray_Leaf_Spot'"
                    style="background-color: #808080"
                  >
                    GRAY LEAF SPOT {{ (confidence_level * 100).toFixed(2)  }}%
                  </h3>
                  <h3
                    v-else-if="prediction == 'Blight'"
                    style="background-color: #800000"
                  >
                    BLIGHT {{ (confidence_level * 100).toFixed(2)  }}%
                  </h3>
                  <h3
                    v-else-if="prediction == 'Healthy'"
                    style="background-color: #6cc885"
                  >
                    HEALTHY {{ (confidence_level * 100).toFixed(2)  }}%
                  </h3>
                  <h3 v-else style="background-color: #ffffff; color: #000;;">
                    Disease Title
                  </h3>

                  <p v-if="prediction != 'Healthy' && prediction != null" style="font-size: 1.2rem;">
                    {{ this.disease_explanation }}
                  </p>
                  <p v-else style="font-size: 1.2rem;">
                    Disease explanation and how it works.
                  </p>
                  <p><a href="#0">So leafy</a></p>
                </div>
              </div>
              <!-- Custom upload button -->
              <div class="kwt-file">
                <div class="kwt-file__drop-area">
                  <span class="kwt-file__choose-file kwt-file_btn-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                    >
                      <path
                        d="M67.508 468.467c-58.005-58.013-58.016-151.92 0-209.943l225.011-225.04c44.643-44.645 117.279-44.645 161.92 0 44.743 44.749 44.753 117.186 0 161.944l-189.465 189.49c-31.41 31.413-82.518 31.412-113.926.001-31.479-31.482-31.49-82.453 0-113.944L311.51 110.491c4.687-4.687 12.286-4.687 16.972 0l16.967 16.971c4.685 4.686 4.685 12.283 0 16.969L184.983 304.917c-12.724 12.724-12.73 33.328 0 46.058 12.696 12.697 33.356 12.699 46.054-.001l189.465-189.489c25.987-25.989 25.994-68.06.001-94.056-25.931-25.934-68.119-25.932-94.049 0l-225.01 225.039c-39.249 39.252-39.258 102.795-.001 142.057 39.285 39.29 102.885 39.287 142.162-.028A739446.174 739446.174 0 0 1 439.497 238.49c4.686-4.687 12.282-4.684 16.969.004l16.967 16.971c4.685 4.686 4.689 12.279.004 16.965a755654.128 755654.128 0 0 0-195.881 195.996c-58.034 58.092-152.004 58.093-210.048.041z"
                      />
                    </svg>
                    Upload Image
                  </span>
                  <input
                    class="kwt-file__input"
                    type="file"
                    @change="previewImage"
                    accept="image/*"
                  />
                  <span class="kwt-file__msg">Or drop files here</span>
                  <div class="kwt-file__delete"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer >

      <div class="container_24" v-if="response && response.prediction != 'Healthy'">
    <div class="">
      <div class="grid_24 footer-bg">
        <div class="hr-border-2"></div>
        <div class="grid_7 suffix_1 prefix_1 alpha">
            <div class="copyright">
              &copy; 2024 <strong class="footer-logo">AgroPlus</strong>
              <div>
                Website Template by
                <a target="_blank" href="#"
                  > Fomo122@gmail.com</a
                >
              </div>
            </div>
          </div>
        <div class="">
   
          <div class="grid_4" >
            <h5 class="heading-1" >Treatments:</h5>
            <ul class="footer-list" style="height: 100%; overflow-y: auto;">
              <li v-for="treatment in response.treatments" :key="treatment">{{ treatment }}</li>
            </ul>
          </div>
          <div class="grid_4">
            <h5 class="heading-1">Preventions:</h5>
            <ul class="footer-list" style="height: 100%; overflow-y: auto;">
              <li v-for="prevention in response.preventions" :key="prevention">{{ prevention }}</li>
            </ul>
          </div>
          <div class="grid_4">
            <h5 class="heading-1">Associated Pest:</h5>
            <ul class="footer-list" style="height: 100%; overflow-y: auto;">
              <li v-for="insect in response.associated_insects" :key="insect">{{ insect }}</li>
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Footer/>
  </div>

    </footer>
    <!-- Footer -->
  </div>
</template>

<style lang="scss" scoped>
$b-r: 5px;

/* Plugin Style Start */
.kwt-file {
  max-width: 150px;
  position: absolute;
  top: -20px;
  right: 45px;
}
.kwt-file__drop-area {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  transition: 0.3s;
}
.kwt-file__drop-area.is-active {
  background-color: #d1def0;
}
.kwt-file__choose-file {
  flex-shrink: 0;
  background-color: #1d3557;
  border-radius: 100%;
  margin-right: 10px;
  color: #ffffff;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.kwt-file__choose-file.kwt-file_btn-text {
  border-radius: 4px;
  width: auto;
  height: auto;
  padding: 10px 20px;
  font-size: 14px;
}
.kwt-file__choose-file svg {
  width: 24px;
  height: 24px;
  display: block;
}
.kwt-file__msg {
  color: #1d3557;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.kwt-file__input {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0;
}
.kwt-file__input:focus {
  outline: none;
}
.kwt-file__delete {
  display: none;
  position: absolute;
  right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.kwt-file__delete:before {
  content: "";
  position: absolute;
  left: 0;
  transition: 0.3s;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%231d3557' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 438.5 438.5'%3e%3cpath d='M417.7 75.7A8.9 8.9 0 00411 73H323l-20-47.7c-2.8-7-8-13-15.4-18S272.5 0 264.9 0h-91.3C166 0 158.5 2.5 151 7.4c-7.4 5-12.5 11-15.4 18l-20 47.7H27.4a9 9 0 00-6.6 2.6 9 9 0 00-2.5 6.5v18.3c0 2.7.8 4.8 2.5 6.6a8.9 8.9 0 006.6 2.5h27.4v271.8c0 15.8 4.5 29.3 13.4 40.4a40.2 40.2 0 0032.3 16.7H338c12.6 0 23.4-5.7 32.3-17.2a64.8 64.8 0 0013.4-41V109.6h27.4c2.7 0 4.9-.8 6.6-2.5a8.9 8.9 0 002.6-6.6V82.2a9 9 0 00-2.6-6.5zm-248.4-36a8 8 0 014.9-3.2h90.5a8 8 0 014.8 3.2L283.2 73H155.3l14-33.4zm177.9 340.6a32.4 32.4 0 01-6.2 19.3c-1.4 1.6-2.4 2.4-3 2.4H100.5c-.6 0-1.6-.8-3-2.4a32.5 32.5 0 01-6.1-19.3V109.6h255.8v270.7z'/%3e%3cpath d='M137 347.2h18.3c2.7 0 4.9-.9 6.6-2.6a9 9 0 002.5-6.6V173.6a9 9 0 00-2.5-6.6 8.9 8.9 0 00-6.6-2.6H137c-2.6 0-4.8.9-6.5 2.6a8.9 8.9 0 00-2.6 6.6V338c0 2.7.9 4.9 2.6 6.6a8.9 8.9 0 006.5 2.6zM210.1 347.2h18.3a8.9 8.9 0 009.1-9.1V173.5c0-2.7-.8-4.9-2.5-6.6a8.9 8.9 0 00-6.6-2.6h-18.3a8.9 8.9 0 00-9.1 9.1V338a8.9 8.9 0 009.1 9.1zM283.2 347.2h18.3c2.7 0 4.8-.9 6.6-2.6a8.9 8.9 0 002.5-6.6V173.6c0-2.7-.8-4.9-2.5-6.6a8.9 8.9 0 00-6.6-2.6h-18.3a9 9 0 00-6.6 2.6 8.9 8.9 0 00-2.5 6.6V338a9 9 0 002.5 6.6 9 9 0 006.6 2.6z'/%3e%3c/svg%3e");
}
.kwt-file__delete:after {
  content: "";
  position: absolute;
  opacity: 0;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%) scale(0);
  background-color: #1d3557;
  border-radius: 50%;
  transition: 0.3s;
}
.kwt-file__delete:hover:after {
  transform: translate(-50%, -50%) scale(2.2);
  opacity: 0.1;
}
/* Plugin Style End */

.wrapper {
  overflow: visible;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
.card {
  display: flex;
  flex: 0 0 auto;
  background: #fff;
  max-width: 700px;
  margin: 90px 0 0 0;
  border-radius: $b-r;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.card-pic-wrap {
  border-radius: $b-r 0 0 $b-r;
  width: 300px;
  flex: 0 0 auto;
  position: relative;
  background: linear-gradient(to bottom, #9fd483, #8dc26f);
  img {
    position: absolute;
    bottom: 3em;
    left: 50%;
    max-height: 300px;
    margin-left: -175px;
    width: 100%; /* Make the image fill the container */
    height: 130%; /* Make the image fill the container */
    object-fit: cover; /* Scale the image while maintaining aspect ratio */
    object-position: center; /* Position the image at the center */
    -webkit-box-reflect: below -1px -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(transparent),
        color-stop(90%, transparent),
        to(rgba(250, 250, 250, 0.15))
      );
  }
}
.card-content {
  padding: 3em 4em 2em;
}
h3 {
  font-family: "PT Serif", serif;
  font-weight: bold;
  font-size: 2.5em;
  margin: 0 0 1em;
  // background: #6cc885;
}

@media (max-width: 790px) {
  body {
    overflow-x: hidden;
  }
  .wrap {
    margin-left: 20px;
    margin-right: 20px;
  }
  .card {
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .card-pic-wrap {
    width: 100%;
    border-radius: $b-r $b-r 0 0;
    img {
      bottom: 20px;
      position: relative;
    }
  }
  .card-content {
    padding: 2em 2em 1em;
  }
}
</style>
