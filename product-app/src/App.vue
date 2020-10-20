<template>
  <main id="app">
    <section class="products">
      <Products />
    </section>
  </main>
</template>

<script>
import productData from "../catalog.json";
import Products from "./components/Products.vue";
export default {
  name: "App",
  components: { Products },
  data() {
    return {
      products: productData.products,
    };
  },
};
</script>

<style></style>
