import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/cart",
    name: "Cart",
    component: resolve => require(["../components/Cart.vue"], resolve),
    meta: {
      title: "购物车"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
