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
        <div class="grid_24 content-bg">
          <h2 style="margin-bottom: 3rem;">Predicting Pests or Crops with Image Analysis.</h2>

          <div class="wrapper" >
          <div class="border" style="margin-left: 7rem;">
<div class="frame">
  
  <div class="image" v-if="imageUrl" :style="{ backgroundImage: 'url(' + imageUrl + ')' }" alt="Selected image"></div>
    <div class="image" v-else :style="{ backgroundImage: 'url(' + require('@/assets/corn.png') + ')' }"></div>

</div>
</div>

<div style="display: grid; margin-top: 2rem;">
      <div
        class="circle-container"
        v-for="(result, index) in results"
        :key="index"
        :style="{ marginLeft: index === 1 ? '5rem' : '0' }"
      >
        <div class="outer-circle" :ref="'circle' + index"></div>
        <div class="stat-circle-cover">
          <span class="stat-number" style="font-size: 1rem;">{{ (result.score * 100).toFixed(2) }}%</span>
        </div>
        <!-- Align text at the start -->
        <h2 style="margin-top: 2.5rem; margin-left: 6.5rem; font-size: 1.5rem; width: 250px; text-align: left;">{{ result.label }}</h2>
      </div>



  <div class="pieContainer" v-if="this.results == ''">
  <div class="pieBackground"></div>
  <div id="pieSlice99_1" class="hold">
    <div class="pie"></div>
  </div>
  <div id="pieSlice99_2" class="hold">
    <div class="pie"></div>
  </div>
  <div class="stat-circle-cover">  
    <span class="stat-number">
      1st%
    </span>
  </div>

  <h2 style="margin-top: 3rem; margin-left: 5.9rem; font-size: 1.2rem; width: 200%;">
      1st Name Prediction
    </h2>
</div>



<div class="pieContainer" v-if="this.results == ''" style="margin-left: 5rem;">
  <div class="pieBackground">
  </div>
  <div id="pieSlice75_1" class="hold">
    <div class="pie slice active">
    </div>
  </div>
  <div id="pieSlice75_2" class="hold">
    <div class="pie">
    </div>
  </div>
  <div class="stat-circle-cover">  
      <span class="stat-number">
        2nd%
      </span>
  </div>
  <h2 style="margin-top: 3rem; margin-left: 5.9rem; font-size: 1.2rem;width: 200%">
      2nd Name Prediction
    </h2>
</div>

<div class="pieContainer" v-if="this.results == ''">
  <div class="pieBackground">
  </div>
  <div id="pieSlice50" class="hold">
    <div class="pie">
    </div>
  </div>
  <div class="stat-circle-cover">  
      <span class="stat-number">
        3rd%
      </span>
  </div>
  <h2 style="margin-top: 3rem; margin-left: 5.9rem; font-size: 1.2rem; width: 200%">
      3rd Name Prediction
    </h2>
</div>


</div>










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
  <footer>
    <Footer/>
  </footer>
  <!-- Footer -->
</div>
</template>


<script>
import $ from 'jquery'
import NavBar from '@/components/reusable/NavBar.vue'
import Footer from '@/components/reusable/footer.vue'

