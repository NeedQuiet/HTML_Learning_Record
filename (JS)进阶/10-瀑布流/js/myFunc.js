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