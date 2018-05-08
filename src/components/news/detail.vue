<template>
  <div class="alldetail">
    <detail :details="details"></detail>
    <comment :artid="$route.params.id"></comment>
    
  </div>
</template>

<script>
import axios from 'axios';
import comment from '../common/comment';
import detail from '../common/detail';

export default {
    data(){
        return {
            details:{}
        }
    },
    created(){
        axios({
            url:'http://www.escook.cn:3000/api/getnew/'+this.$route.params.id,
        }).then(res=>{
            if(res.data.status==0){
                console.log(res)
                this.details = res.data.message[0]
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
  .alldetail img {
    width: 100%;
  }
</style>
