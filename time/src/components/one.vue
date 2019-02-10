<template>
    <iscroll iscroll="oneTime" @change="gun" :selectColor="numcolor">
        <ul ref="ul">
            <li v-for="item in num" :key="item" ref="li" :class="{color:colorIf==item}">{{item}}</li>
        </ul>
    </iscroll>
</template>

<script>
import Vuex from 'vuex'
export default {
    data(){
        return {
            num:[],
            height:null,  //列表栏上内边距
            colorIf:2,
            numcolor:0
        }
    },
    created() {

        for(var i=0;i<=23;i++){
            if(i<10){
                 var j="0"+i
            }else{
                 var j=i
            }
            this.num.push(j)
        }


    },
    computed:{
        ...Vuex.mapState({
            paddingState:'paddingTop'
        })
    },
    methods:{
        ...Vuex.mapActions({
            padding:'getPaddings'
        }),
        gun(y){
           //控制li上下标签的阈值
        //    console.log(y)
          
                  var down=-y-this.height

               

                  var selectNum=down/(this.liHeight)


                  //对selectNum执行四舍五入
                  if(selectNum+0.5>=parseInt(selectNum)+1){
                      selectNum=parseInt(selectNum)+3

                      this.colorIf=selectNum  //根据索引增加类名
                  
                  }else{
                      selectNum=parseInt(selectNum)+2

                       this.colorIf=selectNum

                  }

                  this.numcolor=(selectNum-2)*this.liHeight+this.height  //设置定位功能并向滚动组件进行传值

                  //向ctime父组件进行传值
                  this.$emit('onetime',selectNum)



                //   console.log(selectNum)

                //   console.log(this.numcolor)

                  

                //   console.log(selectNum)

                //  console.log(down)         
        
         
        }
    },
    mounted() {
    //    this.heightUl=this.$refs.ul.offsetHeight  //获取ul便签的高

    //    //li标签高度精度处理
       var strliHeight=(window.getComputedStyle(this.$refs.li[0]).height)
       var strliPaddingbottom=(window.getComputedStyle(this.$refs.li[0]).paddingBottom)

       strliHeight=parseFloat(strliHeight.substring(0,strliHeight.length-2))
       strliPaddingbottom=parseFloat(strliPaddingbottom.substring(0,strliPaddingbottom.length-2))

       this.liHeight=strliHeight+strliPaddingbottom

    //    console.log(this.liHeight)

       

    //    str=parseFloat(str.substring(0,str.length-2))
    //    str1=parseFloat(str1.substring(0,str1.length-2))

    //    this.heightLi=str+str1
    //    this.heightLis=this.heightLi*23+(this.$refs.li)[23].offsetHeight //获取所有li便签的高的和
    //    this.height=(this.heightUl-this.heightLis)/2  //做差取得上内边距值

       
       this.str=window.getComputedStyle(this.$refs.ul).paddingTop  //获取ul标签的上内边距
       var str=this.str
       this.height=parseFloat(str.substring(0,str.length-2))
       this.numcolor=-((this.liHeight)*2+this.height)     //初始化li列表的位置


    //    console.log(this.height)
    //初始化实物对象
    var obj={
        paddingTop:this.height,
        liheight:this.liHeight,
    }

       this.padding(obj)



    },
}
</script>

<style scoped lang="scss">

@function rem($px){
    @return $px/(41.4*2.65)+rem
}

.oneTime{
   width:rem(148);
    height:100%;
      overflow: hidden;
}
.oneTime ul{
    width:100%;
    height:100%;
    padding-top:rem(360);
    padding-bottom: rem(360);
}
.oneTime ul li{
    text-align: center;
    color:#e4e4e4;
    font-size:rem(110);
    padding-bottom: rem(68);
}
//设置颜色类
.oneTime ul li.color{
      color:#f56415;
}
.oneTime ul li:last-child{
    padding-bottom: 0px;
}
</style>
