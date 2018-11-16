//rem转换
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

// 初始化

var header,headerH;
function fnInit() {
    header = $api.dom('header');
    $api.fixStatusBar(header);
    headerH = $api.offset(header).h;
}

    
// 模块引入初始化
var bMap,
    db;
function  moduleInit() {
    // 数据库
    db = api.require("db");
    //百度地图
    bMap = api.require("bMap")
}
apiready = function () {
    fnInit()
    moduleInit();
}

function  closeFrame(name) {
    api.closeFrame({
        name: name
    });
}
//打开window
function  openWin(name,url) {
    api.openWin({
        name: name,
        url: url,
        pageParam: {
        }
    });
}