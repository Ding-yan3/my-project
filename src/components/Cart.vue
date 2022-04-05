<template>
    <div class="main">
        <div class="box">
            <div class="head">
                <h4>MY CART</h4>
                <div @click="back()">BACK HOME</div>
            </div>
            <table cellpadding="0" ceppspacing="0">
                <thead>
                    <tr>
                        <th></th>
                        <th>ITEMS</th>
                        <th>PRTCE</th>
                        <th>QUANTITY</th>
                        <th>SUBTOTAL</th>
                        <th>EDIT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in CartList" :key="index">
                        <td><input type="checkbox" name="" id="" v-model="item.checked" /></td>
                        <td>
                            <img :src="'/img/' + item.productImage" alt="" />
                            <span>{{item.productName}}</span>
                        </td>
                        <td>￥{{item.salePrice|numFormat}}</td>
                        <td>
                            <button class="btt" @click="count(index)">-</button>
                            <span>{{item.number}}</span>
                            <button class="btt" @click="item.number++">+</button>
                        </td>
                        <td style="color: red">{{item.salePrice*item.number|numFormat}}</td>
                        <td><i @click="delCart(index)" class="el-icon-delete"></i></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="1">
                            selectAll
                            <input @change="checkAll" type="checkbox" :checked="check" name="" id="" />
                        </td>
                        <td colspan="5" style="text-align: center">
                            <span style="color: #ccc">item totla</span>:<strong style="color: red">{{sum|numFormat}}</strong>
                            &nbsp;&nbsp;
                            <button class="btn">CHECKOUT</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Cart",
        data() {
            return {
                CartList: [],
                check:true
            };
        },
        //计算属性
        computed: {
            sum(){
                let sum=0
                this.CartList.forEach((item) => {
                    if(item.checked){
                        sum+=item.salePrice*item.number
                    }

                    if(this.CartList.length>0){
                        this.$store.commit("subCart",this.CartList)
                    }
                });
                return sum
            }
        },
        methods: {
            back(){
                this.$router.go(-1)
            },
            //全选
            checkAll(e){
                this.CartList.map((item)=>{
                    item.checked=e.target.checked
                })
            },
            //删除
            delCart(index){
                this.$store.commit("delCart",index)
            },
            //数量减少不能为-1
            count(index){
                if(this.CartList[index].number<=1){
                    alert("数量不能小于1")
                    return false
                }
                this.CartList[index].number--
            }
        },
        mounted() {
            this.CartList = this.$store.state.CartList
            console.log(this.CartList)
        },
        filters:{
            //让数字以小数点的形式出现
            numFormat(val,num=2){
                return val.toFixed(num)
            }
        }
    };
</script>

<style scoped>
    .main {
        background: #f0f0f0;
        width: 100%;
        overflow: hidden;
    }

    .box {
        width: 90%;
        margin: 20px auto;
    }
    .box>.head{
        overflow: hidden;
        width: 100%;
    }
    .box>.head>h4{
        float: left;
    }
    .box>.head>div{
        float: right;
        color: blue;
        text-decoration: underline;
        cursor: pointer;
    }
    .box>table {
        width: 100%;
        margin-top: 10px;
        border-collapse: collapse;
        text-align: center;
    }

    .box>table>thead {
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
    }

    .box>table>thead th {
        padding: 5px 0px;
    }

    .box>table>tbody,
    tfoot {
        background: #fff;
    }

    .box>table td {
        padding: 5px 0;
        border-top: 1px solid #ccc;
    }

    .box>table>tfoot {
        margin-top: 10px;
        border-top: 8px solid #f0f0f0;
    }

    .box>table img {
        width: 80px;
    }

    .box>table .btt {
        padding: 0 10px;
    }

    .box>table .btn {
        padding: 5px 10px;
        background: #ccc;
        color: #fff;
    }
</style>