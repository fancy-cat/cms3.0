<template>
    <div class="buynum">
        <h4>
            <div class="btnwrap">
            <button class="reducebtn" @click="reducebtn">-</button>
            <input type="num" v-model="num">
            <button class="addbtn" @click="addbtn">+</button>
            </div>
        </h4>
    </div>  
</template>

<script>
export default {
  data(){
      return {
          //初始值是传过来额value
          num:this.value
      }
  },
  //value是父组件传来的值，固定写法
  //goodsid是cart页面传过来，实现+和-时，改变对应store中的数据，与本地数据联动
  props:['min','max','step','value','goodsid'],
  methods:{
      reducebtn(){
          if(this.num-this.step>=this.min){
              this.num--;
              //组件绑定v-model的实现双向绑定的方法：子组件改变，将数据传送给父子间
              this.$emit('input',this.num)

              //实现让state中的数据-1
              //将id传过去，遍历查找更改
              this.$store.commit('reduceOne',this.goodsid)
          }
      },
      addbtn(){
          console.log(+this.step)
          if(this.num + +this.step<=this.max){
              this.num++;
              this.$emit('input',this.num)

              //实现让state中的数据+1
              //将id传过去，遍历查找更改
              this.$store.commit('addOne',this.goodsid)
          }
      }
  },
  //组件绑定v-model的实现双向绑定的方法：父组件改变，告诉子组件
  //监听父组件值的变化
  watch:{
      value(nv,ov){
          this.num = nv
      }
  }
  
}
</script>

<style>
.btns,.buynum {
  margin: 10px;
}
.btnwrap {
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
.btnwrap input{
    display: inline-block;
    overflow: hidden;
    width: 100%!important;
    height: 100%;
    margin: 0;
    padding: 0 3px!important;
    text-align: center;
    text-overflow: ellipsis;
    word-break: normal;
    border: none!important;
    border-right: 1px solid #ccc!important;
    border-left: 1px solid #ccc!important;
    border-radius: 0!important;
}
.btnwrap button{
    font-size: 18px;
    font-weight: 400;
    line-height: 100%;
    position: absolute;
    top: 0;
    overflow: hidden;
    width: 40px;
    height: 100%;
    padding: 0;
    color: #555;
    border: none;
    border-radius: 0;
    background-color: #f9f9f9;
}
.btnwrap .reducebtn {
    left: 0;    
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}
.btnwrap .addbtn{
    right: 0;  
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

</style>
