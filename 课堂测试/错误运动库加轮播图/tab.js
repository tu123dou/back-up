/**
 * Created by QW on 2016/11/17.
 */
(function(){
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var aLi=oBox.getElementsByTagName('li');
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var n=0;//n的作用：决定让第几张图片显示；
    var timer=null;
    timer=setInterval(autoMove,2000);
    oBoxInner.innerHTML+='<div><img src="img/banner1-1.jpg" alt=""></div>';
    oBoxInner.style.width=aDiv.length*aDiv[0].offsetWidth+'px';
//1.图片自动轮播
function autoMove(){
    if(n>=aDiv.length-1){
        n=0;
        utils.css(oBoxInner,'left',0)
    }
    n++;
    var cur=animate({
        id:oBoxInner,
        target:{
            left:-n*1000
        },
        duration:1000,
    })
    bannerTip()
}
//2.焦点自动轮播
    function bannerTip(){
        var tmp=n>=aLi.length?0:n;
        for(var i=0;i<aLi.length;i++){
            console.log(n);
            aLi[i].className=i==tmp?'on':null;
        }
    }
//3.点击鼠标移入移出
    oBox.onmouseover=function(){
        clearInterval(timer)
    };
    oBox.onmouseout=function(){
        timer=setInterval(autoMove,2000)
    };
    //4.点击焦点手动切换
    for(var i=0; i<aLi.length; i++){
        aLi[i].index=i;
        aLi[i].onclick=function(){
            n=this.index;
            animate({
                id:oBoxInner,
                target:{
                    left:-n*1000
                },
                duration:1000
            });
            bannerTip();
        }
    }
    //5.点击左右按钮进行切换
    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function(){
        if(n<=0){
            n=aDiv.length-1;
            utils.css(oBoxInner,'left',-n*1000);

        }
        n--;
        console.log(n);
        animate({
            id:oBoxInner,
            target:{
                left:-n*1000
            },
            duration:1000
        });
        bannerTip();
    }

})()