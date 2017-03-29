<template>
  <!-- header -->
  <div id="header">
    <div class="top-bar">
      <div class="top-bar-lt">源自世界</div>
      <div class="top-bar-rt">
        <a href="#" class="icon-qq"></a>
        <a href="#" class="icon-wechat"></a>
        <a href="#" class="icon-sina-weibo"></a>
        <a href="https://github.com/lvzhenbang" class="icon-github"></a>
      </div>
    </div>
    <nav class="nav">
      <a href="#" class="logo"><img src="../assets/images/logo-person.jpg" height="200" width="200" alt="lzb"></a>
      <div class="nav-bar">
        <router-link to="/home">首页</router-link>
        <router-link to="/work">工作串烧</router-link>
        <router-link to="/life">业余生活</router-link>
        <router-link to="/about">关于我</router-link>
      </div>
    </nav>
  </div>
</template>
<style scoped>
  #footer, #header {
    width: 100%;
  }

  #header .top-bar {
    padding: 10px 0;
    zoom: 1;
  }

  #header .top-bar:after {
    display: block;
    content: " ";
    clear: both;
    visibility: hidden;
  }

  #header .top-bar .top-bar-lt, #header .top-bar .top-bar-rt {
    width: 50%;
    height:30px;
    font-size: 14px;
    border-bottom: 3px solid #000
  }

  #header .top-bar .top-bar-lt {
    float: left;
    font-size: 12px;
    text-indent: 1em;
  }

  #header .top-bar .top-bar-rt {
    float: right;
    text-align: right
  }

  #header .top-bar .top-bar-rt a {
    color: #000;
    margin-right: 20px;
  }

  #header .top-bar .top-bar-rt a:hover {
    color: #00ad1c;
    background-color: rgba( 255, 255, 255,  .5);
  }

  #header .nav {
    width: 100%;
    padding: 20px 0;
    border-top: 1px solid #e3e3e8;
    border-bottom: 1px solid #e3e3e8;
    zoom: 1;
  }

  #header .nav:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
  }

  #header .nav .logo {
    display: block;
    width: 70px;
    height: 70px;
    float: left;
    margin: 25px 40px;
    border-radius: 50%;
    overflow: hidden
  }

  #header .nav .nav-bar {
    height: 100%;
    float: left
  }

  #header .nav .nav-bar a {
    display: inline-block;
    height: 100px;
    line-height: 100px;
    padding: 0 25px;
    color: #000;
    font-size: 16px
  }

  #header .nav .nav-bar a.cur, #header .nav .nav-bar a:hover {
    color: red;
    border-bottom: 3px solid #000
  }

  @media screen and (max-width: 749px) {

    #header .top-bar .top-bar-rt a {
      margin-right: 10px
    }

    #header .nav .logo {
      float: none;
      margin: 0 auto;
    }

    #header .nav .nav-bar {
      margin: 10px 0;
      float: none;
      text-align: center;
    }

    #header .nav .nav-bar a {
      height: auto;
      line-height: normal;
      padding: 6px 10px;
    }
  }
</style>
