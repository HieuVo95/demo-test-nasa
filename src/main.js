import Vue from 'vue'
import "./plugins/bootstrap";
import "./plugins/axios";
import "./plugins/vee-validate";
import App from './App.vue'
import router from "@/router";
import store from "@/store";


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
