<template>
  <div class="page">
	<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
		<div class="mui-scroll">
			<router-link to="/pics/0" class="mui-control-item-cms">
				全部
			</router-link>
			<router-link :to="'/pics/'+v.id" v-for="(v,i) in cateTitlelist" :key="i" class="mui-control-item-cms" >
				{{v.title}}
			</router-link>
		</div>
	</div>
	<div>
		<div v-for="(v,i) in catelist" :key="i" class="imgInfo" @click="$router.push('/pics/detail/'+v.id)">
			<img v-lazy="v.img_url" alt="">
			<div class="imgDes">
				<h4>{{v.title}}</h4>
				<p>{{v.zhaiyao}}</p>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import axios from 'axios'

import '@/assets/mui/css/mui.css'
import mui from '@/assets/mui/js/mui'

export default {
    data(){
        return {
            cateTitlelist:[],
            catelist:[]
        }
    },
    created(){
        axios({
            url:'http://www.escook.cn:3000/api/getimgcategory'
        }).then(res=>{
            if(res.data.status==0){
                this.cateTitlelist = res.data.message
            }
        });
       this.getlist();
    },
    methods:{
        getlist(){
            axios({
                url:'http://www.escook.cn:3000/api/getimages/'+this.$route.params.id
            }).then(res=>{
                if(res.data.status==0){
                    console.log(res)
                    this.catelist = res.data.message
                }
            })
        }
    },
    mounted(){

       //dom是动态生成的，需要手动初始化导航的区域滚动
       //需要放在mounted里面，这个时期dom才渲染完成

        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    watch:{
        //需要监听路径，当路径变化时，重新进行ajax请求，更新catelist的数据
        $route(nv,ov){
            this.getlist();
        }
    }
}


</script>

<style scoped>


.imgInfo{
	position:relative;
	padding: 5px 10px;
	box-shadow: 0 0 2px 2px #ccc;
}
.imgInfo img {
	width: 100%;
}
.imgDes {
	position:absolute;
	bottom: 0;
}
.imgDes h4{
	color: #fff;
}
.imgDes p {
	color: #fff;
	font-size: 12px;
	margin: 0;
}
/* 懒加载样式 */
.imgInfo img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}


/* mui的样式覆盖 */
 .mui-segmented-control.mui-segmented-control-inverted .mui-control-item-cms {
    color: inherit;
    border: 0;
}
.mui-segmented-control.mui-scroll-wrapper .mui-control-item-cms {
    display: inline-block;
    width: auto;
    padding: 0 20px;
}
.mui-segmented-control .mui-control-item-cms {
    line-height: 38px;
    display: table-cell;
    overflow: hidden;
    width: 1%;
    -webkit-transition: background-color .1s linear;
    transition: background-color .1s linear;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #007aff;
    border-color: #007aff;
    border-left: 1px solid #007aff;
}
.mui-segmented-control.mui-segmented-control-inverted .mui-control-item-cms.mui-active {
    color: #007aff;
    background: none;
} 
</style>
