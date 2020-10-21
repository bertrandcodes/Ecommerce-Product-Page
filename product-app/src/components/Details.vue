<template>
  <div v-if="!show" class="modal">
    <div class="detail-image-container">
      <img
        class="detail-image"
        :src="product.previewImage"
        :alt="product.title"
      />
      <div @click="toggleHeart" class="heart-div"></div>
      <Icon v-if="getFavorite" name="filled" class="filled"></Icon>
      <Icon v-else name="unfilled" class="unfilled"></Icon>
      <div @click="closeModal" class="cancel-div"></div>
      <Icon name="cancel" class="cancel"> </Icon>
    </div>
    <div class="detail-body">
      <div class="detail-tags">
        <div
          v-for="tag in product.tags"
          :key="tag[0]"
          class="detail-tag"
          :class="getColor"
        >
          {{ tag.toUpperCase() }}
        </div>
      </div>
      <div class="detail-brand">{{ product.brand.toUpperCase() }}</div>
      <div class="detail-title">{{ product.title }}</div>
      <div class="detail-prices">
        <div class="detail-sale">
          {{ currentPrice }}
        </div>
        <div class="detail-original">{{ retailValue }}</div>
        <div class="detail-deal">{{ percentOff }}</div>
      </div>
      <div v-html="product.description" class="detail-description"></div>
    </div>
  </div>

  <div v-else class="modal open">
    <div class="detail-image-container">
      <img
        class="detail-image"
        :src="product.previewImage"
        :alt="product.title"
      />
      <div @click="toggleHeart" class="heart-div"></div>
      <Icon v-if="getFavorite" name="filled" class="filled"></Icon>
      <Icon v-else name="unfilled" class="unfilled"></Icon>
      <div @click="closeModal" class="cancel-div"></div>
      <Icon name="cancel" class="cancel"> </Icon>
    </div>
    <div class="detail-body">
      <div class="detail-tags">
        <div
          v-for="tag in product.tags"
          :key="tag[0]"
          class="detail-tag"
          :class="getColor"
        >
          {{ tag.toUpperCase() }}
        </div>
      </div>
      <div class="detail-brand">{{ product.brand.toUpperCase() }}</div>
      <div class="detail-title">{{ product.title }}</div>
      <div class="detail-prices">
        <div class="detail-sale">
          {{ currentPrice }}
        </div>
        <div class="detail-original">{{ retailValue }}</div>
        <div class="detail-deal">{{ percentOff }}</div>
      </div>
      <div v-html="product.description" class="detail-description"></div>
      <div class="cart-area">
        <div class="dropdown">
          <button @click="toggleQuan" class="quantity-selector">
            <span class="current-quantity">{{ quantity }}</span>
            <Icon v-if="dropdownOpen" name="up"></Icon>
            <Icon v-else name="down"></Icon>
          </button>
          <div v-if="dropdownOpen" class="dropdown-content">
            <div @click="changeQuan(1)"><span class="quan-num">1</span></div>
            <div @click="changeQuan(2)"><span class="quan-num">2</span></div>
            <div @click="changeQuan(3)"><span class="quan-num">3</span></div>
            <div @click="changeQuan(4)"><span class="quan-num">4</span></div>
            <div @click="changeQuan(5)"><span class="quan-num">5</span></div>
          </div>
        </div>
        <button @click="addToCart" id="add-to-cart">Add to Cart</button>
      </div>
      <hr />
      <div @click="toggleSpecs" class="specs-box">
        <div class="specs-header">
          <p class="specs">SPECS</p>
          <Icon v-if="showSpecs" name="up"></Icon>
          <Icon v-else name="down"></Icon>
        </div>
        <div
          v-if="showSpecs"
          v-html="product.specs"
          class="detail-specs open"
        />
        <div v-else v-html="product.specs" class="detail-specs" />
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import Icon from "./Icon.vue";

export default {
  name: "details-page",
  props: ["product", "products", "show", "favorites"],
  components: { Icon },
  data() {
    return {
      quantity: 1,
      dropdownOpen: false,
      showSpecs: true,
      favorited: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    changeQuan(quan) {
      this.quantity = quan;
      this.dropdownOpen = false;
    },
    toggleQuan() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleSpecs() {
      this.showSpecs = !this.showSpecs;
    },
    addToCart() {
      this.$emit("add-to-cart", this.quantity);
      this.quantity = 1;
      this.dropdownOpen = false;
    },
    toggleHeart() {
      this.$emit("adjust-favorites", this.product.id);
      this.favorited = !this.favorited;
    },
  },
  computed: {
    getColor() {
      const firstTag = this.product.tags[0];
      return {
        blue: firstTag === "Editor's Picks",
        purple: firstTag === "Top Ten",
        pink: firstTag === "Daily Deals",
        red: firstTag === "Olmost Out",
      };
    },
    currentPrice() {
      return `$${this.product.currentPrice.toFixed(2)}`;
    },
    retailValue() {
      return `$${this.product.retailValue.toFixed(2)}`;
    },
    percentOff() {
      return `${Math.round(
        ((this.product.retailValue - this.product.currentPrice) /
          this.product.retailValue) *
          100
      )}% off`;
    },
    getFavorite() {
      return this.products[
        this.products.findIndex((ele) => ele.id === this.product.id)
      ].favorite;
    },
  },
};
</script>
