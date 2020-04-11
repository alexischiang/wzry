import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// global style
import "./scss/style.scss";

// vue router
import router from "./router";

// component register
import Card from "./components/Card.vue";
Vue.component("m-card", Card);

import ListCard from "./components/ListCard.vue";
Vue.component("list-card", ListCard);

// swiper require styles
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

// iconfont
import "./assets/iconfont/iconfont.css";

// axios
import axios from "axios";
Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000/web/api"
});

Vue.use(VueAwesomeSwiper /* { default global options } */);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
