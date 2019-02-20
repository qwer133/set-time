<template>
    <div class="timeChange">
      <div class="time">
          <h1>{{hour}}:{{minutes}}:{{seconds}}</h1>
          <p>倒计时</p>
      </div>
      <div class="btn">
          <span class="btnl" @click="back">取消</span>
          <span class="btnr" @click="pause" :class="{set:set}">{{html}}</span>
      </div>

      <!--设置弹窗-->
      <div class="window" v-if="disIf">
          <!-- <div class="windowChild" :class="{animation:animation}">
              <h3>时间到!!!</h3>
              <p @click="end">确定</p>
          </div> -->
      </div>

      <div class="windowChild" :class="{animation:animation}" v-if="disIf">
              <h3>时间到!!!</h3>
              <p @click="end">确定</p>
      </div>

      <audio src="../../static/muise/bgm.mp3" muted  loop ref="audio"></audio>

    </div>
</template>


<script>
export default {
    data(){
        return {
            hour:null,
            minutes:null,
            seconds:null,
            html:"暂停",
            set:false,
            num:1,  //切换按钮
            disIf:false,  //默认弹窗不显示
            animation:false //默认不添加弹窗动画
        }
    },
    methods:{
        //取消的点击事件
        back(){
            this.$router.back()
        },
        //暂停事件
        pause(){
            this.num++
            if(this.num%2==0){
                this.html="继续"
                this.set=true
                clearInterval(this.timer)
            }else{
                this.html="暂停"
                this.set=false
                this.timefun()
            }
           
        },
        //设置确定按钮的事件
        end(){
            this.disIf=false;
            this.animation=false;

            //暂停音乐
            this.$refs.audio.pause();

            
        }

    },
    mounted() {

      this.hour=this.$route.query.hour
      this.minutes=this.$route.query.minutes
      this.seconds=this.$route.query.seconds

      //把数据处理为数字
      this.hour=parseInt(this.hour)
      this.minutes=parseInt(this.minutes)
      this.seconds=parseInt(this.seconds)
      

      //把总时间转化为秒数
      var target=(this.hour)*3600+(this.minutes)*60+this.seconds


      //把定时器转为一个函数
      this.timefun=()=>{

          this.timer=setInterval(()=>{
          target--

          if(target==0){
              clearInterval(this.timer)

              //显示弹窗并加载动画
              this.disIf=true;
              this.animation=true;

              //开始播放音乐
              this.$refs.audio.play();
             

            //   console.log(this.$refs.audio.play())
          }

          this.hour=parseInt(target/3600)
          this.hour=this.hour>=10?this.hour:"0"+this.hour

          this.minutes=parseInt((target%3600)/60)
          this.minutes=this.minutes>=10?this.minutes:"0"+this.minutes

          this.seconds=(target%3600)%60
          this.seconds=this.seconds>=10?this.seconds:"0"+this.seconds

      },1000)

      }

      this.timefun()
     



    },
}
</script>

<style scoped lang="scss">
@function rem($px){
    @return $px/(41.4*2.65)+rem
}

.timeChange{
    width:100%;
    height:100%;
    position: absolute;
    top:0px;
    left:0px;
    background-color: white;
}
.time{
    width:rem(714);
    height:rem(714);
    border:3px solid #e85623;
    border-radius:50%;
    margin-left:rem(183);
    margin-top:rem(549);
    h1{
        font-size: rem(119);
        color:black;
        text-align: center;
        margin-top:rem(295);
        margin-bottom: rem(51);
    }
    p{
        font-size: rem(41);
        color:#999999;
        text-align: center;
    }

}
.btn{
    margin-top:rem(368);
    text-align: center;
    .btnl{
        display: inline-block;
        width:rem(169);
        height:rem(169);
        border:rem(10) solid #f1f1f1;
        border-radius:50%;
        font-size:rem(37);
        color:black;
        margin-right:rem(120);
        text-align: center;
        line-height:rem(169);
    }
    .btnr{
        display: inline-block;
        width:rem(169);
        height:rem(169);
        border:rem(10) solid #f1f1f1;
        border-radius:50%;
        font-size:37px;
        font-size:rem(37);
        color:#f26611;
        text-align: center;
        line-height: rem(169);
    }
    .btnr.set{
        color:white;
        background-color: #f26611;
    }
}

//设置弹窗样式
.window{
    position: absolute;
    width:100%;
    height:100%;
    top:0px;
    left:0px;
    background-color: rgba(100,100,100,0.3);
}
.windowChild{
    position: absolute;
    width:rem(714);
    height:rem(357);
    left:rem(183);
    top:rem(549);
    padding-top:rem(80);
    background-color: white;
    border-radius:20px;
}
.windowChild h3{
    text-align: center;
    font-size:rem(80);
    color:#999999;
    border-bottom:1px solid rgba(100,100,100,0.6);
    padding-bottom:rem(100);

}
.windowChild p{
    text-align: center;
    font-size: rem(60);
    padding-top:rem(60);
    color:black;
}


//制作向下弹出的动画

@keyframes windows {
    0%{
        transform: translateY(-1000px)
    }
    100%{
        transform: translateY(0px)
    }
}

//设置动画的类
.windowChild.animation{
    animation: windows 0.5s;
}
</style>
