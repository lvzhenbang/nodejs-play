<template>
  <h1 v-if="requestStatus">内容建设中...</h1>
  <div class="tab-music" v-else>
    <a v-for="item in musicList" :href="item.url" v-text="item.title"></a>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        requestStatus: false,
        musicList: []
      }
    },
    mounted: function(){
        let _this = this;
        _this.$nextTick(function(){
            _this.castView()
        })
    },
    methods: {
        castView: function(){
            let _this = this;
            _this.$http.get('/static/life.json').then((res) =>{
              let resData = res.data.music;
              if(resData && resData.length !== 0){
                _this.requestStatus = false;
                _this.musicList = resData;
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
  .tab-music{
    text-align: left;
  }
  .tab-music a {
    display: inline-block;
    min-width: 130px;
    padding: 10px 20px;
    color: #666;
    font-size: 14px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    cursor: pointer;
    -webkit-transition: all .5s linear;
    transition: all .5s linear
  }

  .tab-music a:hover {
    color: #fff;
    background: #333
  }

  @media screen and (max-width: 749px) {
    .tab-music {
      width: 100%;
      max-height: 300px;
      overflow-y: scroll
    }
  }
</style>
