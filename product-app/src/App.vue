<template>
  <main id="app">
    <section class="app-wrap">
      <Details
        :products="products"
        :product="selectedProduct"
        :show="isModalVisible"
        :favorites="favorites"
        @close-modal="hideModal"
        @add-to-cart="updateCart"
        @adjust-favorites="adjustFavorites"
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
          :favorites="favorites"
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
      favorites: new Set(),
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
    adjustFavorites(id) {
      const index = this.products.findIndex((ele) => ele.id === id);
      if (this.products[index].favorite) {
        let newData = [...this.products];
        newData[index] = { ...newData[index], favorite: false };
        this.products = newData;
      } else {
        let newData = [...this.products];
        newData[index] = { ...newData[index], favorite: true };
        this.products = newData;
      }
    },
  },
};
</script>

<style></style>
