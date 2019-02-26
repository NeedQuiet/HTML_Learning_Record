window.onload = function () {
    // 创建中间广告样式(a标签背景色)
    let ulLis = $('slider_banner').children[0].children;
    let color_arr = ['#48384F','#171F3B','#4BA8A5','#262D37','#F86641','#5CA200','#36C8D5'];
    for (let i = 0; i < ulLis.length; i++) {
        let a = ulLis[i].firstChild;
        a.style.backgroundColor = color_arr[i];
    }

    (function (window) {
        // 调用选项卡
        tab();

        // 动态创建元素
        autoCreateImg(30);

        // 瀑布流
        waterFull();

        // 动态加载
        let timer = null;// 节流
        window.onscroll = function () {
            // 瀑布流加载新图片的条件
            clearTimeout(timer);
            timer = setTimeout(function () {
                if (checkWillLoadImage()) {
                    // 造数据
                    autoCreateImg(20);
                    waterFull();
                }
            },200);

            // 判断是否吸顶
            let scrollTop = scroll().top;
            if (scrollTop >= 150){
                $('top_nav').style.display = 'block';
                $('elevator').style.display = 'block';
            } else{
                $('top_nav').style.display = 'none';
                $('elevator').style.display = 'none';
            }

            // 滚回顶部
            $('elevator').onclick = function () {
                buffer(document.documentElement,{scrollTop:0},null);
            }
        };

        // 监听登录、mask
        $('login').onclick = function () {
            show($('mask'))
        };

        $('close_btn').onclick = function () {
            hide($('mask'));
        };

        // 广告轮播
        bannerAutoPlay();

    })(window);

    function tab() {
        // 获取需要的标签
        let allList = $('tab_header').getElementsByTagName('li');
        let doms = $('tab_content').getElementsByClassName('dom');
        let lastOne = 0;// 高级排他

        // 遍历监听
        for (let i = 0; i < allList.length; i++) {
            let li = allList[i];
            (function (index) {
                li.onmousedown = function () {
                    // 清除样式
                    allList[lastOne].className = '';
                    doms[lastOne].style.display = 'none';
                    // 设置选中
                    this.className = 'current';
                    doms[index].style.display = 'block';
                    // 赋值
                    lastOne = index;
                }
            })(i);
        }
    }

    function autoCreateImg(num) {
        // 模拟数据
        let json = [
            {txt:'卷宗如何丢失？案件审理是否公正？图解凯奇莱案调查结果'},
            {txt:'王兆星：过去两年处罚违规银行保险机构近6000家'},
            {txt:'四川荣县发生4.9级地震 已致2人死亡'},
            {txt:'14岁少年被撞身亡，车主肇事逃逸，一块车头碎片成破案关键'},
            {txt:'应急管理部：内蒙古21死事故涉事企业有多处违法违规'},
            {txt:'A股三大股指放量飙升逾5%！两市成交上万亿 券商股全线涨停'}
        ];
        let color_arr = ['skyblue','deepskyblue','lightskyblue','yellowgreen','green','darkseagreen'];

        // 获取dom-pull
        let dom_pull = $('dom_pull');

        for (let i = 0; i < num; i++) {
            let h = Math.random() * 150 +170;
            let box = document.createElement('div');
            box.className = 'box';
            dom_pull.appendChild(box);

            // pic
            let pic = document.createElement('div');
            pic.className = 'pic';
            box.appendChild(pic);
            // pic > img
            let img = document.createElement('img');
            let img_index = parseInt(Math.random() * color_arr.length);
            img.style.backgroundColor =  color_arr[img_index];
            img.style.height = h + 'px';
            pic.appendChild(img);
            // pic > cover
            let cover = document.createElement('div');
            cover.className = 'cover';
            pic.appendChild(cover);

            // p
            let p = document.createElement('p');
            p.innerText = json[parseInt(Math.random() * json.length)].txt;
            box.appendChild(p);

            // btn-box
            let btn_box = document.createElement('div');
            btn_box.className = 'btn-box';
            box.appendChild(btn_box);
            // btn-box > collect
            let collect_a = document.createElement('a');
            collect_a.className = 'collect';
            collect_a.innerText = '采集';
            btn_box.appendChild(collect_a);
            // btn-box > like
            let like_a = document.createElement('a');
            like_a.className = 'like';
            btn_box.appendChild(like_a);
            // btn-box > like > heart
            let heart_span = document.createElement('span');
            heart_span.className = 'heart';
            like_a.appendChild(heart_span);
        }
    }

    function waterFull() {
        // 列数
        let cols = 5;
        let width = 234+12+2;

        // 定义高度数组
        let heightArr = []; // 此数组内容上限始终为列数，方便定位
        let boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;

        let allBox = document.getElementsByClassName('box');

        //选中
        let lastOne = -1;// 高级排他
        let coverS = document.getElementsByClassName('cover');
        let btn_boxS = document.getElementsByClassName('btn-box');

        // 遍历盒子
        for (let i = 0; i < allBox.length; i++) {
            // 求出每一个盒子的高度
            boxHeight = allBox[i].offsetHeight + 12;
            if (i < cols) { // 第一行
                heightArr.push(boxHeight);
                allBox[i].style.position = 'relative';
            }else{ // 剩余行, 逐个定位
                // 取出最矮的盒子高度
                minBoxHeight = Math.min.apply(this,heightArr);
                // 求出最矮盒子对应的索引
                minBoxIndex = getMinBoxIndex(heightArr,minBoxHeight);

                // 盒子定位
                allBox[i].style.position = 'absolute';
                allBox[i].style.left = width * minBoxIndex + 20 +'px';// 20是padding
                allBox[i].style.top = minBoxHeight + 20 + 'px';

                // 更新数组中的高度
                heightArr[minBoxIndex] += boxHeight;
            }

            (function (index) {
                allBox[index].onmouseover = function () {
                    if (lastOne >= 0) {
                        coverS[lastOne].style.display = 'none';
                        btn_boxS[lastOne].style.display = 'none';
                    }

                    coverS[index].style.display = 'block';
                    btn_boxS[index].style.display = 'block';
                    lastOne = index;
                };

                allBox[index].onmouseout = function () {
                    if (lastOne >= 0) {
                        coverS[index].style.display = 'none';
                        btn_boxS[index].style.display = 'none';
                        lastOne = -1;
                    }
                }
            })(i);
        }

        // 获取最后一个盒子
        let lastBox = allBox[allBox.length - 1];
        $('tab_content').style.height = lastBox.offsetHeight + lastBox.offsetTop + 500 + 'px';
    }

    /**
     * 获取数组中最矮盒子高度的索引
     * @param arr
     * @param val
     * @returns {number}
     */
    function getMinBoxIndex(arr, val) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                return i;
            }
        }
    }

    /**
     * 判断是否具备加载图片的条件
     */
    function checkWillLoadImage() {
        // 获取最后一个盒子
        let allBox = document.getElementsByClassName('box');
        let lastBox = allBox[allBox.length - 1];

        // 求出最后一个盒子的高度的一半 + offsetTop
        let lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

        // 求出屏幕的高度
        let screenW = document.documentElement.clientHeight || document.body.clientHeight;

        // 求出页面偏离浏览器的高度
        let scrollTop = scroll().top;

        return lastBoxDis <= screenW + scrollTop;
    }

    function bannerAutoPlay() {
        // 获取所有的li标签
        let allLis = $('slider_banner').getElementsByTagName('li');
        let index = 0;
        // 开始定时器
        setInterval(function () {
            // 改变透明度
            for (let i = 0; i < allLis.length; i++) {
                let li = allLis[i];
                buffer(li, {opacity:0}, null);
            }
            let currentLi = allLis[index];
            buffer(currentLi, {opacity:1}, function () {
                index++;
                if (index === allLis.length) {
                    index = 0;
                }
            });
        },2000);
    }
};

