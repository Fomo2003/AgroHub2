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

    <!-- The Modal -->
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
          <h2 class="title" style="margin: 0 auto">RESULT</h2>
          <span class="close">&times;</span>
        </div>
        <ul>
          <li
            v-for="(price, index) in resultMarketPrices"
            :key="index"
            class="booking-card"
            :style="{
              backgroundImage: 'url(' + require('@/assets/corn.png') + ')',
            }"
          >
            <div class="informations-container">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <h2 class="title">{{ price.commodity + index }}</h2>
                <span
                  style="margin-left: 3px; font-weight: 500; font-size: 0.7rem"
                  >{{ " (" + price.unit + ")" }}</span
                >
              </div>

              <span
                style="
                  display: flex;
                  margin-left: 25px;
                  margin-bottom: 10px;
                  font-weight: 700;
                  font-size: 1rem;
                "
                >Category: {{ price.category }}
                {{ "(" + price.pricetype + ")" }}</span
              >

              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <span
                  class="price"
                  style="margin-right: 1rem; font-weight: 700; font-size: 1rem"
                >
                  <svg
                    class="icon"
                    style="width: 28px; height: 28px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"
                    /></svg
                  >{{ price.date }}
                </span>
              </div>

              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <span class="price" style="font-weight: 500; font-size: 0.8rem">
                  <svg
                    class="icon"
                    style="width: 25px; height: 25px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7Zm0,9.5a2.5,2.5 0 1,1 0,-5a2.5,2.5 0 0,1 0,5Z"
                    /></svg
                  >{{ price.admin1 + ", " }} {{ price.admin2 + ", " }}
                  {{ price.market }}
                </span>
              </div>

              <div class="more-information">
                <div class="info-and-date-container">
                  <div
                    class="box info"
                    style="
                      display: grid;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <svg
                      class="icon"
                      style="width: 35px; height: 35px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M3,6H21V18H3V6M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M7,8A2,2 0 0,1 5,10V14A2,2 0 0,1 7,16H17A2,2 0 0,1 19,14V10A2,2 0 0,1 17,8H7Z"
                      />
                    </svg>
                    <span style="font-size: 1.2rem; font-weight: 700">
                      {{ price.price + "XAF" }}</span
                    >
                  </div>
                  <div
                    class="box date"
                    style="
                      display: grid;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <svg
                      class="icon"
                      style="width: 35px; height: 35px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M3,6H21V18H3V6M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M7,8A2,2 0 0,1 5,10V14A2,2 0 0,1 7,16H17A2,2 0 0,1 19,14V10A2,2 0 0,1 17,8H7Z"
                      />
                    </svg>
                    <span style="font-size: 1.2rem; font-weight: 700">{{
                      price.usdprice + "$"
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
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
              v-for="pageNumber in searchVisiblePages"
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
    <section id="content">
      <div class="container_24">
        <div class="wrapper">
          <div class="grid_24 content-bg">
            <div class="container">
              <form>
                <div class="wrapper">
                  <div class="search-container">
                    <input
                      type="text"
                      v-model="admin1"
                      class="search"
                      placeholder="Region"
                    />
                    <input
                      type="text"
                      v-model="admin2"
                      class="search"
                      placeholder="Division"
                    />
                    <input
                      type="text"
                      v-model="market"
                      class="search"
                      placeholder="Market"
                    />
                    <input
                      type="text"
                      v-model="commodity"
                      class="search"
                      placeholder="Item"
                    />
                    <button
                      type="button"
                      class="button"
                      @click="searchMarketPrices()"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <ul>
              <li
                v-for="(price, index) in marketPrices"
                :key="index"
                class="booking-card"
                :style="{
                  backgroundImage: 'url(' + require('@/assets/corn.png') + ')',
                }"
              >
                <div class="informations-container">
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <h2 class="title">{{ price.commodity }}</h2>
                    <span
                      style="
                        margin-left: 3px;
                        font-weight: 500;
                        font-size: 0.7rem;
                      "
                      >{{ " (" + price.unit + ")" }}</span
                    >
                  </div>

                  <span
                    style="
                      display: flex;
                      margin-left: 25px;
                      margin-bottom: 10px;
                      font-weight: 700;
                      font-size: 1rem;
                    "
                    >Category: {{ price.category }}
                    {{ "(" + price.pricetype + ")" }}</span
                  >

                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <span
                      class="price"
                      style="
                        margin-right: 1rem;
                        font-weight: 700;
                        font-size: 1rem;
                      "
                    >
                      <svg
                        class="icon"
                        style="width: 28px; height: 28px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"
                        /></svg
                      >{{ price.date }}
                    </span>
                  </div>

                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <span
                      class="price"
                      style="font-weight: 500; font-size: 0.8rem"
                    >
                      <svg
                        class="icon"
                        style="width: 25px; height: 25px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7Zm0,9.5a2.5,2.5 0 1,1 0,-5a2.5,2.5 0 0,1 0,5Z"
                        /></svg
                      >{{ price.admin1 + ", " }} {{ price.admin2 + ", " }}
                      {{ price.market }}
                    </span>
                  </div>

                  <div class="more-information">
                    <div class="info-and-date-container">
                      <div
                        class="box info"
                        style="
                          display: grid;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        <svg
                          class="icon"
                          style="width: 35px; height: 35px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M3,6H21V18H3V6M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M7,8A2,2 0 0,1 5,10V14A2,2 0 0,1 7,16H17A2,2 0 0,1 19,14V10A2,2 0 0,1 17,8H7Z"
                          />
                        </svg>
                        <span style="font-size: 1.2rem; font-weight: 700">
                          {{ price.price + "XAF" }}</span
                        >
                      </div>
                      <div
                        class="box date"
                        style="
                          display: grid;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        <svg
                          class="icon"
                          style="width: 35px; height: 35px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M3,6H21V18H3V6M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M7,8A2,2 0 0,1 5,10V14A2,2 0 0,1 7,16H17A2,2 0 0,1 19,14V10A2,2 0 0,1 17,8H7Z"
                          />
                        </svg>
                        <span style="font-size: 1.2rem; font-weight: 700">{{
                          price.usdprice + "$"
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <nav class="pagination" role="navigation">
              <a
                class="prev_ link"
                @click="prev_Page"
                :class="{ disabled: page === 1 }"
                >Prev</a
              >
              <ol class="link_ol">
                <li
                  class="link_li"
                  v-for="pageNumber in visiblePages"
                  :key="pageNumber"
                  :class="{ active: pageNumber === page }"
                >
                  <a class="link" @click="gotoPage(pageNumber)" href="#">{{
                    pageNumber
                  }}</a>
                </li>
              </ol>
              <a
                class="next_ link"
                @click="next_Page"
                :class="{ disabled: page === totalPages }"
                >Next</a
              >
            </nav>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <Footer/>
    </footer>
  </div>
  <!-- Footer -->
</template>

<script>
import $ from "jquery";
//import Swal from 'sweetalert2'
import NavBar from '@/components/reusable/NavBar.vue'
import Footer from '@/components/reusable/footer.vue'


export default {
  components: { NavBar, Footer},
  data() {
    return {
      marketPrices: [],
      page: 1, // Default page to 1
      totalPages: 0,

      resultMarketPrices: [],
      searchPage: 1, // Default page to 1
      searchTotalPages: 0,

      admin1: "Centre",
      admin2: null,
      market: null,
      commodity: null,

      loading: false,
    };
  },
  computed: {
    visiblePages() {
      const range = 3; // Adjust the range according to your preference
      let start = Math.max(1, this.page - range);
      let end = Math.min(this.totalPages, this.page + range);

      // If the start is more than 2, include 1 and "Prev_"
      if (start > 2) {
        start = Math.max(1, start - 1);
      }

      // If the end is less than total pages - 1, include total pages and "Next_"
      if (end < this.totalPages - 1) {
        end = Math.min(this.totalPages, end + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
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
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };

    this.paginate_prices(); // Fetch market prices when component is mounted
  },
  methods: {
    searchMarketPrices() {
      this.loading = true;
      // Your AJAX request here
      // Modify the URL based on your search criteria
      var settings = {
        url: `${this.$url}/market_prices/?admin1=${this.admin1}&admin2=${this.admin2}&market=${this.market}&commodity=${this.commodity}&page=${this.searchPage}`,
        method: "GET",
        timeout: 0,
      };

      // Use arrow function to maintain 'this' context
      $.ajax(settings)
        .done((response) => {
          // Parse the response
          this.resultMarketPrices = response.market_prices;
          console.log(response);

          // Check if market_prices is not empty
          if (this.resultMarketPrices && this.resultMarketPrices.length > 0) {
            console.log(response);
            this.resultMarketPrices = response.market_prices;
            this.searchPage = response.page;
            this.searchTotalPages = response.total_pages;
            // Show the modal after fetching data
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            this.loading = false;
          } else {
            // Handle case when market_prices is empty
            alert("No market prices found.");
            this.loading = false; // Set loading to false even if there's no data
          }
        })
        .fail((xhr, status, error) => {
          console.error("Failed to fetch market prices:", error);
          this.loading = false;
        });
    },
    search_gotoPage(pageNumber) {
      if (pageNumber !== this.searchPage) {
        this.searchPage = pageNumber;
        this.searchMarketPrices();
      }
    },
    search_next_Page() {
      if (this.searchPage < this.searchTotalPages) {
        this.searchPage++;
        this.searchMarketPrices();
      }
    },
    search_prev_Page() {
      if (this.searchPage > 1) {
        this.searchPage--;
        this.searchMarketPrices();
      }
    },
    paginate_prices() {
      this.loading = true;
      var form = new FormData();
      var settings = {
        url: `${this.$url}/market/prices/paginate?page=${this.page}`,
        method: "GET",
        timeout: 0,
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: form,
      };

      // Arrow function preserves the context of 'this'
      $.ajax(settings)
        .done((response) => {
          this.marketPrices = JSON.parse(response).market_prices;
          this.page = JSON.parse(response).page;
          this.totalPages = JSON.parse(response).total_pages;
          this.loading = false;
        })
        .fail((xhr, status, error) => {
          console.error("Failed to fetch market prices:", error);
          this.loading = false;
        });
    },
    gotoPage(pageNumber) {
      if (pageNumber !== this.page) {
        this.page = pageNumber;
        this.paginate_prices();
      }
    },
    next_Page() {
      if (this.page < this.totalPages) {
        this.page++;
        this.paginate_prices();
      }
    },
    prev_Page() {
      if (this.page > 1) {
        this.page--;
        this.paginate_prices();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
@media (min-width: 768px) {
  li {
    &:first-child,
    &.active-sibling,
    &.active,
    &.active + li,
    &:last-child {
      display: inline-block !important;
    }

    // There are >= 7 pages
    &:first-child:nth-last-child(n + 8) {
      $how-many-on-ends: 5; // 1,2,3,4,5,...,10 || 1,...6,7,8,9,10

      & ~ li {
        // Start out with all siblings hidden
        display: none;

        // Show ellipsis before the prev_ious one
        &.active-sibling:before {
          @include ellipsis(true);
        }
        // Show ellipsis after the next_ one
        &.active + li:after {
          @include ellipsis(false);
        }

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
        &:nth-child(-n+#{$how-many-on-ends - 3}),
        // The very end elements do not need to show ellipsis
        &:nth-last-child(-n+#{$how-many-on-ends - 3}),
        // Even if it's a sibling to "active"
        &.active-sibling:nth-last-child(-n+#{$how-many-on-ends - 1}) {
          &:before,
          &:after {
            display: none !important;
          }
        }
      }

      &.active,
      & ~ li.active {
        // Hide the last group if "active" comes before them
        & ~ li:nth-last-child(-n + #{$how-many-on-ends}) {
          display: none;

          // If there is overlap, the element will show, but hide it's ellipsis
          &:before {
            display: none;
          }
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

        // "active" should never show ellipsis
        &:before,
        &:after {
          display: none;
        }
      }
    }
  }
}

$font: "Sofia", sans-serif;
$font-size: 16px;
$blue: #0a4870;
$blue2: #e3ebf1;
$black: #000;
$grey: #7d7d7d;
$grey2: #f0f0f0;
$grey3: #e8e7e7;
$grey4: #fdfdfd;
$bluegrey: #49606e;
$orange: #ec992c;

@mixin radius($val) {
  -webkit-border-radius: $val;
  -moz-border-radius: $val;
  border-radius: $val;
}

@mixin cardsOpen() {
  &::before {
    background: rgba(10, 72, 112, 0.6);
  }
  .book-container {
    .content {
      opacity: 1;

      transform: translateY(0px);
    }
  }

  .informations-container {
    transform: translateY(0px);
    .more-information {
      opacity: 1;
    }
  }
}

.wrapper {
  overflow: visible;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

h2 {
  color: #0a4870;
  font-weight: 500;
}

ul {
  display: flex;
  flex-wrap: wrap;

  list-style: none;
  padding: 0;

  .booking-card {
    position: relative;
    width: 100px;
    display: flex;
    flex: 0 0 300px;
    flex-direction: column;

    margin: 0px 0px 0 12px;
    margin-bottom: 30px;
    @include radius(10px);

    overflow: hidden;

    background-position: center center;
    background-size: cover;

    text-align: center;
    color: $blue;

    transition: 0.3s;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      background: rgba(10, 72, 112, 0);

      transition: 0.3s;
    }

    .book-container {
      height: 10px;
      .content {
        position: relative;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;

        transform: translateY(-200px);

        transition: 0.3s;

        .btn {
          border: 3px solid white;
          padding: 10px 15px;

          background: none;

          text-transform: uppercase;
          font-weight: bold;
          font-size: 1.3em;
          color: white;

          cursor: pointer;

          transition: 0.3s;

          &:hover {
            background: white;

            border: 0px solid white;

            color: $blue;
          }
        }
      }
    }

    .informations-container {
      flex: 1 0 auto;

      padding: 10px;

      background: $grey2;
      border-radius: 10px 10px;

      transform: translateY(100px);

      transition: 0.3s;

      .title {
        position: relative;
        font-weight: bold;
        font-size: 1.8em;

        &::after {
          content: "";

          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;

          height: 3px;
          width: 50px;

          margin: 0 auto 0.8rem auto;

          background: $blue;
        }
      }

      .price {
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          margin-right: 10px;
        }
      }

      .more-information {
        opacity: 0;

        transition: 0.3s;
        .info-and-date-container {
          display: flex;

          .box {
            flex: 1 0;

            padding: 15px;
            margin-top: 20px;
            @include radius(10px);

            background: white;

            font-weight: bold;
            font-size: 0.9em;

            .icon {
              margin-bottom: 5px;
            }

            &.info {
              color: $orange;

              margin-right: 10px;
            }
          }
        }
        .disclaimer {
          margin-top: 20px;

          font-size: 0.8em;
          color: $grey;
        }
      }
    }

    &:hover {
      @include cardsOpen();
    }
  }
}

@media (max-width: 768px) {
  ul {
    .booking-card {
      @include cardsOpen();
    }
  }
}

.credits {
  display: table;
  background: $blue;
  color: white;
  line-height: 25px;

  margin: 10px auto;
  padding: 20px;

  @include radius(10px);

  text-align: center;

  a {
    color: $blue2;
  }
}

h1 {
  margin: 10px 20px;
}
</style>
