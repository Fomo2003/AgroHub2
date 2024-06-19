<script>
import $ from "jquery";
import NavBar from '@/components/reusable/NavBar.vue'
import Footer from '@/components/reusable/footer.vue'

export default {
  name: "weather_forcast",
  data: () => ({
    cityInputValue: "", // Holds the value of the city input field
    currentWeather: {}, // Holds the data for current weather
    fiveDaysForecast: [], // Holds the data for 5-day forecast
    loading: false,

    fiveDaysPaginate: [],
    searchPage: 1, // Default page to 1
    searchTotalPages: 4,
    visiblePageNumbers: [], // Array to store visible page numbers
    totalPages: 4, //
    spinner1: false,
    spinner: false
  }),
  components: {NavBar, Footer},
  computed: {
    searchVisiblePages() {
      const range = 3; // Adjust the range according to your preference
      let start = Math.max(1, this.searchPage - range);
      let end = Math.min(this.searchTotalPages, this.searchPage + range);

      // If the start is more than 2, include 1 and "Prev_"
      if (start > 2) {
        start = Math.max(1, start - 1);
      }

      // If the end is less than total pages - 1, include total pages and "Next_"
      if (end < this.searchTotalPages - 1) {
        end = Math.min(this.searchTotalPages, end + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
  },
  mounted() {
    this.updateVisiblePages();
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
      window.location.reload();
    };
  },
  methods: {
    openModal() {
      // No need for DOM manipulation here
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
    },
    search_prev_Page() {
      if (this.searchPage > 1) {
        this.searchPage--;
        this.fetchWeather5days(this.city, this.searchPage);
        this.updateVisiblePages();
      }
    },
    search_next_Page() {
      if (this.searchPage < this.totalPages) {
        this.searchPage++;
        this.fetchWeather5days(this.city, this.searchPage);
        this.updateVisiblePages();
      }
    },
    search_gotoPage(pageNumber) {
      this.searchPage = pageNumber;
      this.fetchWeather5days(this.city, this.searchPage);
      this.updateVisiblePages();
    },
    updateVisiblePages() {
      const currentPage = this.searchPage;
      if (currentPage === 1) {
        // If on first page, display page numbers 1 through 4
        this.visiblePageNumbers = [1, 2, 3, 4];
      } else {
        // Display current page and three previous pages
        this.visiblePageNumbers = [currentPage - 1, currentPage];
        if (currentPage < this.totalPages) {
          // Add next page if not on the last page
          this.visiblePageNumbers.push(currentPage + 1);
        }
      }
    },
    // Method to fetch weather data for a specific page
    fetchWeather5days(city, page) {
      this.loading = true;
      var settings = {
        url: `${this.$url}/weather/paginate?city=${city}&day=${page}`,
        method: "GET",
        timeout: 0,
      };

      $.ajax(settings).done((response) => {
        this.fiveDaysPaginate = response.map((forecast5) => ({
          date: forecast5.date,
          temperature: forecast5.temp,
          windSpeed: forecast5.wind_speed,
          humidity: forecast5.humidity,
          icon: forecast5.icon,
        }));
        console.log("Response: ", this.fiveDaysPaginate);
        this.loading = false;
      }).fail((jqXHR, textStatus, errorThrown) => {
          console.error("Login request failed:", textStatus, errorThrown);
          alert("Request failed!")
          this.loading = false
        });
    },
    fetchWeatherData(city) {
      this.loading = true;
      const API_KEY = "2606f769271b8d545fe3458b2b72ed9f";

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Update current weather data
          this.currentWeather = {
            cityName: city,
            date: data.list[0].dt_txt.split(" ")[0],
            temperature: (data.list[0].main.temp - 273.15).toFixed(2),
            windSpeed: data.list[0].wind.speed,
            humidity: data.list[0].main.humidity,
            icon: data.list[0].weather[0].icon,
            description: data.list[0].weather[0].description,
          };

          // Update 5-day forecast data
          this.fiveDaysForecast = data.list.slice(1, 6).map((forecast) => ({
            date: forecast.dt_txt,
            temperature: (forecast.main.temp - 273.15).toFixed(2),
            windSpeed: forecast.wind.speed,
            humidity: forecast.main.humidity,
            icon: forecast.weather[0].icon,
          }));
          console.log("sssssssssssssssss", this.fiveDaysForecast);

          this.loading = false;

          this.spinner = false;
          this.spinner1 = false;
        })
        .catch(() => {
          alert("An error occurred while fetching the weather forecast!");
          this.loading = false;
          this.spinner = false;
          this.spinner1 = false;
        });
    },
    // Method to handle click event on search button
    searchWeather() {
      if(this.cityInputValue === ''){
        alert("Please enter a City")
      }else{
        this.spinner = true
        this.loading = true;
        const city = this.cityInputValue.trim();
        if (!city) return;
        this.city = city;
        this.fetchWeatherData(city);
        this.fetchWeather5days(city, 1);
        // this.spinner = false;
      }
    },
    // Method to handle click event on location button
    useCurrentLocation() {
      this.loading = true;
      this.spinner1 = true
      const API_KEY = "2606f769271b8d545fe3458b2b72ed9f";
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
          )
            .then((response) => response.json())
            .then((data) => {
              const city = data[0].name;
              this.city = city;
              this.fetchWeatherData(city);
              this.fetchWeather5days(city, 1);
            })
            .catch(() => {
              alert("An error occurred while fetching the city name!");
              this.loading = false;
            });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert(
              "Geolocation request denied. Please reset location permission to grant access again."
            );
            this.loading = false;
            this.spinner1 = false;


          } else {
            alert(
              "Geolocation request error. Please reset location permission."
            );
            this.loading = false;
            this.spinner1 = false;

          }
        }
      );
    },
  },
};
</script>
<template>
  <div class="main-bg" >
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

    <div id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <span class="close">&times;</span>
        </div>
        <div class="days-forecast-forcast">
          <h2>Weather Forcast For The Next 4Days</h2>
          <ul
            class="weather-card-weather-forcast"
            style="display: flex; flex-wrap: wrap"
          >
            <li
              class="card-weather-forcast"
              v-for="(forecast5, index) in fiveDaysPaginate"
              :key="index"
              style="
                width: 20%;
                margin-bottom: 20px;
                padding: 10px;
                border-radius: 5px;
              "
            >
              <h2>{{ forecast5.date }}</h2>
              <img :src="forecast5.icon" style="width: 50px" />
              <h6>Temp: {{ forecast5.temperature }}</h6>
              <h6>Wind: {{ forecast5.windSpeed }}</h6>
              <h6>Humidity: {{ forecast5.humidity }}</h6>
            </li>
          </ul>

          <div class="button-container"></div>
        </div>
        <nav class="pagination" role="navigation">
          <a
            class="prev_ link"
            @click="search_prev_Page"
            :class="{ disabled: searchPage === 1 }"
            >Prev</a
          >
          <ol class="link_ol">
            <li
              class="link_li"
              v-for="pageNumber in visiblePageNumbers"
              :key="pageNumber"
              :class="{ active: pageNumber === searchPage }"
            >
              <a class="link" @click="search_gotoPage(pageNumber)" href="#">{{
                pageNumber
              }}</a>
            </li>
          </ol>
          <a
            class="next_ link"
            @click="search_next_Page"
            :class="{ disabled: searchPage === searchTotalPages }"
            >Next</a
          >
        </nav>
      </div>
    </div>
    <!-- Header -->
    <header>
      <NavBar/>
    </header>
    <!-- Content -->
    <section id="content" >
      <div class="container_24">
        <div class="wrapper">
          <div class="grid_24 content-bg">
            <div  >
              <article class="grid_22 suffix_1 prefix_1 alpha omega" >
                <div style="display: grid ;" >
                  <h3>Enter a city name or use current location</h3>

                  <div class="container-forcast" style="  width: 95%;">
                    <div class="weather-input-forcast">
                      <input
                        v-model="cityInputValue"
                        type="text"
                        placeholder="E.g., New York, London, Tokyo"
                      />
                      <button class="button1" @click="searchWeather">Search <i v-if="spinner" class="fa fa-circle-o-notch fa-spin" style="font-size:18px"></i></button>
                      <div class="separator-forcast"></div>
                      <button class="button1" @click="useCurrentLocation">
                        Use Current Location <i v-if="spinner1" class="fa fa-circle-o-notch fa-spin" style="font-size:18px"></i>
                      </button>
                    </div>

                    <div class="weather-data-forcast">
                      <div class="current-weather-forcast">
                        <div class="details-forcast">
                          <h1>
                            {{ currentWeather.cityName }} ({{
                              currentWeather.date
                            }})
                          </h1>
                          <h5>
                            Temperature: {{ currentWeather.temperature }}°C
                          </h5>
                          <h5>Wind: {{ currentWeather.windSpeed }} M/S</h5>
                          <h5>Humidity: {{ currentWeather.humidity }}%</h5>
                        </div>
                        <div class="icon">
                          <img
                            style="width: 200px; height: 150px"
                            v-if="currentWeather.icon"
                            :src="`https://openweathermap.org/img/wn/${currentWeather.icon}.png`"
                            alt="weather-icon"
                          />
                          <img
                            v-else
                            src="@/assets/images/default_cloud.png"
                            alt="default-weather-icon"
                          />
                          <h6>{{ currentWeather.description }}</h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="days-forecast-forcast" style="  width: 95%;">
                    <h2>Weather condition for the rest of today</h2>
                    <ul class="weather-card-weather-forcast">
                      <li
                        class="card-weather-forcast"
                        v-for="(forecast, index) in fiveDaysForecast"
                        :key="index"
                      >
                        <h2 style="font-size: 1.3rem;">{{ forecast.date }}</h2>
                        <img
                          :src="
                            'https://openweathermap.org/img/wn/' +
                            forecast.icon +
                            '.png'
                          "
                          alt="weather-icon"
                        />
                        <h6>Temp: {{ forecast.temperature }}°C</h6>
                        <h6>Wind: {{ forecast.windSpeed }} M/S</h6>
                        <h6>Humidity: {{ forecast.humidity }}%</h6>
                      </li>
                    </ul>
                    <div class="button-container">
                      <a
                        v-if="fiveDaysPaginate && fiveDaysPaginate.length > 0"
                        @click="openModal()"
                        href="#"
                        class="view_button"
                        ><span>Next 4Days</span></a
                      >
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
/* Import Google font - Open Sans */

