<template>
  <main id="app">
    <section class="app-wrap">
      <div class="app-header">
        <div class="logo" />
        <div class="cart-container">
          <Icon name="cart"></Icon>
          <div v-if="cart > 1" class="cart-total">
            <div class="cart-num">{{ cart }}</div>
          </div>
        </div>
      </div>
      <div class="collection-list">
        <Products
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </main>
</template>

<script>
import "./assets/App.css";
import productData from "../catalog.json";
import Products from "./components/Products.vue";
import Icon from "./components/Icon.vue";

export default {
  name: "App",
  components: { Products, Icon },
  data() {
    return {
      products: productData.products,
      cart: 0,
    };
  },
};
</script>

<style></style>
