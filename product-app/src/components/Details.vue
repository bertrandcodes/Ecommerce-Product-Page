<template>
  <div v-if="!show" class="modal"></div>
  <div v-else class="modal open">
    <div class="detail-image-container">
      <img
        class="detail-image"
        :src="product.previewImage"
        :alt="product.title"
      />
      <Icon name="unfilled" class="unfilled"></Icon>
      <div v-on:click="closeModal" class="cancel-div"></div>
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
      <div class="detail-description">
        <!-- <Markup content={description} /> -->
      </div>
      <div class="cart-area">
        <div class="dropdown">
          <button onClick="{this.toggleQuan}" class="quantity-selector">
            <span class="current-quantity">{this.state.quantity}</span>
            <Icon name="up"></Icon>
          </button>
          <!-- {this.state.quanShow ? <div class="dropdown-content">
                            <div onClick={() => this.changeQuan(1)}><span class="quan-num">1</span></div>
                            <div onClick={() => this.changeQuan(2)}><span class="quan-num">2</span></div>
                            <div onClick={() => this.changeQuan(3)}><span class="quan-num">3</span></div>
                            <div onClick={() => this.changeQuan(4)}><span class="quan-num">4</span></div>
                            <div onClick={() => this.changeQuan(5)}><span class="quan-num">5</span></div>
                        </div> : null} -->
        </div>
        <button id="add-to-cart">Add to Cart</button>
      </div>
      <hr />
      <div onClick="{this.toggleSpecs}" class="specs-box">
        <div class="specs-header">
          <p class="specs">SPECS</p>
          <Icon name="up"></Icon>
        </div>
        <!-- {this.state.specsShow ?
                        <div class="detail-specs open">
                            <Markup content={specs} />
                        </div> : <div class="detail-specs"><Markup content={specs} /></div>} -->
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import Icon from "./Icon.vue";

export default {
  name: "details",
  props: ["product", "show"],
  components: { Icon },
  methods: {
    closeModal() {
      this.$emit("close-modal");
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
