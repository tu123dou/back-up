/**
 * Created by QW on 2016/11/13.
 */
var utils=(function(){
    var flag='getComputedStyle'in window;
    return{
        makeArray:function(arg){
            var ary=[];
            if(flag){
                ary=Array.prototype.slice.call(arg)
            }else{
                for(var i=0;i<arg.length;i++){
                    ary.push(arg[i])
                }
            }
            return ary;
        },
        jsonParse:function(jsonStr){
            return 'JSON'in window?JSON.parse(jsonStr):eval('('+jsonStr+')')
        },
        rnd:function(n,m){
             n=Number(n);
             m=Number(m);
            if(isNaN(n)||isNaN(m)){
                return Math.random()
            }
            if(n>m){
                n=n+m;
                m=n-m;
                n=n-m;
            }
            return Math.floor(Math.random()*(m-n)+n)
        },
        getByClass:function(strClass,parent){
            parent=parent||document;
            var reg=null;
            if(flag){
                return this.makeArray(parent.getElementsByClassName(strClass))
            }else{
                var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/ +/g);
                var nodeList=parent.getElementsByTagName('*');
                for(var i=0;i<nodeList.length;i++){
                    var isHave=true;
                    for(var j=0;j<aryClass.length;j++){
                        reg=new RegExp('/(^| +)'+aryClass[j]+'( +|$)/','g');
                        if(!reg.test(nodeList[i].className)){
                            isHave=false;
                            break;
                        }
                    }
                    if(isHave) ary.push(nodeList[i]);
                }
            }
            return ary;
        },
        hasClass:function(curEle,cName){
            var reg=new RegExp('/(^| +)'+cName+'( +|$)/','g');
            return reg.test(curEle.className)
        },
        addClass:function(curEle,strClass){
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/ +/g);
            for(var i=0;i<aryClass.length;i++){
                if(!this.hasClass(curEle,aryClass[i])){
                    curEle.className=curEle.className+' '+aryClass[i]
                }
            }
        },
        removeClass:function(curEle,strClass){
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/ +/g);
            for(var i=0;i<aryClass.length;i++){
                var reg=new RegExp('/(^| +)'+aryClass[i]+'( +|$)/','g');
                if(reg.test(curEle.className)){
                    curEle.className=curEle.className.replace(reg,' ').replace(/(^ +)|( +$)/g,'').replace(/ +/g,' ')
                }
            }
        },
        getCss:function(curEle,attr){
            var str='';
            var reg=null;
            if(flag){
                str=getComputedStyle(curEle,false)[attr];
            }else{
                if(attr=='opacity'){
                    str=curEle.currentStyle.filter;
                    reg=/alpha\(opacity[+:](\d+)\)/
                    return reg.test(str)?RegExp.$1:1;
                }
                str=curEle.currentStyle[attr];
            }
             reg=/^(left|height|width|right|top|bottom|left|((margin|padding)(left|right|top|bottom|left)?))$/gi;
            if(reg.test(attr)){
                return parseFloat(str)
            }else{
                return str;
            }
        },
        setCss:function(curEle,attr,value){
            var reg=/^(left|height|width|right|top|bottom|left|((margin|padding)(left|right|top|bottom|left)?))$/gi;
            if(reg.test(attr)){
           if(!isNaN){
               value=value+'px';
             }
            }
            curEle.style[attr]=value;
        },
        setGroupCss:function(curEle,obj){
            if({}.toString.call(obj)=='[object Object]'){
                for(var attr in obj){
                    this.setCss(curEle,attr,obj[attr])
                }
            }
        },
        css:function(curEle,attr,value){
            if({}.toString().call(attr)=='[object Object]'){
                this.setGroupCss(curEle,attr)
            }else{
                if(value){
                    this.setCss(curEle,attr,value)
                }else{
                    this.setCss(curEle,attr)
                }
            }
        },
        offset:function (curEle){
            var l=curEle.offsetLeft;
            var t=curEle.offsetTop;
            var pre=curEle.offsetParent;
            while(pre){
                if(window.navigator.userAgent.indexOf('MSIE 8')==-1){
                    l+=pre.clientLeft;
                    t+=pre.clientTop;
                }
                l+=pre.offsetLeft;
                t+=pre.offsetTop;
                pre=pre.offsetParent;
            }
            return {left:l,top:t}
        }










    }
})();