@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

@import url(https://fonts.googleapis.com/css?family=Changa+One);
$font: "Changa One", arial, serif;

/* The Modal (background) */
.modal {
  display: none;
  position: fixed; /* Stay in place */
  z-index: 200; /* Sit on top */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); /* Center the modal */
  width: 80%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.71); /* Black with opacity */
  padding-top: 50px; /* Add small margin at the top */
}

/* The Modal Content/Box */
.modal-content {
  background-color: #a1a1a1;
  margin: 0 auto; /* Center horizontally */
  padding: 20px;
  border: 1px solid #000000;
  width: 80%; /* Could be more or less, depending on screen size */
  max-height: 90%; /* Set a maximum height to allow scrolling if needed */
  overflow-y: auto; /* Enable vertical scrolling if content exceeds the height */
}

/* The Close Button */
.close {
  color: #000000;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

///////// BEGIN: For demo only

.container {
  width: 852px;
  background: #ccc;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 16px;
}
.search-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: stretch;
  align-items: flex-start;
}

input {
  min-width: 170px;
  padding: 8px;
  margin: 0 4px 0 0;
  border: 1px solid #666;
  border-radius: 5px;
  height: 30px;
}

.button {
  padding: 8px 16px;
  min-height: 48px;
  min-width: 10px;
  word-wrap: nowrap;
  background: #000;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s; /* Adding transition for smooth color change */
}

