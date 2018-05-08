<template>
  <div class="alldetail">
    <detail :details="imgInfo">
      <div slot="pics">
        <vue-preview :slides="slide1"></vue-preview>
      </div>
    </detail>
  <comment :artid="$route.params.id"></comment>    
  </div>
</template>

<script>
import detail from '../common/detail.vue'
import comment from '../common/comment.vue'
import axios from 'axios'

export default {
    data(){
        return {
            imgInfo:{},
            slide1: []
        }
    },
    created(){
        axios({
            url:'http://www.escook.cn:3000/api/getimageInfo/'+this.$route.params.id
        }).then(res=>{
           if(res.data.status==0){
               console.log(res)
                this.imgInfo = res.data.message[0]
           }
        }),
        axios({
            url:'http://www.escook.cn:3000/api/getthumimages/'+this.$route.params.id
        }).then(res=>{
            if(res.data.status==0){
                console.log(res)
                res.data.message.forEach(v=>{
                    this.slide1.push({
                        src: v.src,
                        msrc: v.src,
                        alt: "pics",
                        title: "img",
                        w: 600,
                        h: 400
                    })
                })
            }
        })
    },
    components:{
        detail,
        comment
    }
}
</script>

<style>
.my-gallery {
  width: 100%;
} 
.my-gallery img {
  width: 24%;
} 
article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section, summary{
  display: inline;
} 
figure{
  margin:1em 2px;
} 
</style>
