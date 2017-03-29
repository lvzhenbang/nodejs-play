<template>
  <h1 v-if="requestStatus">内容建设中...</h1>
  <div class="tab-animate" v-else>
    <div class="text-list" v-for="item in animateList">
      <div class="list-item">
        <span v-text="animateTitle"></span>
        <div v-text="item.title"></div>
      </div>
      <div class="list-item list-item-two">
        <span v-text="animateRes"></span>
        <a :href="item.url" v-text="item.url"></a>
      </div>
      <div class="list-item">
        <span v-text="animateDesc"></span>
        <div class="demo-desc" v-text="item.description"></div>
      </div>
      <div class="list-item">
        <span v-text="animateSum"></span>
        <div class="text-sum" v-text="item.summarize"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        requestStatus: false,
        animateTitle: 'demo名称:',
        animateRes: 'demo来源:',
        animateDesc: 'demo描述:',
        animateSum: '总结:',
        animateList: []
      }
    },
    mounted:function(){
      let _this = this;
      _this.$nextTick(function(){
        _this.castView();
      })
    },
    methods: {
      castView: function(){
        let _this = this;
        _this.$http.get('/static/life.json').then((res) => {
          let resData = res.data.animate;
          if(resData && resData.length !== 0){
            _this.requestStatus = false;
            _this.animateList = resData;
          } else {
            _this.requestStatus = true;
          }
        },(res) => {
          _this.requestStatus = true;
        })
      }
    }
  }
</script>
<style scoped>
  .tab-animate{
    width: 100%;
    min-height: 500px;
  }

  .text-list{
    width:90%;
    margin:20px 5%;
    text-align: left;
    border-bottom:1px solid #cecece;
  }

  .text-list .list-item{
    width:100%;
    padding:4px 0;
  }

  .list-item span, .list-item a{
    display:block
  }

  .list-item span{
    font-size:16px;
    font-weight:600;
  }

  .list-item div, .list-item a{
    text-indent: 2em;
    padding: 4px 0;
  }



  @media screen and (max-width: 749px) {

  }
</style>
