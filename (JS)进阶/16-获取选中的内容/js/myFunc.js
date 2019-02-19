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

