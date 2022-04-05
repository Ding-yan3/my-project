import Vue from "vue";
import Vuex from "vuex";
// 引入数据持久化的插件
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 100,
    isLoading: false, //控制正在加载
    user: "",
    CartList: []
  },
  mutations: {
    //改变loading组件的显示隐藏
    changeLoading(state, bool) {
      state.isLoading = bool;
    },
    logout(state) {
      state.user = "";
    },
    login(state, payload) {
      state.user = payload;
    },
    //加入购物车
    addCart(state, data) {
      let index = state.CartList.findIndex(item => {
        return item._id == data._id;
      })

      if (index > -1) {
        state.CartList[index].number++;
      } else {
        Vue.set(data, "number", 1);
        // eslint-disable-next-line prettier/prettier
        Vue.set(data, "checked", true)
        state.CartList.push(data);
      }
    },
    //删除
    delCart(state, index) {
      state.CartList.splice(index, 1);
    },
    //清空数据不变
    subCart(state,data){
      state.CartList=data
    }
  },
  actions: {},
  modules: {},
  // 与state，mutations同级
  plugins: [createPersistedState()] //加上这个就可以了
});