<template>
  <main id="app">
    <section class="app-wrap">
      <Details
        :product="selectedProduct"
        :show="isModalVisible"
        @close-modal="hideModal"
        @add-to-cart="updateCart"
      />
      <div class="app-header">
        <div class="logo" />
        <div class="cart-container">
          <Icon name="cart"></Icon>
          <div v-if="cart > 0" class="cart-total">
            <div class="cart-num">{{ cart }}</div>
          </div>
        </div>
      </div>
      <div class="collection-list">
        <Products
          v-for="product in products"
          :key="product.id"
          :product="product"
          @open-modal="showModal"
        />
      </div>
    </section>
  </main>
</template>

<script>
import "./assets/App.css";
import productData from "../catalog.json";
import Products from "./components/Products.vue";
import Details from "./components/Details.vue";
import Icon from "./components/Icon.vue";

export default {
  name: "App",
  components: { Products, Details, Icon },
  data() {
    return {
      products: productData.products,
      selectedProduct: productData.products[0],
      cart: 0,
      isModalVisible: false,
    };
  },
  methods: {
    showModal(product) {
      this.selectedProduct = product;
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    updateCart(quan) {
      this.cart += quan;
      this.isModalVisible = false;
    },
  },
};
</script>

<style></style>
