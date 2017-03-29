<template>
  <div class="back-top" v-show="backTopFlag" @click="backTop()">Top</div>
</template>

<script>
  export default {
    data(){
      return {
        backTopFlag: false
      }
    },
    mounted(){
        let _this = this;
      _this.$nextTick(() => {
          document.addEventListener('scroll', function (evt) {
              _this.needTop();
          });
      })
    },
    methods: {
      backTop:function() {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        let dh = parseInt(scrollTop / 30);
        let timer = setInterval(function () {
          dh -= scrollTop;
          if (dh <= 0) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            clearInterval(timer);
          } else {
            document.body.scrollTop = dh;
            document.documentElement.scrollTop = dh;
          }
        }, 10);
        this.backTopFlag = false;
      },
      needTop:function(){
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          if (scrollTop > 300) {
            this.backTopFlag = true;
          } else {
              this.backTopFlag = false;
          }
      }
    }
  }
</script>

<style scoped>
  .back-top{
    width: 30px;
    height:30px;
    line-height: 30px;
    position:fixed;
    bottom: 30px;
    right: 30px;
    border-radius: 50%;
    background-color: #00ad1c;
    color:#fff;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
  }
</style>
