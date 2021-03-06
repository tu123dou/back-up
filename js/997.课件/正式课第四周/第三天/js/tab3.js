/**
 * Created by 39753 on 2016/11/17.
 */
function MyTab(id,url,duration){
    //全局变量作为私有属性
    this.url=url;
    this.duration=duration||2000;
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
    this.init();//因为是this.init(),this是实例,所以init 里面的this是实例
}
MyTab.prototype={//原型上的this都指的是实例
// (注意:里面的this是一环套一环的 : (xx=this1; this1.function(){this2 } ;this2指向function点前面的元素,而this1指的又是xx ))
    constructor:MyTab,
    init:function(){
        var _this=this;//这里的this是实例,先保存到_this里面
        //1.获取数据
        this.getData();//是实例.getData 实例可以直接拿到原型上的一级属性名(也可以说成单例模式中本模块相互调用 用this.)  ;this.getData()--getData被调用,getData里面的this是getData前面的元素(实例).
        //2.绑定数据
        this.bind();
        //3.延迟加载
        setTimeout(function(){
            _this.lazyImg();
        },500);//如果写成this.lazyImg,那么当lazyImg被调用的时候lazyImg里面的this指的是window,因为setTimeOut是window.setTimeOut,所以this是window.写成_this.lazyImg相当于是实例 点 lazyImg;(也可以认为闭包函数的this指的是window)
        //4.图片自动轮播
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            _this.autoMove();
        },this.duration);
    //    this.timer=setInterval(()=>{//这样写也可以这是ECM6的箭头函数
    //            this.autoMove();
    //},this.duration);
        //5.焦点自动轮播
        //6.移入停止移出继续
        this.overout();
        //7.点击焦点手动切换
        this.handleChange();
        //8.点击按钮左右切换；
        this.leftRight();
    },
    getData:function(){
        var _this=this;//这里的作用保存正确的 this,和选项卡自定义属性一样.
        var xml=new XMLHttpRequest;
        xml.open('get',this.url,false);//注意open后边直接是()没有=
        xml.onreadystatechange=function(){//这里也可以改成箭头函数
            if(xml.readyState==4 && /^2\d{2}$/.test(xml.status)){
                _this.data=utils.jsonParse(xml.responseText)//这里的this指的是事件前面的xml,所以先var _this=this;
            }
        };
        xml.send(null);
    },
    bind:function(){
        var strDiv='';
        var strLi='';
        for(var i=0; i<this.data.length; i++){//注意这里是data[i].imgSrc!!!!!!
            strDiv+='<div><img src="" realImg="'+this.data[i].imgSrc+'" alt=""></div>';
            strLi+=i==0?'<li class="on"></li>':'<li></li>';
        }
        strDiv+='<div><img src="" realImg="'+this.data[0].imgSrc+'" alt=""></div>';
        this.oBoxInner.innerHTML=strDiv;
        this.oBoxInner.style.width=this.aDiv[0].offsetWidth*this.aDiv.length+'px';
        this.oUl.innerHTML=strLi;
    },
    lazyImg:function(){
        //这三种形式都可以;总结:let会在哪里有I 就在哪形成闭包;可以取带自定义属性和闭包
        for(var i=0; i<this.aImg.length; i++){
            var _this=this;
            (function(index){
                var curImg=_this.aImg[index];
                var tmpImg=new Image;
                tmpImg.src=curImg.getAttribute('realImg');
                tmpImg.onload=function(){
                    curImg.src=this.src;
                    tmpImg=null;
                }
            })(i);
        }
        /*for(let i=0; i<this.aImg.length; i++){
                let curImg=this.aImg[i];//会在此形成私有作用域
                var tmpImg=new Image;
                tmpImg.src=curImg.getAttribute('realImg');
                tmpImg.onload=function(){
                    curImg.src=this.src;
                    tmpImg=null;
                }
        }*/
         /*for(let i=0; i<this.aImg.length; i++){
                var _this=this;
                //var curImg=this.aImg[i];
                var tmpImg=new Image;
                tmpImg.src=curImg.getAttribute('realImg');
                tmpImg.onload=function(){
                    _this.aImg[i].src=this.src;//会在此形成闭包
                    tmpImg=null;
                }
        }*/
        /*for(var i=0; i<this.aImg.length; i++){
            //var _this=this;
            let curImg=this.aImg[i];//会在此形成闭包保存i值
            var tmpImg=new Image;
            tmpImg.src=curImg.getAttribute('realImg');
            tmpImg.onload=function(){
                curImg.src=this.src;//此处的curImg会到前面闭包找;
                tmpImg=null;
            }
        }*/
    },
    autoMove:function(){
        if(this.n>=this.aDiv.length-1){
            this.n=0;
            utils.css(this.oBoxInner,'left',-this.n*1000)
        }
        this.n++;
        /*utils.css(this.oBoxInner,'left',-this.n*1000)*/
        animate({
            id:this.oBoxInner,
            target:{
                left:-this.n*1000
            },
            duration:800
        });
        this.bannerTip();
    },
    bannerTip:function(){
        var tmp=this.n>=this.aLi.length?0:this.n;
        for(var i=0; i<this.aLi.length; i++){
            this.aLi[i].className=i==tmp?'on':null;
        }
    },
    overout:function(){
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
        for(var i=0; i<this.aLi.length; i++){
            (function(index){
                _this.aLi[i].onclick=function(){//不可以改为this.aLi[i],因为自执行函数的this是window.
                    _this.n=index;
                    animate({
                        id:_this.oBoxInner,
                        target:{
                            left:-_this.n*1000
                        },
                        duration:800
                    });
                    _this.bannerTip();
                }
            })(i);
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









