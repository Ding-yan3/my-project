<template>
  <div class="box">
    <el-container class="container">
      <el-header>
        <div>
          <span v-if="this.$store.state.user.token">
            <a>{{ this.$store.state.user.name }}</a>
            <a @click="logout">Ansmited</a>
            <i class="el-icon-shopping-cart-1" @click="goCart()"></i>
          </span>
          <span v-else>
            <a @click="doLogin">login</a>
            <i class="el-icon-shopping-cart-1"></i>
          </span>
        </div>

        <div>
          Sort By
          <span @click="Pai()">
            price
            <i class="el-icon-d-caret" v-show="Sort == 0"></i>
            <i class="el-icon-caret-top" v-show="Sort == 1"></i>
            <i class="el-icon-caret-bottom" v-show="Sort == 2"></i>
          </span>
        </div>
      </el-header>

      <el-container>
        <el-aside>
          <ul>
            <li
              @click="active = index"
              :class="{ active: active == index }"
              v-for="(item, index) in aside"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </el-aside>
        <el-main v-loading="loading" element-loading-text="拼命加载中...">
          <div class="item" v-for="(item, index) in sortList" :key="index">
            <div>
              <div>
                <img :src="'/img/' + item.productImage" alt />
              </div>
            </div>
            <div>
              <p>{{ item.productName }}</p>
              <p>￥{{ item.salePrice }}</p>
            </div>
            <div>
              <el-button type="danger" plain @click="addCart(item)"
                >加入购物车</el-button
              >
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      aside: [
        "All",
        "0.00-100.00",
        "100.00-200.00",
        "200.00-500.00",
        "500.00-1000.00",
        "1000.00-5000.00"
      ],
      List: [],
      active: 0,
      Sort: 0, //排序
      flag: true,
      loading: false,
      page: 2
    };
  },
  //计算属性
  computed: {
    //排序大小
    sortList() {
      let goods = this.List;
      goods.sort((a, b) => {
        if (this.Sort == 1) {
          return a.salePrice - b.salePrice;
        } else if (this.Sort == 2) {
          return b.salePrice - a.salePrice;
        }
      });

      if (this.active != 0) {
        let price = this.aside[this.active];
        let min = price.split("-")[0];
        let max = price.split("-")[1];

        goods = goods.filter(item => {
          return item.salePrice >= min && item.salePrice < max;
        });
      }
      return goods;
    }
  },
  methods: {
    doLogin() {
      this.$store.commit("login", {
        name: "dy",
        token: "123456"
      });
    },
    logout() {
      this.$store.commit("logout");
    },
    getList() {
      this.$axios.get("/data/data.json").then(res => {
        console.log(res.data.result.list);
        this.List = res.data.result.list;
      });
    },
    //排序
    Pai() {
      if (this.Sort == 0 || this.Sort == 2) {
        this.Sort = 1;
      } else {
        this.Sort = 2;
      }
    },
    //得到下面的数据
    getMore() {
      if (this.page > 3 || this.flag == false) {
        return false;
      }
      this.flag = false;
      this.loading = true;

      setTimeout(() => {
        this.$axios.get(`/data/data${this.page}.json`).then(res => {
          console.log(res);
          this.List.push(...res.data.result.list);
          this.page++;
          this.flag = true;
          this.loading = false;
        });
      }, 1500);
    },
    //加入购物车
    addCart(item) {
        if(this.$store.state.user==""){
            this.$message("用户必须登录")
            return false
        }
        this.$store.commit("addCart",item)
        this.$message({
            message:"加入购物车成功",
            type:'success'
        })
    },
    //前往购物车
    goCart() {
      this.$router.push("/cart");
    }
  },
  mounted() {
    this.getList();
    window.addEventListener("scroll", this.getMore);
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  background: lightgreen;
}

.box > .container {
  cursor: pointer;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 10px;
  background: #f0f0f0;
}

.box > .container > .el-header {
  width: 100% !important;
  height: 110px !important;
  margin-bottom: 10px;
}

.box > .container > .el-header > div {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  background: #fff;
  text-align: right;
}

.box > .container > .el-header > div > a {
  padding: 0 5px;
  color: #0088dd;
}

.box > .container > .el-header > div > span {
  padding-left: 10px;
}

.box > .container > .el-header > div:nth-of-type(1) {
  margin-bottom: 10px;
}

@media screen and (min-width: 750px) {
  .el-aside {
    width: 15% !important;
    overflow: hidden;
  }

  .el-aside > ul {
    width: 100%;
  }

  .el-aside > ul > li {
    width: 100%;
    line-height: 50px;
    text-indent: 10px;
  }

  .el-aside > ul > li.active {
    border-left: 2px solid red;
    background: #fff;
  }
}

@media screen and (max-width: 750px) {
  .el-aside {
    display: none;
  }
}

.el-main {
  width: 80% !important;
  display: flex;
  flex-wrap: wrap;
}

.el-main > .item:hover {
  transform: scale(1.02);
  box-shadow: 0px 0px 6px red;
}

@media screen and (min-width: 960px) {
  .item {
    width: 23%;
    margin: 1%;
    background: #fff;
    padding: 5px;
    box-sizing: border-box;
  }

  .item > div {
    width: 100%;
  }

  .item > div img {
    width: 92%;
  }

  .item > div p:nth-of-type(2) {
    color: red;
    margin-top: 20px;
  }

  .item > div .el-button {
    width: 100%;
    margin-top: 10px;
  }
}

@media screen and (max-width: 960px) and (min-width: 750px) {
  .item {
    width: 30%;
    margin: 1%;
    background: #fff;
    padding: 5px;
    box-sizing: border-box;
  }

  .item > div {
    width: 100%;
  }

  .item > div img {
    width: 92%;
  }

  .item > div p:nth-of-type(2) {
    color: red;
    margin-top: 20px;
  }

  .item > div .el-button {
    width: 100%;
    margin-top: 10px;
  }
}

@media screen and (max-width: 750px) {
  .item {
    width: 98%;
    margin: 1%;
    background: #fff;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  .item > div {
    width: 100%;
  }

  .item > div img {
    width: 92%;
  }

  .item > div p:nth-of-type(2) {
    color: red;
    margin-top: 20px;
  }

  .item > div .el-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