/* Hover effect */
.button:hover {
  background-color: #555; /* Change background color on hover */
}
input {
  order: 0;
  align-self: auto;
}

.search {
  flex: 2 1 auto;
}

.date-from {
  flex: 1 1 auto;
}

.date-to {
  flex: 1 1 auto;
}

.button {
  order: 4;
  flex: 0 1 auto;
  align-self: auto;
}

/* 

input {

  order: 0;
  flex: 1 1 auto;
  align-self: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  border: 1px solid #A9A9A9;
  border-radius: 3px;
  height: 50px;
  
}
 */

/* 
.flex-item:nth-child(1) {
    -webkit-order: 0;
    -ms-flex-order: 0;
    order: 0;
    -webkit-flex: 2 1 auto;
    -ms-flex: 2 1 auto;
    flex: 2 1 auto;
    -webkit-align-self: auto;
    -ms-flex-item-align: auto;
    align-self: auto;
    }

.flex-item:nth-child(2) {
    -webkit-order: 0;
    -ms-flex-order: 0;
    order: 0;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-align-self: auto;
    -ms-flex-item-align: auto;
    align-self: auto;
    }

.flex-item:nth-child(3) {
    -webkit-order: 0;
    -ms-flex-order: 0;
    order: 0;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-align-self: auto;
    -ms-flex-item-align: auto;
    align-self: auto;
    }

.flex-item:nth-child(4) {
    -webkit-order: 0;
    -ms-flex-order: 0;
    order: 0;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-align-self: auto;
    -ms-flex-item-align: auto;
    align-self: auto;
    }
 */

