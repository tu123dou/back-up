/**
 * Created by QW on 2016/11/16.
 */
(function(){
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var aLi=oBox.getElementsByTagName('li');
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var n=0;//表示第n个图片   n==4时表示第一张图片 n=1时表示第2张图片
    oBoxInner.innerHTML+=' <div><img src="img/banner1-1.jpg" alt=""></div>';
    oBoxInner.style.width=aDiv[0].offsetWidth*aDiv.length+'px';
    var timer=null;
    timer=setInterval(autoMove,2000);
    //1.图片自动轮播
    function autoMove(){
        if(n>=aDiv.length-1){
            n=0;
            utils.css(oBoxInner,'left',0);
            //alert('a')
        }
        n++;
        animate({
           id:oBoxInner,
            duration:1000,
            target:{
                left:-n*1000,
            },
            //effect:1
        });
        bannerTip();//n==4时表示第一张图片 n=1时表示第2张图片
    }
    //2.焦点自动轮播
    function bannerTip(){
        var tmp=n==aLi.length?0:n;//n==4时表示第一张图片 n=1时表示第2张图片
        for(var i=0;i<aLi.length;i++){
            aLi[i].className=tmp==i?'on':null
        }
    }
    //3.移入移出
    oBox.onmouseover=function(){
        clearInterval(timer);
        //oBtnLeft.style.display=oBtnRight.style.display='block';
    };
    oBox.onmouseout=function(){
        timer=setInterval(autoMove,2000);
        //oBtnLeft.style.display=oBtnRight.style.display='none';
    };
    //4.点击焦点手动切换

    for(var i=0;i<aLi.length;i++){
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
    //5.点击左右按钮手动切换
    oBtnRight.onclick=function(){
        autoMove();
    };
    oBtnLeft.onclick=function(){
        if(n<=0){
            n=aDiv.length-1;
            utils.css(oBoxInner,'left',-n*1000)
        }
        n--;
        animate({
            id:oBoxInner,
            target:{
                left:-n*1000
            },
            duration:1000
        });
        bannerTip();
    }

})();