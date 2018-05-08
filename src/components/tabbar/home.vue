<template>
  <div class="page">
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="(item,index) in picList" :key="index">
        <img :src="item.img">
      </mt-swipe-item>
    </mt-swipe>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to='/news'>
          <img src="@/assets/images/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to='/pics/0'>
          <img src="@/assets/images/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to='/goods'>
          <img src="@/assets/images/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to='/'>
          <img src="@/assets/images/menu4.png">
          <div class="mui-media-body">留言反馈</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to='/'>
          <img src="@/assets/images/menu5.png">
          <div class="mui-media-body">视频专区</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to='/'>
          <img src="@/assets/images/menu6.png">
          <div class="mui-media-body">联系我们</div>
        </router-link></li>
  </ul>
  </div>
 
</template>

<script>
import axios from "axios";

export default {
    data(){
        return {
            picList:[]
        }
    },
    created(){
        axios({
            url:'http://www.escook.cn:3000/api/getlunbo'
        }).then(res=>{
            if(res.data.status==0){
                this.picList = res.data.message
            }
        })
    }
}
</script>

<style>
.mint-swipe {
  height: 120px;
}
.mint-swipe img {
  width: 100%;
  height:auto;
}
.mui-table-view img {
  width: 40px;
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
}
</style>
