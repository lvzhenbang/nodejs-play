<template>
  <div>
    <header-bar></header-bar>
    <!-- main -->
    <div class="wrapper-main about-page clearfix">
      <!-- 自我介绍 -->
      <div class="about-text-intrd">
        <h3 class="about-title" v-text="aboutTitle"></h3>
        <p class="about-desc" v-text="aboutDesc"></p>
      </div>
      <!-- 时间轴 -->
      <div class="about-time-axis">
        <h3 class="about-title" v-text="timeTitle"></h3>
        <div class="time-wrapper">
          <div class="lines"></div>
          <div class="items clearfix" v-for="item in personList">
            <div class="sign"></div>
            <div class="items-date" v-text="item.time"></div>
            <div class="items-text" v-text="item.address"></div>
          </div>
        </div>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
  import HeaderBar from '../components/header.vue'
  import FooterBar from '../components/footer.vue'


  export default {
    data(){
      return {
        aboutTitle: '',
        aboutDesc: '',
        timeTitle: '',
        personList: []
      }
    },
    components: {
      HeaderBar,
      FooterBar
    },
    mounted: function () {
      let _this = this;
      _this.$nextTick(function () {
        _this.castView();
      })
    },
    methods: {
      castView: function () {
        let _this = this;
        _this.$http.get('http://localhost:8080/static/about-me.json').then(function (res) {
          let resValue = res.data;
          _this.aboutTitle = resValue.firstTitle;
          _this.aboutDesc = resValue.firstDesc;
          _this.timeTitle = resValue.twoTitle;
          _this.personList = resValue.personInfo;
        });
      }
    }
  }
</script>
<style scoped>
  .wrapper-main {
    width: 100%;
    margin: 0 auto;
    padding: 16px 20px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box
  }

  .about-page .about-title {
    position: relative;
    padding: 8px;
    font-size: 16px;
    text-indent: 10px
  }

  .about-page .about-title:after {
    position: absolute;
    top: 4px;
    left: 0;
    width: 3px;
    height: 15px;
    background: #000
  }

  .about-page .about-desc {
    line-height: 25px;
    color: #4c4c4c;
    font-size: 14px;
    text-indent: 20px
  }

  .about-time-axis {
    margin-top: 20px
  }

  .time-wrapper {
    position: relative;
    max-width: 800px;
    padding: 20px 0;
    margin: 20px auto
  }

  .time-wrapper .lines {
    position: absolute;
    top: 0;
    left: 165px;
    z-index: 10;
    width: 1px;
    height: 100%;
    background: #000
  }

  .time-wrapper .lines:after {
    position: absolute;
    top: -11px;
    left: -5px;
    width: 10px;
    height: 10px;
    border: 1px solid #000;
    border-radius: 100%;
    background: #000
  }

  .time-wrapper .items {
    position: relative;
    margin-bottom: 20px;
    cursor: pointer;
    overflow: hidden
  }

  .time-wrapper .items .sign {
    position: absolute;
    top: -50px;
    left: 160px;
    z-index: 11;
    width: 9px;
    height: 9px;
    border: 1px solid #000;
    background: #000;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: sliderDown 1s linear .2s forwards;
    animation: sliderDown 1s linear .2s forwards;
    -webkit-transition: transform 1s linear;
    -webkit-transition: -webkit-transform 1s linear;
    transition: -webkit-transform 1s linear;
  }

  @keyframes sliderDown {
    from {
      top: -50px
    }
    to {
      top: 8px
    }
  }

  @-webkit-keyframes sliderDown {
    from {
      top: -50px
    }
    to {
      top: 8px
    }
  }

  .time-wrapper .items .items-date {
    width: 150px;
    height: 20px;
    line-height: 25px;
    float: left;
    color: #4c4c4c;
    font-size: 14px;
    text-align: right;
    margin-right: 10px;
    transform: translateX(-200px);
    -webkit-transform: translateX(-200px);
    -webkit-animation: sliderRight .8s linear .2s forwards;
    animation: sliderRight .8s linear .2s forwards;
    -webkit-transition: transform 1s linear;
    -webkit-transition: -webkit-transform 1s linear;
    transition: -webkit-transform 1s linear;
  }

  .time-wrapper .items .items-text {
    position: relative;
    max-width: 600px;
    float: left;
    margin-left: 20px;
    padding: 10px;
    color: #4c4c4c;
    font-size: 14px;
    border: 1px solid #6c6c6c;
    border-radius: 3px;
    transform: translateX(350px);
    -webkit-transform: translateX(350px);
    -webkit-animation: sliderLeft .5s linear .2s forwards;
    animation: sliderLeft .5s linear .2s forwards;
    -webkit-transition: transform 1s linear;
    -webkit-transition: -webkit-transform 1s linear;
    transition: -webkit-transform 1s linear;
  }

  @media screen and (max-width: 749px) {
    .time-wrapper .items .items-text {
      width: 45%;
    }
  }

  @keyframes sliderRight {
    from {
      -webkit-transform: translateX(-200px);
      transform: translateX(-200px)
    }
    to {
      -webkit-transform: translateX(0);
      transform: translateX(0)
    }
  }

  @-webkit-keyframes sliderRight {
    from {
      -webkit-transform: translateX(-200px);
      transform: translateX(-200px)
    }
    to {
      -webkit-transform: translateX(0);
      transform: translateX(0)
    }
  }

  @keyframes sliderLeft {
    from {
      -webkit-transform: translateX(350px);
      transform: translateX(350px)
    }
    to {
      -webkit-transform: translateX(0);
      transform: translateX(0)
    }
  }

  @-webkit-keyframes sliderLeft {
    from {
      -webkit-transform: translateX(350px);
      transform: translateX(350px)
    }
    to {
      -webkit-transform: translateX(0);
      transform: translateX(0)
    }
  }

  .time-wrapper .items .items-text:before {
    position: absolute;
    top: 7px;
    left: -11px;
    border: 5px solid transparent;
    border-right-color: #000
  }

  .time-wrapper .items .items-text:after {
    position: absolute;
    top: 7px;
    left: -10px;
    border: 5px solid transparent;
    border-right-color: #fff
  }

</style>
