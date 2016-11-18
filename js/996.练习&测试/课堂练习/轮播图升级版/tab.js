/**
 * Created by QW on 2016/11/16.
 */
(function(){
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aImg=oBoxInner.getElementsByTagName('img');
    var aLi=oBox.getElementsByTagName('li');
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var n=0;
    var data=null;
    //oBoxInner.innerHTML+='<div><img src="img/banner1.jpg" alt=""></div>';
    //oBoxInner.style.width=aDiv[0].offsetWidth*aDiv.length+'px';//注意此处width不要写成height
    var timer=null;
    clearInterval(timer);
     timer=setInterval(autoMove,2000);
    //1.获取并解析数据
    getData();
    function getData(){
        //1.1创建一个对象
        var xml=new XMLHttpRequest();
        //1.2打开地址
        xml.open('get','json/data.txt',false);
        //1.3
        xml.onreadystatechange=function(){
            if(xml.readyState==4&&/^2\d{2}/.test(xml.status)){
                data=utils.jsonParse(xml.responseText)
            }
        };
        //1.4
        xml.send();
        console.log(data)
    }
    //2.绑定数据
    bind();
    function bind(){
        var strDiv='',strLi='';
        for(var i=0;i<data.length;i++){
            strDiv+='<div><img src="" realImg="'+data[i].imgSrc+'" " alt=""></div>';
            strLi+=i==0?'<li class="on"></li>':'<li></li>';
        }
        strDiv+='<div><img src="" realImg="'+data[0].imgSrc+'" " alt=""></div>';
        oBoxInner.innerHTML=strDiv;
        oBoxInner.style.width=aDiv[0].offsetWidth*aDiv.length+'px';
        oUl.innerHTML=strLi;
    }
    //3.图片延时加载
    setTimeout(lazyImg,500);
    function lazyImg(){
        for(var i=0;i<aImg.length;i++){//????aImg有内容吗?
            (function(index){
                var tmpImg=new Image;
                tmpImg.src=aImg[index].getAttribute('realImg');
                tmpImg.onload=function(){
                    aImg[index].src=this.src;
                    tmpImg=null;
                };
                tmpImg.onerror=function(){
                    aImg[index].parentNode.style.background='url("img/default.gif") no-repeat center #999'
                }
            })(i)

        }

    }
    //1.图片轮播
    function autoMove(){
        if(n>=aDiv.length-1){
            n=0;
            utils.css(oBoxInner,'left',-n*1000);
        }
        n++;
        //console.log('a');
        //utils.css(oBoxInner,'left',-n*1000);
        animate({
            id:oBoxInner ,
            target:{
                left:-n*1000
            },
            duration:1000
            //effect:0
        });
        bannerTip();
    }
    //2.焦点轮播
    function bannerTip(){
        var tmp=n>=aLi.length?0:n;
        for(var i=0;i<aLi.length;i++){
            aLi[i].className=i==tmp?'on':null;
        }
    }
    //3.移入停止移出继续
    oBox.onmouseover=function(){
        clearInterval(timer);
        oBtnLeft.style.display=oBtnRight.style.display='block';
    };
    oBox.onmouseout=function(){
       timer= setInterval(autoMove,2000);//不加timer=效果实现不了
        oBtnLeft.style.display=oBtnRight.style.display='none';
    };
    //4.点击焦点手动切换
    for(var i=0;i<aLi.length;i++){
        aLi[i].index=i;
        aLi[i].onclick=function(){
            n=this.index;
            utils.css(oBoxInner,'left',-n*1000);
            //animate({
            //    id:oBoxInner ,
            //    target:{
            //        left:-n*1000
            //    },
            //    duration:1000,
            //    effect:4
            //});
            bannerTip()
        }
    }
    //5点击左右按钮进行切换
    oBtnRight.onclick=function(){
        autoMove()
    };
    oBtnLeft.onclick=function(){
        if(n<=0){
            n=aDiv.length-1;
            utils.css(oBoxInner,'left',-n*1000)
        }
        n--;
        animate({
            id:oBoxInner ,
            target:{
                left:-n*1000
            },
            duration:1000
        });
        bannerTip()
    }


})();