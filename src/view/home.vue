<template>
  <div>
    <div id="bg-img"></div>
    <div id="container">
      <!-- header -->
      <div class="index-main">
        <div class="index-user-info">
          <a class="index-photo" href="javascript:;"><img src="../assets/images/logo-person.jpg" alt="lzb"/></a>
          <h3 class="index-name">源自世界</h3>
          <p class="index-desc">海是蓝色的吗？也许我们并不在乎其本身的颜色~</p>
        </div>
        <div class="index-nav">
          <router-link to="/home">首页</router-link>
          <router-link to="/work">工作串烧</router-link>
          <router-link to="/life">业余生活</router-link>
          <router-link to="/about">关于我</router-link>
        </div>
      </div>
      <!-- animate -->
      <div class="index-animate-rains"></div>
      <!-- footer -->
      <div class="index-footer">
        &copy; 2017-2018 lvzhenbang. All rights reserved.
      </div>
    </div>
  </div>
</template>
<style scoped>
  #bg-img, #container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .about-page .about-title:after, .index-animate-rains:after, .index-animate-rains:before, .time-wraper .items .items-text:after, .time-wraper .items .items-text:before, .time-wraper .lines:after {
    content: ""
  }

  #bg-img {
    z-index: -1;
    background: url(../assets/images/bg.jpg) center no-repeat;
    background-size: 100% 100%
  }

  #container {
    z-index: 1;
    color: #fff;
    background: rgba(0, 0, 0, .6)
  }

  .index-main {
    position: absolute;
    top: 20%;
    left: 50%;
    z-index: 2;
    width: 500px;
    margin-left: -250px;
    text-align: center
  }

  .index-main .index-user-info .index-photo {
    display: inline-block;
    width: 160px;
    height: 160px;
    padding: 5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, .5);
    box-shadow: rgba(255, 255, 255, .5) 0 0 4px 4px;
    box-sizing: border-box;
    overflow: hidden;
    -webkit-transition: all 1s linear;
    transition: all 1s linear
  }

  .index-main .index-user-info .index-photo img {
    width: 150px;
    height: 150px;
    border-radius: 50%
  }

  .index-main .index-user-info .index-photo:hover {
    background: #fff;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg)
  }

  .index-main .index-user-info .index-name {
    padding-top: 4px;
    font-size: 18px
  }

  .index-main .index-user-info .index-desc {
    padding-top: 6px;
    font-size: 14px;
  }

  .index-main .index-nav {
    width: 100%;
    padding: 14px;
    text-align: center;
    font-size: 0
  }

  .index-main .index-nav a {
    height: 15px;
    line-height: 15px;
    vertical-align: middle;
    padding: 0 10px;
    color: #b0b0b0;
    font-size: 16px;
    border-right: 2px solid #b0b0b0;
    -webkit-transition: all .5s ease;
    transition: all .5s ease
  }

  .index-main .index-nav a:hover {
    color: #fff
  }

  .index-main .index-nav a:last-of-type {
    border: none
  }

  .index-animate-rains {
    position: fixed;
    top: 70%;
    left: 50%;
    display: inline-block;
    width: 30px;
    height: 55px;
    margin-top: 30px;
    margin-left: -15px;
    border: 2px solid #fff;
    border-radius: 15px
  }

  .index-animate-rains:before {
    position: absolute;
    top: -50px;
    left: -86px;
    width: 200px;
    height: 2px;
    border-radius: 100%;
    background: #fff
  }

  .index-animate-rains:after {
    position: absolute;
    top: 0;
    left: 11px;
    width: 6px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
    -webkit-animation: rains 2.2s infinite linear;
    animation: rains 2.2s infinite linear;
    -webkit-transition: all 1s linear 1s;
    transition: all 1s linear 1s
  }

  @keyframes rains {
    from {
      top: 5px;
      opacity: 0
    }
    to {
      top: 35px;
      opacity: 1
    }
  }

  @-webkit-keyframes rains {
    from {
      top: 5px;
      opacity: 0
    }
    to {
      top: 35px;
      opacity: 1
    }
  }

  .index-footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    padding: 16px 0;
    text-align: center;
    margin: 0 auto;
    color: #fff;
    font-size: 12px;
    border-top: 1px solid #fff
  }
</style>
