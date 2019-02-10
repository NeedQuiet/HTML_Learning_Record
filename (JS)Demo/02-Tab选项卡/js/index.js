window.onload = function () {
  // 1.获取标签
    let allList = $('tab-header').getElementsByTagName('li');
    let allDom = $('tab-content').getElementsByClassName('dom');

    // 2.遍历监听
    for (let i = 0; i < allList.length; i++) {
        let li = allList[i];
        li.index = i;
        li.onmouseover = function () {
            for (let j = 0; j < allList.length; j++) {
                allList[j].className = '';
                allDom[j].style.display = 'none';
            }
            this.className = 'selected';
            allDom[this.index].style.display = 'block';
        }
    }

};

function $(id) {
    return typeof id === 'string' ? document.getElementById(id):null;
};