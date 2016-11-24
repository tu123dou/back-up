/**
 * Created by QW on 2016/11/22.
 */
function Tab(id,url,duration){
    this.duration=duration||2000 ;
    this.url=url;
    this.oBox = document.getElementById(id);
    this.oBoxInner = this.oBox.getElementsByTagName('div')[0];
    this.aDiv = this.oBoxInner.getElementsByTagName('div');
    this.oUl = this.oBox.getElementsByTagName('ul')[0];
    this.aLi = this.oBox.getElementsByTagName('li');
    this.aImg=this.oBoxInner.getElementsByTagName('img');
    this.oBtnLeft = this.oBox.getElementsByTagName('a')[0];
    this.oBtnRight = this.oBox.getElementsByTagName('a')[1];
    this.data = null;
    this.timer=null;
    this.n=0;
    this.init();
    console.log(this.oBox)
}
Tab.prototype={
    constructor:Tab,
    init:function(){
        var _this=this;
        //1.获取数据
        this.getData();
        //2.绑定数据
        this.bind();
        //3.延时加载
        setTimeout(function(){
            _this.lazyImg();
        },500);
        //4.图片轮播
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            _this.autoMove()
        },this.duration)
        //5.焦点轮播
        //6.移入移出
        this.overOut();
        //7.点击焦点切换
        this.handleChange();
        //8.点击按钮切换
        this.leftRight()
    },
    getData:function(){
        var _this=this;
        var xml=new XMLHttpRequest;
        xml.open('get',this.url,false);
        xml.onreadystatechange=function(){
            if(xml.readyState==4 && /^2\d{2}$/.test(xml.status)){
                _this.data=utils.jsonParse(xml.responseText)
            }
        };
        xml.send(null);
    },
    bind:function(){
        var strDiv='';
        var strLi='';
        for(var i=0;i<this.data.length;i++){
            strDiv+='<div><img src="" realImg="'+ this.data[i].imgSrc+'" alt=""></div>';
            strLi+=i==0?'<li class="on"></li>':'<li></li>';
        }
        strDiv+='<div><img src="" realImg="'+ this.data[0].imgSrc+'" alt=""></div>';
        this.oBoxInner.innerHTML=strDiv;
        this.oBoxInner.style.width=this.aDiv[0].offsetWidth*this.aDiv.length+'px';
        this.oUl.innerHTML=strLi;
    },
    lazyImg:function(){
        var _this=this;
        for(let i=0;i<this.aImg.length;i++){
            var tmpImg=new Image;
            tmpImg.src=this.aImg[i].getAttribute('realImg');
            tmpImg.onload=function(){
                _this.aImg[i].src=this.src;
                tmpImg=null;
            }
        }
    },
    autoMove:function(){
        if(this.n>=this.aDiv.length-1){
            this.n=0;
            utils.css(this.oBoxInner,{
                left:0
            })
        }
        this.n++;
        animate({
            id:this.oBoxInner,
            target:{
                left:-this.n*1000
            }
        });
        this.bannerTip();
    },
    bannerTip:function(){
        var num=this.n>=this.aLi.length?0:this.n;
        for(var i=0;i<this.aLi.length;i++){
           this.aLi[i].className=num==i?'on':''
        }
    },
    overOut:function(){
        var _this=this;
        this.oBox.onmouseover=function(){
            clearInterval(_this.timer);
            utils.css(_this.oBtnLeft,{display:'block'});
            utils.css(_this.oBtnRight,{display:'block'});
        };
        this.oBox.onmouseout=function(){
            _this.timer=setInterval(function(){
                _this.autoMove()
            },_this.duration);
            utils.css(_this.oBtnLeft,{display:'none'});
            utils.css(_this.oBtnRight,{display:'none'});
        }
    },
    handleChange:function(){
        var _this=this;
        for(let i=0; i<this.aLi.length; i++){
                _this.aLi[i].onclick=function(){
                    _this.n=i;
                    animate({
                        id:_this.oBoxInner,
                        target:{
                            left:-_this.n*1000
                        },
                        duration:800
                    });
                    _this.bannerTip();
                }
        }
    },
    leftRight:function(){
        var _this=this;
        this.oBtnRight.onclick=function(){
            _this.autoMove();
        };
        this.oBtnLeft.onclick=function(){
            if(_this.n<=0){
                _this.n=_this.aDiv.length-1;
                utils.css(_this.oBoxInner,'left',-_this.n*1000)
            }
            _this.n--;
            animate({
                id:_this.oBoxInner,
                target:{
                    left:-_this.n*1000
                },
                duration:800
            });
            _this.bannerTip();
        }
    }

};