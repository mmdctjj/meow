import Vue from "vue";
import VueRouter from "vue-router";
import Hello from "@/components/hello";
import Login from "@/components/login";
import Notfind from "@/components/404";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "hello",
      component: Hello
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/404",
      name: "404",
      component: Notfind
    }
  ]
});
// router.beforeEach((to, from, next) => {
// 如果登录的时候设置过
// if (localStorage.getItem("token") != null) {
//   if (to.name == "login") {
//     // 如果还访问登录页就导向首页
//     next({ path: "/" });
//   } else {
//     // 给所有其它页面放行
//     next();
//   }
// } else {
//   // 如果没有设置这个值为空,说明没有登录，导向登录页
//   if (to.name == "login") {
//     next();
//   } else {
//     next({ path: "/login" });
//   }
// }
// });
export default router;
