//1.定义数据(实际生产环境中应由后台给出)
var data = [{
    img: 1,
    h3: 'Creativesdfjlkjsdfjl',
    h1: 'DUETJ'
}, {
    img: 2,
    h3: 'Creativesdfjlkjsdfjl',
    h1: 'DUETJ'
}, {
    img: 3,
    h3: 'Creativesdfjlkjsdfjl',
    h1: 'DUETJ'
}, {
    img: 4,
    h3: 'Creativesdfjlkjsdfjl',
    h1: 'DUETJ'
}, {
    img: 5,
    h3: 'Creativesdfjlkjsdfjl',
    h1: 'DUETJ'
}, {
    img: 6,
    h3: 'Creativesdfjlkjsdfjl',
    h1: 'DUETJ'
}, {
    img: 7,
    h3: 'Creativesdfjlkjsdfjl',
    h1: 'DUETJ'
}];
//2.封装公共函数
var g = function(id) {
        if (id.substr(0, 1) == '.') {
            return document.getElementsByClassName(id.substr(1));
        } else {
            return document.getElementById(id);
        }
    }
    //3.添加幻灯片(需在DOM加载完成时调用也就是window.onload)
function addSlider() {
    //3.1 正则匹配替换replace(/^\s*/,'')，replace(/\s*$/,'')替换字符串前面的空格和后面的空格
    var tpl_main = g('template-main').innerHTML.replace(/^\s*/, '').replace(/\s*$/, '');
    var tpl_ctrl = g('template-ctrl').innerHTML.replace(/^\s*/, '').replace(/\s*$/, '');

    //3.2 定义两个最红输出HTML的变量
    var out_main = [];
    var out_ctrl = [];

    //3.3 对HTML中的模板变量进行替换
    for (var i in data) {
        var _html_main = tpl_main
            .replace(/{{slider}}/g, data[i].img)
            .replace(/{{h3}}/g, data[i].h1)
            .replace(/{{h1}}/g, data[i].h3)
            .replace(/{{css}}/g, ['', 'swh-right'][i % 2]); /*扩展幻灯片左右进入*/
        var _html_ctrl = tpl_ctrl.replace(/{{slider}}/g, data[i].img);

        out_main.push(_html_main);
        out_ctrl.push(_html_ctrl);
    }
    //3.4 将替换好的模板回放到DOM中
    g('template-main').innerHTML = out_main.join('');
    g('template-ctrl').innerHTML = out_ctrl.join('');

    //7.增加#main-background
    g('template-main').innerHTML += tpl_main.replace(/{{slider}}/g, '{{slider}}');
    g('main-{{slider}}').id = 'main-background';

}
//5.定义幻灯片切换
function switchSlider(n) {

    //5.1获取当前幻灯片和控制按钮
    var main_item = g('main-' + n),
        ctrl_item = g('ctrl-' + n);

    //5.2获取所有幻灯片和控制按钮,并且清楚active
    var all_main_item = g('.slider-main-item'),
        all_ctrl_item = g('.slider-ctrl-item');
    for (var i = 0, len = all_ctrl_item.length; i < len; i++) {
        all_main_item[i].className = all_main_item[i].className.replace('active', '');
        all_ctrl_item[i].className = all_ctrl_item[i].className.replace('active', '')
    }

    //5.3给当前的添加active
    main_item.className += ' active';
    ctrl_item.className += ' active';

    //7.1切换的时候复制上一张幻灯片到#main-background中
    setTimeout(function() {
        g('main-background').innerHTML = main_item.innerHTML;
    }, 1000)

}
/*
	6.设置图片的高度使其垂直居中
	(ps:因为图片宽度设置的是100%所以高度就是自适应的不确定，为了更好的呈现和显示需要是图片垂直居中在容器中)
*/
function movePicture() {
    var pictures = g('.item-picture');
    for (var i = 0, len = pictures.length; i < len; i++) {
        pictures[i].style.marginTop = -(pictures[i].clientHeight - 400) / 2 + 'px';
    }
}
//4.调用函数
window.onload = function() {
    addSlider();
    switchSlider(1);
    setTimeout(function() {
        movePicture();
    }, 100);
}
