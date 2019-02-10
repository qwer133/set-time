<template>
<div  :class="iscroll" ref="wrapp" >
    <div class="conList">
         <slot></slot>
    </div>
</div>
</template>

<script>
import Vuex from 'vuex'
export default {
    props:{
        iscroll:String,
        selectColor:Number
    },
    mounted() {
       var wrapper=this.$refs.wrapp
       this.myScroll = new IScroll(wrapper, {
           tap:true,
           click:true
        });
        

        //延时执行该方法以达到刷新的效果
        setTimeout(()=>{
              this.myScroll.scrollTo(0,-this.paddingState)
        },50)

        this.myScroll.on('scrollEnd',()=>{
            var y=this.myScroll.y
            this.$emit('change',y)

            // console.log('执行了')

            this.$nextTick(()=>{ //获取父元素传递过来的值进行重新定位

                    this.myScroll.scrollTo(0,-this.selectColor)
                    // console.log(-this.selectColor)
                    
            })
        })

       

        
           

    },
    computed:{
        ...Vuex.mapState({
            paddingState:'paddingTop'
        })
    },
    methods:{
        //刷新视图的方法
        gunn(){
            this.myScroll.refresh()
        }
    }
}
</script>

<style scoped>

</style>