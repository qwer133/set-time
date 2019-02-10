<template>
<div>
   <div class="ctime">
        <div class="content">
            <!--计时列表-->
               <div class="conttime">
                   <onetime @onetime="onetime"></onetime>
                   <p class="dis">时</p>
                   <tow @tow="tow"></tow>
                   <p class="dis">分</p>
                   <three @three="three"></three>
                   <p class="dis dis1">秒</p>
               </div>
               <button @click="settime">计时</button>
        </div>
    </div>

    <router-view></router-view>
</div>
</template>

<script>
import Vuex from 'vuex'
import onetime from './one.vue'
import tow from './tow.vue'
import three from './three.vue'

export default {
    data(){
        return {
            oneval:null,
            towval:null,
            threeval:null
        }
    },
    components:{
        onetime,
        tow,
        three
    },
    methods:{
        ...Vuex.mapActions({
            change:'getPaddings'
        }),
        onetime(val){
            this.oneval=val

            // console.log(this.oneval)
        },
        tow(val){
            this.towval=val

            // console.log(this.towval)
        },
        three(val){
            this.threeval=val

            // console.log(this.threeval)
        },

        //设置时间点击事件
        settime(){
       

            //向timechange组件进行传值
            if(this.oneval==null){
                this.oneval=2
            }
            if(this.towval==null){
                this.towval=2
            }
            if(this.threeval==null){
                this.threeval=2
            }

            var obj={
                hour:this.oneval,
                minutes:this.towval,
                seconds:this.threeval
            }

            this.$router.push(`/timechange?hour=${obj.hour}&minutes=${obj.minutes}&seconds=${obj.seconds}`)

           
        }
    }
    
}
</script>


<style scoped lang="scss">

@function rem($px){
    @return $px/(41.4*2.65)+rem  
}

.ctime{
    width:100%;
    height:100%;
    position: absolute;
    top:0px;
    left:0px;
    background-color:white;
}
.content{
    width:100%;
    height:100%;
}

.content button{
    width:rem(516);
    height:rem(113);
    outline: none;
    border:none;
    background-color: #fc5b24;
    border-radius:rem(80);
    position: absolute;
    left:rem(281);
    bottom:rem(78);
}

.conttime{
    width:rem(799);
    height:rem(826);
    margin-top:-(rem(413));
    margin-left:-(rem(399.5));
    position: absolute;
    top:50%;
    left:50%;
    display: flex;
}
//设置时分秒的样式
.dis{
    color:black;
    font-size: rem(38);
    line-height: rem(826);
    width:rem(145);
    padding-left:rem(25);
}
.dis1{
    width:rem(61);
}

</style>
