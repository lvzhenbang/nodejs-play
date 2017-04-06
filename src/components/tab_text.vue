<template>
  <h1 v-if="requestStatus">内容建设中...</h1>
  <div class="tab-text" v-else v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
       infinite-scroll-distance="5">
    <div class="text-list" v-for="item in textList">
      <div class="list-item">
        <span v-text="textTitle"></span>
        <div v-text="item.title"></div>
      </div>
      <div class="list-item list-item-two">
        <span v-text="textRes"></span>
        <a class="text-overflow" :href="item.url" v-text="item.url"></a>
      </div>
      <div class="list-item">
        <span v-text="textDesc"></span>
        <div class="text-desc" v-text="item.description"></div>
      </div>
      <div class="list-item">
        <span v-text="textSum"></span>
        <div class="text-sum" v-text="item.summarize"></div>
      </div>
    </div>
    <div class="content-over" v-show="tips">已没有更多数据...</div>
    <div class="loading" v-show="loading"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import infiniteScroll from 'vue-infinite-scroll'

  Vue.use(infiniteScroll);
  export default {
    data(){
      return {
        requestStatus: false,
        busy: false,
        loading: false,
        tips: false,
        textTitle: '文章标题:',
        textRes: '文章来源:',
        textDesc: '文章描述:',
        textSum: '总结:',
        textList: [],
        num: 5
      }
    },
    mounted: function () {
//      let _this = this;
//      _this.$nextTick(function () {
//        _this.castView();
//      })
    },
    methods: {
      castView: function () {
        let _this = this;
        _this.$http.get('/static/life.json').then((res) => {
          let resData = res.data.text.slice(_this.num - 5, _this.num);
          _this.requestStatus = false;
          if (resData.length !== 0) {
            _this.loading = false;
            for (let i in resData) {
              this.textList.push({
                title: resData[i].title,
                url: resData[i].url,
                description: resData[i].description,
                summarize: resData[i].summarize
              });
            }
            _this.busy = false;
            _this.num += 5;
          } else {
            this.busy = true;
            this.tips = true;
            this.loading = false;
          }
        },(res) => {
          _this.requestStatus = true;
        })
      },
      loadMore() {
        this.busy = true;
        this.loading = true;
        setTimeout(() => {
          this.castView();
        }, 1000);
      }
    }
  }
</script>
<style scoped>
  .tab-text {
    width: 987px;
    height: 500px;
    margin: 0 auto;
    overflow-y: scroll;
  }

  .text-list {
    width: 440px;
    margin: 20px 20px;
    float:left;
    text-align: left;
    border-bottom: 1px solid #cecece;
  }

  .list-item .text-overflow{
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  @media screen and (max-width:749px){
    .tab-text {
      width: 100%;
    }

    .text-list {
      width: 90%;
      margin: 20px 5%;
      float:none;
    }
  }

  .text-list .list-item {
    width: 100%;
    padding: 4px 0;
  }

  .list-item span, .list-item a {
    display: block
  }

  .list-item span {
    font-size: 16px;
    font-weight: 600;
  }

  .list-item div, .list-item a {
    text-indent: 2em;
    padding: 4px 0;
  }

  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10000;
    width: 16px;
    height: 16px;
    margin: -16px 0 0 -16px;
    background: url(../assets/images/loading.gif);
  }
</style>