.pagination {
  margin: 20px 0 0;
  font-size: 0;
  text-align: center;
}
.link {
  text-decoration: none;
  color: #000;
  display: inline-block;
  background: #ccc;
  border: 1px solid #000;
  border-radius: 3px;
  padding: 5px 10px;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
}
.link_ol {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: inline-block;
}
.link_li {
  display: inline-block;
  margin: 0 2.5px;

  &.active {
    a {
      background: #50a1f2;

      &:hover {
        text-decoration: none;
        cursor: default;
      }
    }
  }
}

.prev_,
.next_ {
  &.disabled {
    cursor: default;
    background: #ccc;
    color: #888;
    border-color: #888;

    &:hover {
      cursor: default;
      text-decoration: none;
    }
  }
}
.prev_ {
  margin-right: 2.5px;
}
.next_ {
  margin-left: 2.5px;
}
///////// END: For demo only

@mixin ellipsis($before: true) {
  content: "\2026";
  font-size: 24px;
  display: inline-block;
  @if ($before) {
    margin-right: 2.5px;
  } @else {
    margin-left: 2.5px;
  }
}

// Too much to override, just do the difference
@media (max-width: 767px) {
  li {
    &:first-child,
    &.active,
    &.active-sibling:nth-last-child(2), // Show second to last child if the last one is active
    &:last-child {
      display: inline-block !important;
    }

    $how-many-on-ends: 3; // 1,2,3,...,10 || 1,...,8,9,10
    // There are >= 5 pages
    &:first-child:nth-last-child(n + 6) {
      & ~ li {
        // Start out with all siblings hidden
        display: none;

        // Show the last children in the list by default
        &:nth-last-child(-n + #{$how-many-on-ends}) {
          display: inline-block;
        }

        // The child at the beginning of the last group shows ellipsis for the group
        &:nth-last-child(#{$how-many-on-ends}) {
          &:before {
            @include ellipsis(true);
          }
        }

        // The very beginning elements do not need to show ellipsis
        // The very end elements do not need to show ellipsis
      }

      &.active,
      & ~ li.active {
        // Show ellipsis before and after the active element
        &:before {
          @include ellipsis(true);
        }
        &:after {
          @include ellipsis(false);
        }

        // If the active element is in the first or last group, don't show ellipsis (siblings will take care of it)
        &:nth-child(-n + #{$how-many-on-ends - 1}),
        &:nth-last-child(-n + #{$how-many-on-ends - 1}) {
          &:before,
          &:after {
            display: none;
          }
        }

        // Hide the last group if "active" comes before them
        & ~ li:nth-last-child(-n + #{$how-many-on-ends}) {
          display: none;
        }

        // Show the first group together if "active" comes before them
        & ~ li:nth-child(-n + #{$how-many-on-ends}) {
          display: inline-block;
        }

        // If "active" is before the last member in the group, don't show ellipsis
        & ~ li:nth-child(-n + #{$how-many-on-ends - 1}) {
          &:after {
            display: none;
          }
        }

        // The child at the end of the first group shows ellipsis for the group
        & ~ li:nth-child(#{$how-many-on-ends}) {
          &:after {
            @include ellipsis(false);
          }
        }
      }
    }
  }
}
// @media (min-width: 768px) {
//   li {
//     &:first-child,
//     &.active-sibling,
//     &.active,
//     &.active + li,
//     &:last-child {
//       display: inline-block !important;
//     }

//     // There are >= 7 pages
//     &:first-child:nth-last-child(n + 8) {
//       $how-many-on-ends: 5; // 1,2,3,4,5,...,10 || 1,...6,7,8,9,10

//       & ~ li {
//         // Start out with all siblings hidden
//         display: none;

//         // Show ellipsis before the prev_ious one
//         &.active-sibling:before {
//           @include ellipsis(true);
//         }
//         // Show ellipsis after the next_ one
//         &.active + li:after {
//           @include ellipsis(false);
//         }

//         // Show the last children in the list by default
//         &:nth-last-child(-n + #{$how-many-on-ends}) {
//           display: inline-block;
//         }

//         // The child at the beginning of the last group shows ellipsis for the group
//         &:nth-last-child(#{$how-many-on-ends}) {
//           &:before {
//             @include ellipsis(true);
//           }
//         }

//         // The very beginning elements do not need to show ellipsis
//         &:nth-child(-n+#{$how-many-on-ends - 3}),
//         // The very end elements do not need to show ellipsis
//         &:nth-last-child(-n+#{$how-many-on-ends - 3}),
//         // Even if it's a sibling to "active"
//         &.active-sibling:nth-last-child(-n+#{$how-many-on-ends - 1}) {
//           &:before,
//           &:after {
//             display: none !important;
//           }
//         }
//       }

//       &.active,
//       & ~ li.active {
//         // Hide the last group if "active" comes before them
//         & ~ li:nth-last-child(-n + #{$how-many-on-ends}) {
//           display: none;

//           // If there is overlap, the element will show, but hide it's ellipsis
//           &:before {
//             display: none;
//           }
//         }

//         // Show the first group together if "active" comes before them
//         & ~ li:nth-child(-n + #{$how-many-on-ends}) {
//           display: inline-block;
//         }

//         // If "active" is before the last member in the group, don't show ellipsis
//         & ~ li:nth-child(-n + #{$how-many-on-ends - 1}) {
//           &:after {
//             display: none;
//           }
//         }

//         // The child at the end of the first group shows ellipsis for the group
//         & ~ li:nth-child(#{$how-many-on-ends}) {
//           &:after {
//             @include ellipsis(false);
//           }
//         }

//         // "active" should never show ellipsis
//         &:before,
//         &:after {
//           display: none;
//         }
//       }
//     }
//   }
// }

$button: #008152;
$button-dark: $button / 1.125;
$button-shadow: $button / 1.75;

.button-container {
  display: flex;
  justify-content: flex-end;
}

.view_button span {
  margin-top: 1rem;
  display: inline-block;
  font-size: 1.6em;
  font-family: $font;
  padding: 0.625em 1em;
  background: $button;
  background-image: linear-gradient($button, $button-dark);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  text-shadow: 0 -1px 1px rgba(7, 51, 34, 0.8);
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
}

.view_button {
  display: inline-block;
  color: #eff6ec;
  text-decoration: none;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 8px 0 $button-shadow, 0 10px 15px rgba(0, 0, 0, 0.35);
  transition: box-shadow 0.2s ease-in-out;
}

.view_button:active span {
  transform: translateY(4px);
}

h1 {
  font-size: 1.75rem;
  text-align: center;
  padding: 18px 0;
  color: #fff;
  font-family: "Roboto", sans-serif;
}
.container-forcast {
  display: flex;
  gap: 50px;
}
.weather-input-forcast {
  width: 500px;
}
.weather-input-forcast input {
  height: 46px;
  width: 100%;
  outline: none;
  font-size: 1.07rem;
  padding: 0 17px;
  margin: 10px 0 20px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.weather-input-forcast input:focus {
  padding: 0 16px;
  border: 2px solid #5372f0;
}
.weather-input-forcast .separator-forcast {
  height: 1px;
  width: 100%;
  margin: 25px 1rem;
  background: #bbbbbb;
  display: flex;
  align-items: center;
  justify-content: center;
}
.weather-input-forcast .separator-forcast::before {
  content: "or";
  color: #6c757d;
  font-size: 1.18rem;
  padding: 0 15px;
  margin-top: -4px;
  background: #e3f2fd;
}

.weather-input-forcast .button1 {
  width: 110%;
  padding: 10px 0;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;
  background: #5372f0;
  transition: 0.2s ease;
}

.button1:active {
  transform: scale(0.95);
}

.button1:focus {
  outline: none;
}

.button1.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

.weather-input-forcast .search-btn:hover {
  background: #91939e;
}
.weather-input-forcast .location-btn {
  background: #6c757d;
}
.weather-input-forcast .location-btn:hover {
  background: #5c636a;
}
.weather-data-forcast {
  width: 100%;
}
.weather-data-forcast .current-weather-forcast {
  color: #fff;
  background: #5372f0;
  border-radius: 5px;
  padding: 20px 70px 20px 20px;
  display: flex;
  justify-content: space-between;

}
.current-weather-forcast h2 {
  font-weight: 700;
  font-size: 1.7rem;
}
.weather-data-forcast h6 {
  margin-top: 12px;
  font-size: 1rem;
  font-weight: 500;
}
.current-weather-forcast .icon {
  text-align: center;
}
.current-weather-forcast .icon img {
  max-width: 120px;
  margin-top: -15px;
}
.current-weather-forcast .icon h6 {
  margin-top: -10px;
  text-transform: capitalize;
}
.days-forecast-forcast h2 {
  font-size: 1.5rem;
  margin-top: 1.5rem;
}
.days-forecast-forcast .weather-card-weather-forcast {
  display: flex;
  gap: 20px;
}
.weather-card-weather-forcast .card-weather-forcast {
  color: #fff;
  padding: 18px 16px;
  list-style: none;
  width: calc(100% / 3);
  background: #6c757d;
  border-radius: 5px;
}
.weather-card-weather-forcast .card-weather-forcast h3 {
  font-size: 1.3rem;
  font-weight: 600;
}
.weather-card-weather-forcast .card-weather-forcast img {
  max-width: 70px;
  margin: 5px 0 -12px 0;
}

@media (max-width: 1400px) {
  .weather-data-forcast .current-weather-forcast {
    padding: 20px;
  }
  .weather-card-weather-forcast {
    flex-wrap: wrap;
  }
  .weather-card-weather-forcast .card-weather-forcast {
    width: calc(100% / 4 - 15px);
  }
}
@media (max-width: 1200px) {
  .weather-card-weather-forcast .card-weather-forcast {
    width: calc(100% / 3 - 15px);
  }
}
@media (max-width: 950px) {
  .weather-input-forcast {
    width: 450px;
  }
  .weather-card-weather-forcast .card-weather-forcast {
    width: calc(100% / 2 - 10px);
  }
}
@media (max-width: 750px) {
  h1 {
    font-size: 1.45rem;
    padding: 16px 0;
  }
  .container-forcast {
    flex-wrap: wrap;
    padding: 15px;
  }
  .weather-input-forcast {
    width: 100%;
  }
  .weather-data-forcast h2 {
    font-size: 1.35rem;
  }
}
</style>
