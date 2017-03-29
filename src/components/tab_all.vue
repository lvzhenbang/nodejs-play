<template>
  <div class="cont-items wk-contents">
    <a href="www/1/index.html"><span>无缝滚不动图</span><span>(WfSlider)</span></a>
    <a href="/pages/2/index.html"><span>弹出式浏览照片</span><span>(LightBox)</span></a>
    <a href="/pages/3/index.html"><span>带预览的图的焦点图</span><span>(PreviewSlider)</span></a>
    <a href="/pages/4/index.html"><span>返回顶部</span><span>(BackTop)</span></a>
  </div>
</template>
<style scoped>
  .work-page .tab-contents .wk-contents {
    box-sizing: border-box;
  }

  .work-page .tab-contents .wk-contents a {
    display: inline-block;
    width: 140px;
    color: #666;
    font-size: 14px;
    text-align: center;
    padding-bottom: 4px;
    margin: 15px 35px;
    border-bottom: 1px dashed #999;
    -webkit-transition: all .5s linear;
    transition: all .5s linear
  }

  .work-page .tab-contents .wk-contents a span {
    display: block;
    width: 100%;
  }

  .work-page .tab-contents .wk-contents a:hover {
    color: #000;
    border-bottom: 1px solid #000
  }

  @media screen and (max-width: 749px) {
    .work-page .tab-contents .wk-contents {
      overflow-y: scroll;
    }
  }
</style>
