import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Loading from "@/components/Loading.vue";
import axios from "axios";
import Ele from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 引入elementui样式库
Vue.use(Ele);

//全局使用
Vue.component("Loading", Loading);

//绑定axios
Vue.prototype.$axios = axios; //将对象挂载原型上

//全局路由守卫,进入组件之前触发
router.beforeEach((to, from, next) => {
  //判断路由是否设置title值，给组件添加标题内容
  // eslint-disable-next-line no-prototype-builtins
  if (to.hasOwnProperty("meta")) {
    document.title = to.meta.title;
  }

  next();
});
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 改变vuex中的isLoading状态数据，当为true，loading显示
    store.state.isLoading = true;
    return config;
  },
  error => {
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      store.state.isLoading = false;
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status) {
      return Promise.reject(error.response);
    }
  }
);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
