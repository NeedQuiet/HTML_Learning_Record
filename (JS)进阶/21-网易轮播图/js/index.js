window.onload = function () {
    // 获取需要的标签
    let slider = $('slider');
    let slider_main = $('slider_main');
    let slider_main_img = slider_main.children;
    let slider_ctl = $('slider_ctl');

    let index_now = 0;
    // 动态创建指示器
    for (let i = 0; i < slider_main_img.length; i++) {
        let span = document.createElement('span');
        span.className = 'slider-ctl-icon';
        slider_ctl.insertBefore(span,slider_ctl.children[1]);
        span.index = slider_main_img.length - i - 1;
    }

    // 选中第一个指示器
    slider_ctl.children[1].className = 'slider-ctl-icon current';

    // 让滚动的内容归位
    let scroll_width = slider.offsetWidth;
    for (let i = 1; i < slider_main_img.length; i++) {
        slider_main_img[i].style.left = scroll_width + 'px';
    }

    // 遍历监听操作
    let slider_ctl_child = slider_ctl.children;
    for (let i = 0; i < slider_ctl_child.length; i++) {
         // 监听点击
        slider_ctl_child[i].onmousedown = function () {
            if (this.className === 'slider-ctl-prev'){
                /*
                   1.当前可视区域的图片快速右移
                   2.上一张图片快速出现在可视区域的左边
                   3.让这张图片做动画进入
                 */
                buffer(slider_main_img[index_now],{'left':scroll_width});
                index_now --;
                if (index_now < 0) {
                    index_now = slider_main_img.length - 1;
                }
                slider_main_img[index_now].style.left = -scroll_width + 'px';
                buffer(slider_main_img[index_now],{'left':0});
            }else if (this.className === 'slider-ctl-next') {
                next();
            }else{
                /*
                    1.用当前点击的索引和选中索引对比
                    2.点击的 > 选中的，相当于点击了右边的按钮
                    3.点击的 < 选中的，相当于点击了左边的按钮
                 */

                // 获取索引
                let index = this.index;
                if (index !== index_now) {
                    click_ctl_icons();
                }

                function click_ctl_icons() {
                    let scroll = index > index_now ? scroll_width : -scroll_width;
                    buffer(slider_main_img[index_now],{'left':scroll});
                    index_now = index;
                    slider_main_img[index_now].style.left = -scroll + 'px';
                    buffer(slider_main_img[index_now],{'left':0});
                }
            }
            changeCtlIndex();
        }
    }

    function changeCtlIndex() {
        let slider_ctl_icons = document.getElementsByClassName('slider-ctl-icon');
        for (let j = 0; j < slider_ctl_icons.length; j++) {
            slider_ctl_icons[j].className = 'slider-ctl-icon';
        }
        slider_ctl_icons[index_now].className = 'slider-ctl-icon current'
    }

    // 自动播放
    let timer = setInterval(next,1000);
    function next() {
        /*
           1.当前可视区域的图片快速左移
           2.上一张图片快速出现在可视区域的右边
           3.让这张图片做动画进入
         */
        buffer(slider_main_img[index_now],{'left':-scroll_width});
        index_now ++;
        if (index_now >= slider_main_img.length) {
            index_now = 0;
        }
        slider_main_img[index_now].style.left = scroll_width + 'px';
        buffer(slider_main_img[index_now],{'left':0});
        changeCtlIndex();
    }

    // 设置和清除定时器
    slider.onmouseover = function () {
        clearInterval(timer);
    };
    slider.onmouseout = function () {
        timer = setInterval(next,1000);
    };

};