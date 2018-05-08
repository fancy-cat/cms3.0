<template>
  <div>
    <h4>发表评论</h4>
    <hr>
    <textarea name="" id="" cols="30" rows="3" v-model="content"></textarea>
    <mt-button size="large" type="primary" @click = "addComment">发表评论</mt-button>
    <ul class="mui-table-view">
        <li v-for="(item,index) in commentList" :key="index" class="mui-table-view-cell mui-media">
            <a href="javascript:;">
    <div class=" mui-pull-right text-center user">
    <p>{{item.user_name}}</p>
                <img class="mui-media-object" :src='  "../../assets/images/menu"+ Math.round(Math.random()*4+1)+".png"'>
    
    </div>
                <div class="mui-media-body">
                    <p>第{{index+1}}楼 发表时间： {{item.add_time}}</p>
                    <p class="mui-ellipsis">{{item.content}}</p>
                </div>
            </a>
        </li>
      </ul>
      <mt-button v-if="isShow" size="large" plain type="primary" @click = "moreComment">更多评论</mt-button>
  </div>
</template>

<script>
import axios from 'axios';

import { Toast } from 'mint-ui';

export default {
    data(){
        return {
            commentList:[],
            pageindex:1,
            content:"",
            isShow:true,
        }
    },
    created(){
        this.getcom();
    },
    methods:{
        //获取所有评论的方法
        getcom(){
            axios({
                url:'http://www.escook.cn:3000/api/getcomments/'+this.$route.params.id+"?pageindex="+this.pageindex
            }).then(res=>{
                if(res.data.status==0){
                    //当获取的数据为0时，隐藏按钮，提示无更多数据
                    if(res.data.message.length==0){
                        this.isShow = false;
                        Toast("没有更多数据了")
                    }else{
                        //初始获取第一页，pageindex++后,将新数据需要追加到数组中
                        this.commentList.push(...res.data.message);
                    }
                }
            })
        },
        //添加评论的方法
        addComment(){
            if(this.content.trim()==""){
                Toast("评论不能为空")
            }else{
                axios({
                    url:'http://www.escook.cn:3000/api/postcomment/'+this.$route.params.id,
                    method:'post',
                    data:"content="+this.content
                }).then(res=>{
                    if(res.data.status==0){
                        var obj = {
                            add_time:new Date(),
                            content:this.content,
                            user_name:"匿名用户"
                        };
                        this.commentList.unshift(obj);                 
                        this.content="";
                    }
                })
            }
        },
        moreComment(){
            this.pageindex++;
            this.getcom();
        }

    }
}
</script>


<style scoped>
  textarea {
    margin: 5px 0 0px;
  }
  .user img {
    margin-left: 5px;
  }
</style>
