<template>
    <iscroll iscroll="towTime" ref="isrollTow" @change="gun" :selectColor="numcolor">
        <ul ref="ul">
            <li v-for="item in num" :key="item" :class="{color:colorIf==item}">{{item}}</li>
        </ul>
    </iscroll>
</template>

<script>
import Vuex from 'vuex'
export default {
    data(){
        return {
            num:[],
            colorIf:2,
            numcolor:0
        }
    },
    computed:{
        ...Vuex.mapState({
            paddingTop:'paddingTop',
            liheight:"liheight"
        })
    },
    created() {
       for(var i=0;i<=59;i++){
            if(i<10){
                 var j="0"+i
            }else{
                 var j=i
            }
            this.num.push(j)
        }
    },
    methods:{
        gun(y){

                var down=-y-this.paddingTop

               

                  var selectNum=down/(this.liheight)


                  //对selectNum执行四舍五入
                  if(selectNum+0.5>=parseInt(selectNum)+1){
                      selectNum=parseInt(selectNum)+3

                      this.colorIf=selectNum  //根据索引增加类名
                  
                  }else{
                      selectNum=parseInt(selectNum)+2

                       this.colorIf=selectNum

                  }

                  this.numcolor=(selectNum-2)*this.liheight+this.paddingTop  //设置定位功能并向滚动组件进行传值

                  this.$emit('tow',selectNum)

        }
    },
    mounted() {
        var heightul=this.$refs.ul.offsetHeight

        this.numcolor=-((this.liheight)*2+this.paddingTop)
    },
}
</script>

<style scoped lang="scss">
@function rem($px){
    @return $px/(41.4*2.65)+rem
}

.towTime{
    width:rem(148);
    height:100%;
      overflow: hidden;
}
.towTime ul{
    width:100%;
    height:100%;
    padding-top:rem(360);
    padding-bottom: rem(360);
}
.towTime ul li{
    text-align: center;
    color:#e4e4e4;
    font-size:rem(110);
    margin-bottom: rem(68);
}
.towTime ul li.color{
     color:#f56415;
}
.towTime ul li:last-child{
    margin-bottom: 0px;
}
</style>
