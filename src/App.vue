<template>
  <div id="app">
    <mt-header fixed title="cms">
      <mt-button icon="back" slot="left"  v-if="$route.path!='/home'" @click=$router.go(-1)>返回</mt-button>
    </mt-header>
    <router-view/>
    <div>
      <nav class="mui-bar mui-bar-tab">
        <router-link to ='/home' class="mui-tab-item-tab" href="#tabbar">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link to ='/member' class="mui-tab-item-tab" href="#tabbar-with-chat">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link to ='/cart' class="mui-tab-item-tab" href="#tabbar-with-contact">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{$store.getters.getcounts}}</span></span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link to ='/search' class="mui-tab-item-tab" href="#tabbar-with-map">
          <span class="mui-icon mui-icon-gear"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
		</nav>
    </div>
  </div>
</template>

<script>
import './assets/mui/css/mui.css'
import './assets/mui/css/icons-extra.css'


export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #fff;
}
 .page {
   padding:40px 0px 50px;
 }
 .alldetail {
   padding: 40px 8px 50px;
 }

.mui-bar-tab .mui-tab-item-tab {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tab .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-tab .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item-tab.mui-active {
    color: #007aff;
}
</style>
