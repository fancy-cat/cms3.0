<template>
  <div class="alldetail">
		<div class="mui-content">
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-swipe :auto="4000">
              <mt-swipe-item v-for="(v,i) in lunbos" :key="i">
                <img :src="v.src" alt="">
              </mt-swipe-item>
            </mt-swipe>
					</div>
				</div>
			</div>
			<div class="mui-card">
				<div class="mui-card-header">{{goodsdetail.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div  class="price"><span >市场价：
            <del >￥7988</del></span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span >销售价:<span  class="sale_price">￥7200</span></span></div>
					</div>
          <div>
            <span>购买数量：</span>
            <numberbox min='0' :max="goodsdetail.stock_quantity" step='1' v-model="count"></numberbox>
          </div>
          <div class="btns">
            <button class="mint-button mint-button--primary mint-button--normal">
              <label class="mint-button-text">立即购买</label></button> 
            <button class="mint-button mint-button--danger mint-button--normal" @click="addCart">
              <label class="mint-button-text" >加入购物车</label></button></div>
				</div>
			</div>
				<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsdetail.goods_no}}</p>
						<p>库存情况：{{goodsdetail.stock_quantity}}</p>
						<p>上架时间：{{goodsdetail.add_time}}</p>
					</div>
          <div class="btns">
           <mt-button type="primary" size="large" plain @click="$router.push('/goods/detail/desc/'+goodsdetail.id)">商品描述</mt-button>
           <mt-button type="danger" size="large" plain @click="$router.push('/goods/detail/comment/'+ goodsdetail.id)">商品评论</mt-button>
          </div>
				</div>
			</div>
    </div>
    
    <!-- 过渡的小球 -->
    <transition v-on:before-enter="beforeEnter" v-on:enter="enter">
      <div class="ball" v-if="isShow"></div>
    </transition>
  </div>
</template>
<script>
import axios from 'axios'
import numberbox from '../common/numberbox'
import store from '../store'
export default {
  data(){
      return {
          goodsdetail:{},
          lunbos:[],
          count:0,
          isShow:false
      }
  },
  created(){
      axios({
          url:'http://www.escook.cn:3000/api/goods/getinfo/'+this.$route.params.id
      }).then(res=>{
          if(res.data.status==0){
              this.goodsdetail = res.data.message[0]
          }
      }),
      axios({
          url:'http://www.escook.cn:3000/api/getthumimages/'+this.$route.params.id
      }).then(res=>{
          if(res.data.status == 0){
              this.lunbos = res.data.message;
          }
      })
  },
  methods:{
      addCart(){
          this.isShow = true;
          //触发store中的添加数据方法
          //将商品id和count(已经和num双向绑定了，就是商品选择的数量)传递过去
          var obj = {
             id:this.$route.params.id,
             count:this.count
          }
          this.$store.commit('addcarts',obj);
      },
      beforeEnter(el){

      },
      enter(el){

      }

  },
  components:{
      numberbox
  }
}
</script scoped>
<style>
.alldetail {
  position: relative;
}
.mint-swipe{
  height:264px;
}
.mui-card-content-inner>div{
    margin: 8px 0;
}
.mui-card-content-inner {
    position: relative;
    padding: 10px;
}
.mui-card-content-inner img{
  width: 100%;
}
.sale_price {
    color: red;
    font-size: 18px;
}

.mint-button {
  margin-bottom: 5px;
}
.ball {
  position:absolute;
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  left:180px;
  top: 570px;
  z-index:999;
}
</style>
