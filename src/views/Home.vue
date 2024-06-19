<script>
import NavBar from '@/components/reusable/NavBar.vue'
import Footer from '@/components/reusable/footer.vue'

export default {
  name: "Home",
  components: { NavBar, Footer},
  computed: {

  },
  methods: {

  },
  mounted() {
    // Disable dropdown hover behavior

  }
};
</script>

<template>
  <div class="main-bg">
    <!-- Header -->
    <header>
      <NavBar/>
      <div class="slider-container">
        <div class="mp-slider">
          <ul class="items">
            <li>
              <img src="images/slide-1.jpg" alt="" />
              <div class="banner mp-ban-1">
                <span class="row-1">putting our</span
                ><span class="row-2">heart &amp; soul</span
                ><span class="row-3">into the field</span>
              </div>
            </li>
            <li>
              <img src="images/slide-2.jpg" alt="" />
              <div class="banner mp-ban-2">
                <span class="row-1">we have a strong</span
                ><span class="row-2">agriculture</span
                ><span class="row-3">heritage</span>
              </div>
            </li>
            <li>
              <img src="images/slide-3.jpg" alt="" />
              <div class="banner mp-ban-3">
                <span class="row-1">growing clean</span
                ><span class="row-2">and full of health</span
                ><span class="row-3">products</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <a href="#" class="mp-prev"></a> <a href="#" class="mp-next" style="z-index: 1;"></a>
    </header>
    <!-- Content -->
    <section id="content">
      <div class="container_24">
        <div class="wrapper">
          <div class="content-bg">
            <div class="wrapper">
  <div class="grid_16 suffix_1 prefix_1 alpha" >
    <article class="indent-bot">
      <h2>Explore Farm Products:</h2>
      <div class="wrapper" >
        <div class="grid_4 alpha">
          <img src="images/page1-img1.jpg" class="img-indent-bot" alt="" />
          <dl class="def-list-1">
            <dt><a href="#">Tomatoes</a></dt>
            <dd>
              Discover everything about tomatoes and how to care for them
              effectively to ensure a bountiful harvest.
            </dd>
          </dl>
        </div>
        <div class="grid_4">
          <img src="images/page1-img2.jpg" class="img-indent-bot" alt="" />
          <dl class="def-list-1">
            <dt><a href="#">Indian Eggplant</a></dt>
            <dd>
              Learn all about Indian eggplant varieties and how to combat common
              pests and diseases.
            </dd>
          </dl>
        </div>
        <div class="grid_4">
          <img src="images/page1-img3.jpg" class="img-indent-bot" alt="" />
          <dl class="def-list-1">
            <dt><a href="#">Cabbage</a></dt>
            <dd>
              Explore the world of cabbage cultivation and discover tips for
              optimal growth and disease prevention.
            </dd>
          </dl>
        </div>
        <div class="grid_4 omega">
          <img src="images/page1-img4.jpg" class="img-indent-bot" alt="" />
          <dl class="def-list-1">
            <dt><a href="#">Potatoes</a></dt>
            <dd>
              Enter into the realm of potatoes, from planting to harvesting,
              and learn how to fend off common threats.
            </dd>
          </dl>
        </div>
      </div>
    </article>
  </div>
  <div class="grid_5 suffix_1 omega" style="margin-top: 4rem;">
    <article class="indent-bot-1">
      <h2 class="heading-1">Welcome to AgroPlus!</h2>
      <p class="p1">
        <strong>
          AgroPlus offers invaluable resources for agriculture enthusiasts,
          developed by the talented FOMO.
        </strong>
      </p>
    </article>
  </div>
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

</style>
