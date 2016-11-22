/**
 * Created by QW on 2016/11/19.
 */
(function () {
    var oBox = document.getElementById('box');
    var oBoxInner = oBox.getElementsByTagName('div')[0];
    var aDiv = oBoxInner.getElementsByTagName('div');
    var oUl = oBox.getElementsByTagName('ul')[0];
    var aLi = oBox.getElementsByTagName('li');
    var aImg = oBox.getElementsByTagName('img');
    var oBtnLeft = oBox.getElementsByTagName('a')[0];
    var oBtnRight = oBox.getElementsByTagName('a')[1];
    var data = null;
    var timer = null;
    var n = 0;
    var mm=0;
    //1.获取数据
    getData();
    function getData() {
        var xml = new XMLHttpRequest;
        xml.open('get', 'json/data.txt', false);
        xml.onreadystatechange = function () {
            if (xml.readyState == 4 && /^2\d{2}$/.test(xml.status)) {
                data = utils.jsonParse(xml.responseText)
            }
        };
        xml.send();
    }

    //2.绑定数据
    bind();
    function bind() {
        var strDiv = '';
        var strLi = '';
        for (var i = 0; i < data.length; i++) {
            strDiv += '<div><img src="" realImg="' + data[i].imgSrc + '" alt=""></div>';
            strLi += i == 0 ? '<li class="on"></li>' : '<li></li>';
        }
        oBoxInner.innerHTML = strDiv;
        oUl.innerHTML = strLi;
    }


    //3.延迟加载
    lazyImg();
    function lazyImg() {
        for (var i = 0; i < aImg.length; i++) {
            (function (index) {
                var curImg = aImg[index];
                var tmpImg = new Image;
                tmpImg.src = curImg.getAttribute('realImg');
                tmpImg.onload = function () {
                    curImg.src = this.src;
                    tmpImg = null;
                    //utils.css(aDiv[0], 'zIndex', 1);
                    animate({
                        id: aDiv[0],
                        target: {
                            opacity: 1
                        }
                    })
                }
            })(i);
        }
    }

    //4.自动渐隐渐现
    timer = setInterval(autoMove, 2000);
    function autoMove() {
        if(n>=aDiv.length-1){
            n=-1;
        }
        n++;
        setBanner();

    }
    //不用for循环,借用透明度可以决定让哪张图片显示(前提是从第一张到最后一张图片加载时);
    // 渐隐渐现要求:当前图片透明度由0->1,前一张图片等当前图片的透明度为1时,前一张图片透明度一下子变为0;但最后一张图片转第一张的图片的时候,第一张图片会被最后一张图片盖住,所以需要提升第一张的层级,最后一张图片透明度为0时,即可取消第一张的层级.
    function setBanner() {
        bannerTip();
         //n表示要显示的图片
        // 1.对最后一个过度到第一张图片时的特殊处理(提升第一张图片的层级)
        console.log(mm)
                   n!==mm+1?aDiv[n].style.zIndex=1:void 0;

        //2.添加过度效果
                animate({
                    id: aDiv[n],
                    target: {
                        opacity: 1
                    },
        //3.回调函数 作用:等过度效果结束时,把n(即当前图片)前面的图片的透明度设为0
                    callback: function () {
                        //var index=null;
                        //index=n==0?aDiv.length-1:n-1;
                        console.log(mm)
                        utils.css(aDiv[mm],'opacity',0);//把上一个图片的透明度设为0;
                        utils.css(aDiv[n], 'zIndex', 0);//此时可以去掉第一张图片的层级,因为最后一张的图片的透明度为0;
                    }
                });
        mm=n;
            }
    //5焦点自动轮播
    function bannerTip(){
        for(var i=0;i<aLi.length;i++){
            aLi[i].className=i==n?'on':null;
        }
    }
    //6.鼠标移入移出
    oBox.onmouseover=function(){
        clearInterval(timer)
    };
    oBox.onmouseout=function(){
        timer=setInterval(autoMove,2000)
    };
    //7.点击焦点手动切换
    handLeChange();
    function handLeChange(){
        for(var i=0;i<aLi.length;i++){
            (function(index){
                aLi[index].onclick=function(){
                    n=index;
                    setBanner();
                }
            })(i)

        }
    }
})();