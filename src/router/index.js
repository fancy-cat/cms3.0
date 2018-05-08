import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//引入tabbar中的组件
import Home from '../components/tabbar/home'
import Cart from '../components/tabbar/cart'

//引入新闻页面的组件
import NewsDetail from '../components/news/detail'
import News from '../components/news/list'

//引入图片页面的组件
import Pics from '../components/pictures/list'
import PicsDetail from '../components/pictures/detail'

//引入商品的组件
import Goods from '../components/goods/list'
import GoodsDetail from '../components/goods/detail'

export default new Router({
  routes: [
    //配置tabbar中的路由
    {
      path:'/home',
      component:Home
    },
    {
      path:'/cart',
      component:Cart
    },
    
    //配置news中的路由
    {
      path:'/news/detail/:id',
      component:NewsDetail
    },
    {
      path:'/news',
      component:News
    },

    //配置pictures路由
    {
      path:'/pics/:id',
      component:Pics
    },
    {
      path:'/pics/detail/:id',
      component:PicsDetail
    },

    //配置goods中的路由
    {
      path:'/goods',
      component:Goods
    },
    {
      path:'/goods/detail/:id',
      component:GoodsDetail
    }
  ],
  linkActiveClass:'mui-active'
})
