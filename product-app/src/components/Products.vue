<template>
  <div :key="product.id" class="collection-item">
    <div @click="openModal" class="collection-image-container">
      <img
        class="collection-image"
        :src="product.previewImage"
        :alt="product.title"
      />
      <Icon name="unfilled"></Icon>
      <div
        v-if="product.tags.length > 0"
        class="collection-tag"
        :class="getColor"
      >
        {{ product.tags[0] }}
      </div>
    </div>
    <div class="collection-brand">{{ product.brand }}</div>
    <div class="collection-title">{{ product.title }}</div>
    <div class="collection-prices">
      <div class="collection-sale">{{ currentPrice }}</div>
      <div class="collection-original">{{ retailValue }}</div>
    </div>
    <div class="collection-deal">{{ percentOff }}</div>
  </div>
</template>

<script>
import Icon from "./Icon.vue";

export default {
  name: "product",
  props: ["product"],
  components: { Icon },
  methods: {
    openModal() {
      this.$emit("open-modal", this.product);
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
  },
};
</script>
