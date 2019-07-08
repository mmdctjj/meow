import Vue from "vue";
import App from "./app.vue";
import router from "./router/index";

import "bootstrap/dist/css/bootstrap.css";
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
