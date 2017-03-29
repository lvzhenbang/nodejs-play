<template>
  <h1 v-if="requestStatus">内容建设中...</h1>
  <div class="tab-demo" v-else>
    <div class="text-list" v-for="item in demoList">
      <div class="list-item">
        <span v-text="demoTitle"></span>
        <div v-text="item.title"></div>
      </div>
      <div class="list-item list-item-two">
        <span v-text="demoRes"></span>
        <a :href="item.url" v-text="item.url"></a>
      </div>
      <div class="list-item">
        <span v-text="demoDesc"></span>
        <div class="demo-desc" v-text="item.description"></div>
      </div>
      <div class="list-item">
        <span v-text="demoSum"></span>
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
        demoTitle: 'demo名称:',
        demoRes: 'demo来源:',
        demoDesc: 'demo描述:',
        demoSum: '总结:',
        demoList: []
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
          let resData = res.data.demo;
          if(resData && resData.length !== 0){
            _this.requestStatus = false;
            _this.demoList = resData;
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
  .tab-demo{
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
