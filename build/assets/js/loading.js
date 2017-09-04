
  
//获取浏览器页面可见高度和宽度  
var _PageHeight = document.documentElement.clientHeight,  
    _PageWidth = document.documentElement.clientWidth;  
//计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）  
var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0,  
    _LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;  
//在页面未加载完毕之前显示的loading Html自定义内容  
var _LoadingHtml = '<div id="loadingDiv" class="loadingDiv" style="background-color: #000;background-image:url(/assets/img/loading-bg.jpg);background-repeat:no-repeat;background-size: 100% 100%;position: fixed;top: 0px;bottom: 0px;overflow:hidden;right: 0px;left: 0px;margin: auto;z-index: 1000;"><style>body{overflow: hidden}</style><img src="/assets/img/loading-cup.gif" style="width:180px;position: absolute;top: 0px;bottom: 0px;right: 0px;left: 0px;margin: auto;"></div>';
//呈现loading效果  
document.write(_LoadingHtml);  
  
//window.onload = function () {
//    var loadingMask = document.getElementById('loadingDiv');
//    loadingMask.parentNode.removeChild(loadingMask);
//};
  
//监听加载状态改变  
document.onreadystatechange = completeLoading;
  
//加载状态为complete时移除loading效果  
function completeLoading() {  
    if (document.readyState == "complete") {  
        var loadingMask = document.getElementById('loadingDiv');  
        loadingMask.parentNode.removeChild(loadingMask);
    }  
}  
