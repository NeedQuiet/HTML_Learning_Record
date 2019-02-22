/**
 * 获取滚动的头部距离和左边距离
 * @returns {{top: number, left: number}}
 */
function scroll() {
    if (window.pageYOffset !== null) {
        return{
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }else if (document.compatMode === 'CSS1Compat') { // W3C 标准模式
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }

    return{
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
}

/**
 * 获取屏幕的宽度和高度
 * @returns {{top: number, left: number}}
 */
function client() {
    if (window.innerWidth) { // ie9+ 最新的浏览器
        return{
            width:window.innerWidth,
            height:window.innerHeight
        }
    }else if (document.compatMode === 'CSS1Compat') { // W3C 标准模式
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }

    return{
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}

/**
 * 根据id获取标签
 * @param id
 * @returns {any}
 */
function $(id) {
    return typeof id === 'string' ? document.getElementById(id):null;
}

/**
 * 显示/隐藏标签
 * @param obj
 * @returns {string}
 */
function show(obj) {
    return obj.style.display = 'block';
}
function hide(obj) {
    return obj.style.display = 'none';
}

/**
 * 匀速动画函数
 * @param {object} obj
 * @param {number}target
 * @param {number}speed
 */
function constant(obj, target, speed) {
    // 清除定时器
    clearInterval(obj.timer);

    if (obj.offsetLeft === target) return;

    // 判断方向（根据目标值和坐标，来确定步长的正负）
    let dir = obj.offsetLeft < target ? speed : -speed;

    // 设置定时器
    obj.timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + dir + 'px';

        // 目标值和盒子位置的偏差（取正）
        let Math_Offset = Math.abs(target - obj.offsetLeft);

        // 步长（取正）
        let Math_dir = Math.abs(dir);

        if ( Math_Offset < Math_dir){
            clearInterval(obj.timer);

            obj.style.left = target + 'px';
        }
    },20);
}

/**
 * 改变Css样式
 * @param {object}obj
 * @param {string}attr
 * @param {string}value
 */
function chageCssStyle(obj, attr, value) {
    obj.style[attr] = value;
}

/**
 * 获取css属性值
 * @param {object}obj
 * @param {string}attr
 * @returns {string}
 */
function getCSSAttrValue(obj, attr) {
    if (obj.currentStyle) {// IE 和 opera
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj, null)[attr];
    }
}

/**
 * 缓动动画函数
 * @param {object}obj
 * @param {string}json
 * @param {function}func
 */
function buffer(obj, json, func) {
    clearInterval(obj.timer);

    let begin = 0, target = 0, speed = 0;
    obj.timer = setInterval(function () {
        // 用标志位来控制是否停止timer
        let flag = true;
        for (let key in json) {
            //获取初始值
            if ('opacity' === key) { // 透明度
                begin = parseInt(parseFloat(getCSSAttrValue(obj,key)) * 100);
                target = parseInt(parseFloat(json[key]) * 100);
            }else if ('scrollTop' === key){
                begin = Math.ceil(obj.scrollTop);
                target = parseInt(json[key]);
            }else{ // 其他情况
                begin = parseInt(getCSSAttrValue(obj,key)) || 0;
                target = parseInt(json[key]);
            }

            // 求出步长
            speed = (target - begin) * 0.2;
            // 是否向上取整
            speed = (target > begin ) ? Math.ceil(speed) : Math.floor(speed);
            // 动起来
            if ('opacity' === key){
                // w3c浏览器
                obj.style.opacity = (begin + speed) / 100;
                // ie浏览器
                obj.style.filter = `alpha(opacity:${begin + speed})`;
            }else if ('scrollTop' === key){
                obj.scrollTop = begin + speed ;
            }else{
                obj.style[key] = begin + speed + 'px';
            }
        }

        // 判断边界
        if (begin !== target) {
            flag = false;
        }

        if (flag) {
            clearInterval(obj.timer);
            // 判断有没有回调函数
            if (func) {
                func();
            }

        }

    },20);
}