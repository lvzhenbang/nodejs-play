;(function($,window){
    //构造函数
    var LightBox = function(options){
        this.elem = options.elem;

        this.init();//初始化
        this.renderDOM();//渲染DOM
        this.bind();//绑定事件
    };
    //构造函数的原型
    LightBox.prototype = {
        init:function(){
            this.winWidth = $(window).width();
            this.winHeight = $(window).height();
            this.domBody = $(document.body);
        },
        renderDOM:function(){
            //创建dom:遮罩层和弹出层
            this.popMask = $('<div id="lightbox-mask"></div>');
            this.popWrap = $('<div id="lightbox-wrap"></div>');

            //拼接html
            var html = [];
            html.push('<div class="lightbox-picture">');
            html.push('<img class="lightbox-img" src="" />');
            html.push('<span class="lightbox-btn prev-btn"></span>');
            html.push('<span class="lightbox-btn next-btn"></span>');
            html.push('</div>');
            html.push('<div class="lightbox-caption">');
            html.push('<h3 class="lightbox-caption-desc">descrition</h3>');
            html.push('<p class="lightbox-caption-ind">curr 1 of 4</p>');
            html.push('<span class="lightbox-close-btn"></span>');
            html.push('</div>');

            //将元素插入到body中
            this.popWrap.html(html.join(''));
            this.domBody.append(this.popMask,this.popWrap);
        },
        bind:function(){
            var self = this;

            //获取DOM
            this.popPicture = this.popWrap.find("div.lightbox-picture");
            this.popCaption = this.popWrap.find("div.lightbox-caption");
            this.popImage = this.popWrap.find("img.lightbox-img");
            this.popPrevBtn = this.popWrap.find("span.prev-btn");
            this.popNextBtn = this.popWrap.find("span.next-btn");
            this.popDesc = this.popWrap.find("h3.lightbox-caption-desc");
            this.popInd = this.popWrap.find("p.lightbox-caption-ind");
            this.popCloseBtn = this.popWrap.find("span.lightbox-close-btn");

            //组名及存储一组数据的数组
            this.groupName = null;
            this.groupData = [];
            //绑定事件
            this.domBody.on('click',this.elem,function(e){
                e.stopPropagation();
                var _this = $(this);
                var curGroupName = _this.attr('data-group');
                if(curGroupName != self.groupName){
                    self.groupName = curGroupName;
                    self.getDataByGroupName();
                }

                self.initLightBox(_this);
            });

            this.popCaption.on('click',this.popCloseBtn,function(e){
                e.stopPropagation();
                self.popWrap.fadeOut();
                self.popMask.fadeOut();
            });
        },
        //根据组名获取一组数据
        getDataByGroupName:function(){
            var groupList = this.domBody.find('*[data-group='+this.groupName+']');
        },
        initLightBox:function(_this){
            var self = this;
            var imgUrl = _this.attr('src');

            //加载时先隐藏Picture和Caption区域
            this.popImage.hide();
            this.popCaption.hide();

            var wrapWidth = this.popWrap.width();
            var wrapHeight = this.popWrap.height();
            //显示遮罩层和弹出窗
            this.popMask.fadeIn();
            this.popWrap.fadeIn();
            this.popWrap.css({
                top:-this.winHeight,
                marginLeft:-(wrapWidth/2)
            }).animate({
                top:(this.winHeight-wrapHeight)/2
            },function(){
                self.loadImages(imgUrl);
            });
        },
        loadImages:function(imgUrl){
            var self = this;
            //加载的时候先初始化一下，保证下面每次获取图片的宽高都是最新的
            this.popImage.css({width:'auto',height:'auto'}).hide();

            this.imgIsComplete(imgUrl,function(){
                //设置图片的地址并获得图片的宽高
                self.popImage.attr('src',imgUrl);
                var imgWidth = self.popImage.width();
                var imgHeight = self.popImage.height();
                console.log('原图:'+imgWidth+'---'+imgHeight);

                var scale = Math.min(self.winWidth/(imgWidth+20),self.winHeight/(imgHeight+20),1);

                imgWidth = Math.floor(imgWidth * scale);
                imgHeight = Math.floor(imgHeight * scale);

                self.popWrap.animate({
                    width:imgWidth,
                    height:imgHeight,
                    marginLeft:-(imgWidth/2),
                    top:(self.winHeight-imgHeight)/2
                },function(){
                    self.popImage.css({
                        width:imgWidth-20,
                        height:imgHeight-20
                    }).fadeIn();
                    self.popCaption.fadeIn();
                })
                console.log('计算:'+imgWidth+'---'+imgHeight);
                console.log('视口:'+self.winWidth+'---'+self.winHeight);
                console.log('*********************************************');
            });
        },
        imgIsComplete:function(imgUrl,callback){
            var img = new Image();
            if(!!window.ActiveXObject){
                img.onreadystatechange = function(){
                    if(this.readyState == "complete"){
                        callback();
                    }
                }
            }else{
                img.onload = function(){
                    callback();
                }
            }
            img.src = imgUrl;
        }
    };
    window['LightBox'] = LightBox;
})(jQuery,window);