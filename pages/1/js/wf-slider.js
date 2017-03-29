/*
* @name:wfSlider
* @date:2016-06-23
* @author:wuwangcheng
* @email:395212731@qq.com
* */
;(function($){
    'use strict';
    /*
    * 无缝轮播构造函数
    * */
    function wfSlider(options){
        //初始化参数
        options = options || {};
        this.id = $(options.id);
        this.data = options.data || '';

        //初始化函数init
        this.init();
    }

    wfSlider.prototype = {
        init:function(){
            //渲染dom
            this.render();

            /*
            * 待dom渲染完成后,初始化变量并赋值
            *
            * @param index 元素下标
            * @param length 元素个数
            * @param size 元素大小这里指宽度width
            * @param wraper 元素ul
            * @param prevBtn 向上按钮
            * @param nextBtn 向下按钮
            * */
            this.timer = null;
            this.index = 1;
            this.len = this.data.length;
            this.sliderWidth = this.id.width();
            this.wraper = this.id.find(".slider-main");
            this.controll = this.id.find(".slider-controll");
            //给一个元素添加选中的效果
            this.controll.find("span:first").addClass("active");
            //绑定事件
            this.bind();
            //自动播放
            this.autoPlay();
        },
        render:function(){
            /* 创建dom */
            var html_ul = $('<ul class="slider-main"></ul>');
            var html_li = '';
            var html_li_first = null;
            var html_li_last = null;
            var html_prev_btn = $('<span class="btn-slider btn-prev"><</span>');
            var html_next_btn = $('<span class="btn-slider btn-next">></span>');
            var html_controll = $('<div class="slider-controll"></div>');
            var html_ctro_btn = '';

            for(var i= 0,len=this.data.length;i<len;i++){
                html_li += '<li><img src="'+this.data[i]+'"></li>';
                html_ctro_btn += '<span></span>';
            }

            /* 把创建好的dom插入到页面中 */
            html_controll.html(html_ctro_btn);
            html_ul.append(html_li);
            html_li_first = html_ul.find("li:first").clone();
            html_li_last  = html_ul.find("li:last").clone();
            html_ul.append(html_li_first).prepend(html_li_last);

            this.id.append(html_ul,html_prev_btn,html_next_btn,html_controll);
        },
        bind:function(){
            /*
             * 无缝轮播原理分析：
             * 1.克隆第一张图插入到最后
             * 2.克隆最后一张图插入到第一张图前面
             * 3.当滚动到辅助图的时候(注意此处两步非常重要)：
             *   1).直接用css的方式没有动画的效果给拉到真正的图上,此处肉眼是看不出来的
             *   2).接着把index设置成正在图的下一张
             *   例如：从第一张图开始点击prev按钮会显示最后一张图的辅助图，接下来再点击的时候就会
             *   进入到我们的判断的那中，然后拉回到真正的图上比如说是第五章，紧接着设置index让第四章显示
             *   这样就可以真正实现无缝轮播啦~
             * */

            var self = this;

            /* 给向上btn-prev按钮绑定点击事件 */
            this.id.on('click','span.btn-prev',function(e){
                e.preventDefault();
                self.playPrev();
            });

            /* 给向下btn-next按钮绑定点击事件 */
            this.id.on('click','span.btn-next',function(e){
                e.preventDefault();
                self.playNext();
            });

            /* 给向上contro按钮绑定点击事件 */
            this.controll.on('click','span',function(){
                self.index = $(this).index()+1;
                self.go(self.index);
            });

            /* 鼠标悬浮在元素上的时候清除自动播放离开则继续自动播放 */
            this.id.hover(function(){
                clearInterval(self.timer);
            },function(){
                self.autoPlay();
            });
        },
        playPrev:function(){
            this.index--;
            if(this.index === -1){
                this.wraper.css('left',-this.sliderWidth*this.len);
                this.index = this.len-1;
            }
            this.go(this.index);
        },
        playNext:function(){
            this.index++;
            if(this.index === this.len+2){
                this.wraper.css('left',-this.sliderWidth);
                this.index = 2;
            }
            this.go(this.index);
        },
        autoPlay:function(){
            var self = this;
            this.timer = setInterval(function(){
                self.playNext();
            },3000);
        },
        go:function(index){
            var self = this;
            this.wraper.stop().animate({
                left:-this.sliderWidth*index
            },500,function(){
                if(index == 4) index = 1;
                self.controll.find("span").eq(index-1).addClass("active").siblings("span").removeClass("active");
            });
        }
    };

    window.wfSlider = wfSlider;
})(jQuery);