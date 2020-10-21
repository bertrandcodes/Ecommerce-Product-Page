import Vue from 'vue'
import App from './App.vue'
import VueToastify from "vue-toastify";

Vue.use(VueToastify, {
  position: "bottom-center"
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
