import Vue from "vue";
import App from "./app.vue";
import router from "./router/index";
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
