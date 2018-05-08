import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//将vuex的数据存到本地中，数据库和本地都有一份

//本地读数据
function readStorage(){
    return JSON.parse(localStorage.getItem('cInfo')) || []
}
//本地写数据
function writeStorage(arr){
    localStorage.setItem('cInfo',JSON.stringify(arr));
}

export default new Vuex.Store({
    state:{
        //没网的时候也能查看购物车，所以从本地读取
        //cartsinfo存的是商品的id和商品的数量
        cartsinfo:readStorage()
    },

    //getters类似于计算属性，拿到的是计算的结果
    //在别处拿数据的方法：this.$store.getters.不用带括号的方法名(有参数就加括号)
    getters:{
        //页面底部购物车圆圈要显示购物车数量
        //遍历state.cartsinfo计算得出来
        getcounts(state){
            var sum = 0;
            state.cartsinfo.forEach(v=>{
                sum+=v.count
            })
            return sum;
        },

        //获取所有的id，用于购物车页面进行ajax请求
        //数据格式为 id,id,id 逗号拼接
        getids(state){
            var temparr = []
            state.cartsinfo.forEach(v=>{
                temparr.push(v.id);
            })
            return temparr.join(',')
        },
                
        //根据商品id，读取对应的count
        //购物车需要
        getcountbyid:state=>id=>{
            var temp = state.cartsinfo.find(v=>v.id==id);
            if(temp){
                return temp.count
            }
        }
    },

    //mutations里面存放操作state中数据的方法
    //在别处触发方法: this.$store.commit("方法名"，要传递的数据)
    mutations:{

        //点击添加购物车要做的事情
        addcarts:(state,obj)=>{
            //obj为当前加入购物车的数据，判断是否存在
            //存在--加数量
            //不存在--push到state的数据中
            var temp = state.cartsinfo.find(v=>v.id==obj.id);
            if(temp){
                temp.count += obj.count
            }else{
                state.cartsinfo.push(obj);
            }
            //将新数据重新存入本地
            writeStorage(state.cartsinfo)
        },

        //购物车页面点击加1
        addOne:(state,id)=>{
            var temp = state.cartsinfo.find(v=>v.id==id);
            temp.count++;
            writeStorage(state.cartsinfo)
        },

        //购物车页面店家减1
        reduceOne:(state,id)=>{
            var temp = state.cartsinfo.find(v=>v.id==id);
            temp.count--;
            writeStorage(state.cartsinfo)
        }

    }   
})