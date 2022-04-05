<template>
  <div id="app">
    <router-view></router-view>
    <Loading v-if="isLoading"></Loading>
  </div>
</template>

<script>
import "@/assets/reset.css";
export default {
  name: "",
  data() {
    return {
      count: ""
    };
  },
  methods: {},
  mounted() {},
  created() {},
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  components: {}
};
</script>

<style>
#app {
  font-family: Vanir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
