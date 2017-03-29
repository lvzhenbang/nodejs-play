/**
 * BK
 * @authors Your Name (you@example.org)
 * @date    2015-12-28 16:41:19
 * @version $Id$
 */

define(['jquery'], function($) {
    /*
        定义插件
    */
    $.fn.extend({
        backtop: function(options) {
            return this.each(function() {
                new BackTop(this, options);
            });
        }
    });
    /*
        构造方法
    */
    function BackTop(element, options) {
        this.options = $.extend({}, BackTop.DEFAULTS, options);
        this.elem = $(element);
        this.root = $('html,body');

        if (this.options.method == 'move') {
            this.elem.on("click", $.proxy(this._move, this));
        } else {
            this.elem.on("click", $.proxy(this._go, this));
        }

        $(window).on("scroll", $.proxy(this._position, this));
    }
    /*
        默认参数
    */
    BackTop.DEFAULTS = {
        method: 'move',
        dist: 0,
        speed: 800
    };
    /*
        _move方法
    */
    BackTop.prototype._move = function() {
            var ops = this.options;
            if ($(window).scrollTop != ops.dist) {
                if (!this.elem.is(":animated")) {
                    this.root.animate({
                        scrollTop: ops.dist
                    }, ops.speed);
                }
            }
        }
        /*
            _go方法
        */
    BackTop.prototype._go = function() {
            var dist = this.options.dist;
            if ($(window).scrollTop != dist) {
                this.root.scrollTop(dist);
            }
        }
        /*
            _position方法
        */
    BackTop.prototype._position = function() {
        var win = $(window),ele = this.elem;
        if (win.scrollTop() > win.height()) {
            ele.fadeIn();
        } else {
            ele.fadeOut();
        }
    }
});