export default {
  components: {NavBar, Footer},
    data() {
    return {
      results: [],
      currentPercentage: 0,
      duration: 1000, // milliseconds
      interval: 10, // milliseconds
      loading: false
    };
  },
  mounted() {
    this.results.forEach((result, index) => {
      this.updateCircleFill(result.score * 100, index);
    });
  },
  methods: {
    updateCircleFill(percentage, index) {
      let currentPercentage = 0;
      const increment = (percentage - currentPercentage) / (this.duration / this.interval);

      const timer = setInterval(() => {
        currentPercentage += increment;
        if (currentPercentage >= percentage) {
          clearInterval(timer);
          currentPercentage = percentage;
        }
        const degrees = (currentPercentage / 100) * 360;
        this.$refs['circle' + index][0].style.backgroundImage = `conic-gradient(
          ${this.getColor(currentPercentage)} 0deg ${degrees}deg,
          #ccc ${degrees}deg 360deg
        )`;
      }, this.interval);
    },
    getColor(percentage) {
      if (percentage >= 90) {
        return '#00FF00'; // Excellent (Green)
      } else if (percentage >= 70) {
        return '#66FF66'; // Good (Light Green)
      } else if (percentage >= 50) {
        return '#FFFF00'; // Medium (Yellow)
      } else if (percentage >= 30) {
        return '#FF6600'; // Less Bad (Orange)
      } else {
        return '#FF0000'; // Bad (Red)
      }
    },
    previewImage(event) {
      this.loading = true
      const fileInput = event.target.files[0];
      const form = new FormData();
      form.append("file", fileInput);

      var settings = {
        url: `${this.$url}/identify/crop/pest`,
        method: "POST",
        timeout: 0,
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: form
      };

      $.ajax(settings)
        .done((response) => {
          this.results = JSON.parse(response);
          this.results.forEach((result, index) => {
            this.updateCircleFill(result.score * 100, index);
          });

          // Set imageUrl to the uploaded image URL
          this.imageUrl = URL.createObjectURL(fileInput);
          this.loading = false
        })
        .fail((error) => {
          console.error("Error uploading image:", error);
          alert("Could not process image!")
          this.loading = false
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow: visible;
  position: relative;
  display: flex;
  align-items: start;
  justify-content: start;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
.border{
  box-sizing: border-box;
  position: relative;
  background: black;
  background-image: linear-gradient(to top right, #5D5D5B, #383838);
  padding: 7px;
  width: 400px;
  border-radius: 0 100%  100%;
  height: 350px;
  box-shadow:
    -1px 1px var(--blur) 1px rgba(0,0,0,0.10),
    -2px 2px var(--blur) 1px rgba(0,0,0,0.09),
    -3px 3px var(--blur) 1px rgba(0,0,0,0.08),
    -4px 4px var(--blur) 1px rgba(0,0,0,0.07),
    -5px 5px var(--blur) 1px rgba(0,0,0,0.06),
    -6px 6px var(--blur) 1px rgba(0,0,0,0.05),
    -7px 7px var(--blur) 1px rgba(0,0,0,0.04),
    -8px 8px var(--blur) 1px rgba(0,0,0,0.03),
    -9px 9px var(--blur) 1px rgba(0,0,0,0.03),
    -10px 10px var(--blur) 1px rgba(0,0,0,0.03),
    -11px 11px var(--blur) 1px rgba(0,0,0,0.03),
    -12px 12px var(--blur) 1px rgba(0,0,0,0.02),
    -13px 13px var(--blur) 1px rgba(0,0,0,0.02),
    -14px 14px var(--blur) 1px rgba(0,0,0,0.01),
    -15px 15px var(--blur) 1px rgba(0,0,0,0.01),
    -16px 16px var(--blur) 1px rgba(0,0,0,0.01)
  ;
  &:before{
    content: ' ';
    display: block;
    padding-bottom: 140%;
  }
}

.frame{
  left: 2%;
  top: 2.5%;
  border-radius: 0 100%  100%;
  box-shadow: inset -1px 1px 6px 1px rgba(0,0,0,.24);
  width: 96%;
  height: 95%;
  background: white;
  align-items: center;
  display: flex;
  padding: 5px;
  box-sizing: border-box;
  position: absolute;
}

.image{
  border-radius: 0 100%  100%;
  box-shadow: inset 0 0 1px 0 rgba(0,0,0,.2);
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
}












.pieContainer {
  height: 100px;
  width: 100px;
  position: relative;
  margin-top: 10px;
}

.pieBackground{
  background-color: #333;
  position: absolute;
  height: 100px;
  width: 100px;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  
  -webkit-box-shadow:  0px 0px 5px 1px rgba(0, 0, 0, .75);      
  box-shadow:  0px 0px 5px 1px rgba(0, 0, 0, .75);
}

.stat-circle-cover {
  position: absolute;
  top: 10%;
  right: 10%;
  
  background-color: #333;
  height: 80%;
  width: 80%;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  
  -moz-box-shadow:inset 0px 0px 5px #666;
  -webkit-box-shadow:inset 0px 0px 5px #666;
  box-shadow:inset 0px 0px 1px #666;
}

.stat-circle-cover span.stat-number {
  text-align: center;
  vertical-align: middle;
  width: 100%;
  line-height: 80px;
  color: #f78e1e;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 24px;
  font-family: Helvetica-Neue, Helvetica, arial, verdana, sans-serif;
  font-weight: bold;
}

.pie {
  position: absolute;
  height: 100px;
  width: 100px;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  clip: rect(0px, 50px, 100px, 0px);
}

.hold {
  position: absolute;
  width: 100px;
  height: 100px;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  clip: rect(0px, 100px, 100px, 50px);
}

#pieSlice25 .pie {
  background-color: #56e05d;
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
  
  background-image: -webkit-linear-gradient(top, #62C462, #57A957);
}

#pieSlice50 .pie {
  background-color: #de4028;
 
  transform: rotate(10deg);
  
  
  
}

#pieSlice75_1 .pie {
  background-color: #FBB450;
  -webkit-transform: rotate(50deg);
  -moz-transform: rotate(50deg);
  -o-transform: rotate(50deg);
  transform: rotate(50deg);
}

// #pieSlice75_2 {
//   -webkit-transform:rotate(180deg);
//   -moz-transform:rotate(180deg);
//   -o-transform:rotate(180deg);
//   transform:rotate(180deg);
// }

// #pieSlice75_2 .pie {
//   background-color: #FBB450;
//   -webkit-transform: rotate(90deg);
//   -moz-transform: rotate(90deg);
//   -o-transform: rotate(90deg);
//   transform: rotate(90deg);
// }

#pieSlice99_1 .pie {
  background-color: #3ec435;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
}

#pieSlice99_2 {
  -webkit-transform:rotate(180deg);
  -moz-transform:rotate(180deg);
  -o-transform:rotate(180deg);
  transform:rotate(180deg);
}

#pieSlice99_2 {
  -webkit-transform:rotate(180deg);
  -moz-transform:rotate(180deg);
  -o-transform:rotate(180deg);
  transform:rotate(180deg);
}

#pieSlice99_2 .pie {
  background-color: #35c44f;
  -webkit-transform: rotate(50deg);
  -moz-transform: rotate(50deg);
  -o-transform: rotate(50deg);
  transform: rotate(50deg);
  
}






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




.circle-container {
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
  }

  .outer-circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #ccc;
  }

  .inner-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: rgb(0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
</style>
