
window.onload = function () {
   // 创建40个图片
   createItems(140);

   // 实现瀑布流布局
   waterFull('main','box');

   // 动态加载图片
   let timer1 = null;//节流
   window.onscroll = function () {
       clearTimeout(timer1);
       timer1 = setTimeout(function () {
           if (checkWillLoadImage()) {
               // 造数据
               createItems(20);

               // 实现瀑布流布局
               waterFull('main','box');
           }
       },200);
   };

   let timer = null;
   // 窗口的大小发生改变 （onresize）
   // 为节约性能，通过setTimeout定时器进行 节流 操作
   window.onresize = function () {
       clearTimeout(timer);
       timer = setTimeout(function () {
           waterFull('main','box');
       },200);
   };
};

function createItems(num) {
    // 获取main
    let main = $('main');

    for (let i = 0; i < num; i++) {
        let r = Math.random() * 40 + 20 ,g = Math.random() * 200 + 10, b = Math.random() * 200 + 10;
        let w = 165, h = Math.random() * 150 +170;
        let div = document.createElement('div');
        div.innerHTML = `<div class="box"><div class="pic"><div class="img" style="background-color: rgb(${r},${g},${b});width: ${w}px;height: ${h}px;"></div></div></div>`;
        main.appendChild(div);
    }
}

/**
 * 实现瀑布流布局
 * 核心思路为：
 * 1.先把父盒子main居中（先求出父盒子的宽度，然后设置margin）
 * 2.从第二行开始，逐个将每一个子盒子item，定位在上一行的最矮item下
 */
function waterFull(parent, child) {
    // 1.父盒子居中

    // 获取所有的盒子
    let allBox = $(parent).getElementsByClassName(child);
    // 获取盒子的宽度
    let boxWidth = allBox[0].offsetWidth;
    // 获取屏幕的宽度
    let screenW = document.documentElement.clientWidth;
    // 求出列数
    let cols = parseInt(screenW / boxWidth);
    $(parent).style.width = cols * boxWidth + 'px';
    $(parent).style.margin = '0 auto';

    // 2.子盒子定位

    // 定义高度数组
    let heightArr = [];// 此数组内容上限始终为列数，方便定位
    let boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;
    // 遍历子盒子
    for (let i = 0; i < allBox.length; i++) {
        // 求出每一个盒子的高度
        boxHeight = allBox[i].offsetHeight;
        if (i < cols) {// 第一行
            heightArr.push(boxHeight);
            allBox[i].style = '';
        }
        else{// 剩余行, 逐个定位
            // 取出最矮的盒子的高度
            minBoxHeight = Math.min.apply(this, heightArr);
            // 求出最矮盒子对应的索引
            minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);
            // 子盒子定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';
            allBox[i].style.top = minBoxHeight + 'px';
            // 更新数组中的高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }
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

function $(id) {
    return typeof id === 'string' ? document.getElementById(id):null;
}