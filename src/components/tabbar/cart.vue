<template>
  <div class="page">
        <div class="goods-list">
            <div class="mui-card" v-for="(v, i) in cartsList" :key="i">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="v.isChecked"></mt-switch>
                        <img :src="v.thumb_path" class="thumb_img">
                        <div class="info">
                            <h4>{{v.title}}</h4>
                            <div class="box">
                                <span class="price">￥{{v.sell_price}}</span>
                                <numberbox :min="0" :max="Infinity" :step="1" v-model="v.count" :goodsid="v.id"></numberbox>
                                <a href="#">删除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <!-- 結算部分 -->
    <div class="goPay">
      <div class="pay-r mui-pull-right">
        <mt-button type="danger">結算</mt-button>
      </div>
      <div class="pay-l">
        <p>总计（不含运费）</p>
        <p>已勾选商品<span> {{totalNum}} </span>件 总价<span>{{totalPrice}}</span>元</p>
      </div>
      
    </div>
</div>
</template>
<script>
import axios from 'axios'
import numberbox from '../common/numberbox'
import '@/assets/mui/css/mui.css'

export default {
  data(){
    return {
        cartsList:[]
    }
  },
  created(){
    axios({
        url:'http://www.escook.cn:3000/api/goods/getshopcarlist/'+ this.$store.getters.getids
    }).then(res=>{
        console.log(res)
        if(res.data.status==0){

            //给数据加count属性和isChecked选中状态
            //count属性需要对应id从store中查询
            //isChecked状态默认为false，与mt-switch双向绑定，选中后会将isChecked改为true
            res.data.message.forEach(v=>{
                v.isChecked = false;
                v.count = this.$store.getters.getcountbyid(v.id)
            })
            this.cartsList = res.data.message
            console.log(this.cartsList)
        }
    })
  },
  computed:{
      //点击选中商品总数量
      totalNum(){
            var sum = 0;
            this.cartsList.forEach(v=>{
            if(v.isChecked){
                sum+=v.count
            }
          })
          return sum;
      },

      //商品的总金额
      totalPrice(){
          var total = 0;
            this.cartsList.forEach(v=>{
                console.log(v)
            if(v.isChecked){
                total += +v.sell_price*v.count
            }
          })
          return total;
      }
  },
  components:{
    numberbox
  }
}
</script>
<style scoped>
.goPay {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 0 1px 1px #ccc;
}
.goPay button {
  color:#fff;
  margin: 10px;
  width: 80px;
}
.goPay span {
  color:red;
  font-weight: 700;
  font-size: 20px;
}

.mui-card {
    font-size: 14px;
    position: relative;
    overflow: hidden;
    margin: 10px;
    border-radius: 2px;
    background-color: #fff;
    background-clip: padding-box;
    box-shadow: 0 1px 2px rgba(0,0,0,.3);
}
.mui-card-content {
    font-size: 14px;
    position: relative;
}
.goods-list .mui-card-content-inner {
    display: -ms-flexbox;
    display: flex;
}
.mui-card-content-inner {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
}
.mui-card-content-inner {
    position: relative;
    padding: 15px;
}
.mint-switch {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
}
input[type=checkbox], input[type=radio] {
    box-sizing: border-box;
    padding: 0;
}

.mint-switch-input {
    display: none;
}
.mint-switch * {
    pointer-events: none;
}
input, select, textarea {
    font-family: Helvetica Neue,Helvetica,sans-serif;
    font-size: 17px;
    -webkit-tap-highlight-color: transparent;
}
input {
    line-height: normal;
}
button, input, optgroup, select, textarea {
    font: inherit;
    margin: 0;
    color: inherit;
}
.mint-switch-core {
    display: inline-block;
    position: relative;
    width: 52px;
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 16px;
    box-sizing: border-box;
    background: #d9d9d9;
}
.mint-switch * {
    pointer-events: none;
}
.goods-list .mui-card-content-inner .thumb_img{
    width: 60px;
    height: 60px;
}
.goods-list .mui-card-content-inner .info{
    -ms-flex: 1;
    flex: 1;
}
.goods-list .mui-card-content-inner .info h4 {
    font-size: 14px;
}
.goods-list .mui-card-content-inner .info .box{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
}
.goods-list .mui-card-content-inner .info .box .price{
    font-size: 16px;
    color: red;
}
.mui-numbox-cms {
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: 120px;
    height: 35px;
    padding: 0 40px;
    vertical-align: top;
    vertical-align: middle;
    border: 1px solid #bbb;
    border-radius: 3px;
    background-color: #efeff4;
}
</style>


