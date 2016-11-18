/**
 * Created by QW on 2016/11/2.
 */
var utils = (function () {
    var flag = 'getComputedStyle' in window;
    return {
        average: function () {
            //1.类数组转数组
            //(1)易想到的方法
            /*var ary = [];
             for (var i = 0; i < ary.length; i = +1) {
             ary.push(ary[i]);
             return ary;
             }*/
            //(2）借用数组的slice
            var ary = Array.slice.call(ary);
            //2.排序
            ary.sort(function (a, b) {
                return a - b;
            });
            //3.去掉最大值和最小值
            ary.pop();
            ary.shift();
            //4.求平均数
            return (eval(ary.join('+')) / ary.length).toFixed(2);//toFixed（保留几位小数）
        },
        makeArray: function (arg) {
            var ary = [];
            try {
                ary = Array.prototype.slice.call(arg)
            } catch (e) {
                for (var i = 0; i < arg.length; i++) {
                    ary.push(arg[i])
                }
            }
            return ary
        },
        //jsonParse:把JSON格式的字符串，转成JSON格式的对象；
        jsonParse: function (jsonStr) {
            return 'JSON' in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
        },
        /**
         * sum 数组累加
         * @param ary
         * @returns {*}
         */
        sum: function (ary) {
            var total = null;
            for (var i = 0; i < ary.length; i++) {
                var cur = ary[i];
                if (!isNaN(cur)) {
                    var cur1 = Number(cur);
                    total += cur1;
                }

            }
            return total
        },
        /**
         * 倒计时器
         */
        countDown: function () {
            var now = new Date;
            var tar = new Date('2016/11.4 15:00:00')
            var timers = (tar - now) / 1000;//一共有多少秒
            var h = Math.floor(timers / 3600);//有多少小时
            var m = Math.floor((timers - h * 3600) / 60);//多少分钟
            var s = Math.floor((timers - h * 3600 - m * 60));//多少秒
            div.innerHTML = zero(h) + ':' + zero(m) + ':' + zero(s);
        },
        /**
         * 补位00
         * @param n
         * @returns {string}
         */
        zero: function (n) {
            return n < 10 && n >= 0 ? '0' + n : n;
        },
        hasPubProperty: function (attr, obj) {
            return 'attr' in obj && !obj.hasOwnProperty(attr)
        },

        //rnd:求一定范围的随机数
        rnd: function (n, m) {
            n = Number(n);
            m = Number(m);
            if (isNaN(n) || isNaN(m)) {
                return Math.random();//当返回0-1之间的随机小数，就代表传参传错了；
            }
            if (n > m) {
                var tmp = n;
                n = m;
                m = tmp;
            }
            return Math.round(Math.random() * (m - n) + n);
        },

        /*//时间格式化
         forMatDate: String.prototype.forMatDate=function (tmp){
         var ary=this.match(/\d+/g);
         var tmpStr=tmp||'{0}年{1}月{2}日 {3}时{4}分';
         var reg=/{(\d)}/g;
         tmpStr=tmpStr.replace(reg,function(){
         //            console.log(arguments);
         var n=ary[arguments[1]];
         n=n>=0&&n<10?'0'+Number(n):n;//确保是两位Number确保传入00时不是000
         return n
         } );
         return tmpStr;
         },*/
        //getCss:获取当前元素的某个样式值；
        getCss: function getCss(curEle, attr) {
            var val = null;
            var reg = null;
            if ('getComputedStyle' in window) {
                val = getComputedStyle(curEle, false)[attr];
            } else {
                if (attr == 'opacity') {
                    val = curEle.currentStyle.filter;//alpha(opacity=10)
                    reg = /^alpha\(opacity[=:](\d+(\.\d+)?)\)$/g;
                    //如果正则中加了全局g,test和exec都会影响lastIndex;
                    // return reg.test(val)?reg.exec(val)[1]/100:1;
                    /*if(reg.test(val)){
                     console.log(RegExp.$1)//拿到当前大正则的第一个小分组； RegExp.$2 拿到第二个小分组； 。。。。最大能拿到$9；
                     }*/
                    return reg.test(val) ? RegExp.$1 / 100 : 1;
                }
                val = curEle.currentStyle[attr];
            }
            //升级1：对单位的处理
            reg = /^(left|top|right|bottom|width|height|((margin|padding)(left|top|right|bottom)?))$/gi;//记得一定要区分大小写；
            return reg.test(attr) ? parseFloat(val) : val;
        },
        //获取：
        /*document.documentElement.clientWidth||document.body.clientWidth;
         document.documentElement.scrollTop||document.body.scrollTop;*/
        win: function win(attr, value) {
            //arguments接收的是实参的个数；跟形参没关系；
            if (arguments.length == 1) {
                return document.documentElement[attr] || document.body[attr];
            } else if (arguments.length == 2) {
                document.documentElement[attr] = document.body[attr] = value;
            }
        },
        //offset：获取当前元素到body的距离；
        /*
         * 参数：curEle;
         * 返回值：{left:xxx,top:xx};
         *
         * */
        offset: function offset(curEle) {
            var par = curEle.offsetParent;
            var l = curEle.offsetLeft;
            var t = curEle.offsetTop;
            while (par) {
                //IE8浏览器下offsetLeft已经包含了边框；
                //只有在非IE8浏览器下，才需要累加边框；
                if (window.navigator.userAgent.indexOf('MSIE 8') === -1) {
                    l += par.clientLeft;
                    t += par.clientTop;
                }
                l += par.offsetLeft;
                t += par.offsetTop;
                par = par.offsetParent;
            }
            return {left: l, top: t};
        },
        //getByClass:通过class名（可以限定范围的）获取元素；
        getByClass:function(strClass,parent){
            parent=parent||document;
            if(flag){
                return this.makeArray(parent.getElementsByClassName(strClass));
            }
            //IE浏览器的兼容处理：
            //1.把字符串转成数组
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            //2.拿到该容器下所有的子元素
            var nodeList=parent.getElementsByTagName('*');
            var ary=[];
            //3.校验每个元素的className,看他是否包含数组中的每一项；
            for(var i=0; i<nodeList.length; i++){
                var cur=nodeList[i];
                var bOk=true;//先假设元素身上包含数组中的每个class名；
                for(var j=0; j<aryClass.length; j++){
                    var reg=new RegExp('(^|\\s+)'+aryClass[j]+'(\\s+|$)','g');
                    if(!reg.test(cur.className)){
                        bOk=false;
                        break;
                    }
                }
                if(bOk){
                    ary.push(cur);
                }
            }
            return ary;
        },
        //hasClass:判断元素身上是否有某个class名；
        hasClass:function(curEle,cName){
            var reg=new RegExp('(^| +)'+cName+'( +|$)','g');
            return reg.test(curEle.className);
        },
        //addClass:可以给元素身上以字符串的形式批量添加class名（当元素身上每个这个class名的时候，可以给元素添加这个class名）;
        addClass:function(curEle,strClass){
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            for(var i=0; i<aryClass.length; i++){
                if(!this.hasClass(curEle,aryClass[i])){
                    curEle.className+=' '+aryClass[i];
                    curEle.className=curEle.className.replace(/(^ +)|( +$)/g,'').replace(/\s+/g,' ')
                }
            }
        },
        //removeClass:移除元素身上某些class名； strClass;删除多个；'    box1     box2 box3     '
        removeClass:function(curEle,strClass){
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            for(var i=0; i<aryClass.length; i++){
                var reg=new RegExp('(^| +)'+aryClass[i]+'( +|$)','g');
                if(reg.test(curEle.className)){
                    curEle.className=curEle.className.replace(reg,' ').replace(/(^ +)|( +$)/g,'').replace(/\s+/g,' ');
                }
            }
        },
        //setCss:给元素身上设置一个样式；设置样式只能设置行内样式；
        setCss:function(curEle,attr,value){
            //3.对浮动的处理
            if(attr=='float'){
                curEle.style.cssFloat=value;//firefox,chrome,safari
                curEle.style.styleFloat=value;//IE
                return;
            }
            //2.对透明度的处理
            if(attr==='opacity'){
                curEle.style.opacity=value;
                curEle.style.filter='alpha(opacity='+value*100+')';
                return;
            }
            //1.对单位的处理
            var reg=/^([+-])?(\d+(\.\d+)?)(px|pt|rem|em|%)?$/;
            if(reg.test(value)){
                //当用户没有传单位的时候，默认按照PC端的样式设置；
                if(Number(value) || Number(value)==0){
                    value=value+'px';
                }
            }
            curEle.style[attr]=value;
        },
        //setGroupCss:给当前元素设置一组样式；
        setGroupCss:function(curEle,opt){
            if(Object.prototype.toString.call(opt) !== '[object Object]') return;
            for(var attr in opt){
                this.setCss(curEle,attr,opt[attr])
            }
        },
        //css:集获取，设置一个，设置一组样式为一体；
        css:function(curEle){
            var argTwo=arguments[1];
            if(typeof argTwo==='string'){
                var argThree=arguments[2];
                if(typeof argThree==='undefined'){//获取
                    return this.getCss(curEle,argTwo);
                }else{
                    this.setCss(curEle,argTwo,argThree);//设置一个样式；
                }
            }
            /*if(argTwo instanceof Object){ //[] instanceof Object
             this.setGroupCss(curEle,argTwo);
             }*/
            if(Object.prototype.toString.call(argTwo)==='[object Object]'){
                this.setGroupCss(curEle,argTwo);
            }
        },
        /*下手点：从参数来下手；css(curEle)
         * 1.如果第二个参数是字符串的话：1）有第三个参数-》设置一个 2）没有第三个参数-》代表获取（有返回值return）
         * 2.如果第二个参数是对象的话：设置一组；
         * */
        //getChildren,第二个参数是想要获取的标签名;
        getChildren:function (curEle,tagName){
        var newAry=[];
        var ary=curEle.childNodes;
        for(var i=0;i<ary.length;i+=1){
            if(ary[i].nodeType==1){
                if(tagName==undefined){
                    newAry.push(ary[i]);
                }else{
                    if(ary[i].nodeName==tagName.toUpperCase()){
                        newAry.push(ary[i]);
                    }
                }
            }
        }
        return newAry;
    },
        prev:function prev(curEle){
        if(flg){
            return curEle.previousElementSibling;
        }
        var pre=curEle.previousSibling;
        while(pre && pre.nodeType !== 1){
            pre=pre.previousSibling;
        }
        return pre;
    },
        next:function next(curEle){
        if(flg){
            return curEle.nextElementSibling;
        }
        var nex=curEle.nextSibling;
        while(nex && nex.nodeType !== 1){
            nex=nex.nextSibling;
        }
        return nex;
    },
        sibling:function sibling(curEle){
        var ary=[];
        var pre=this.prev(curEle);
        var nex=this.next(curEle);
        if(pre) ary.push(pre);
        if(nex) ary.push(nex);
        return ary;
    },
        prevAll: function prevAll(curEle){
        var ary=[];
        var pre=this.prev(curEle);
        while(pre){
            ary.push(pre);
            pre=this.prev(pre);
        }
        return ary;
    },
        nextAll:function nextAll(curEle){
        var nex=this.next(curEle);
        var ary=[];
        while(nex){
            ary.push(nex);
            nex=this.next(nex);
        }
        return ary;
    },
        siblings: function siblings(curEle){
        var ary1=this.prevAll(curEle);
        var ary2=this.nextAll(curEle);
        return ary1.concat(ary2);
    },
        firstChild:function firstChild(curEle){
        var children=this.getChildren(curEle);
        return children[0];
    },
        lastChild:function lastChild(curEle){
        var children=this.getChildren(curEle);
        return children[children.length-1];
    },
        index:function index(curEle){
        return this.prevAll(curEle).length;
    },
        appendChild:function appendChild(curEle,parent){
        parent.appendChild(curEle);
    },
        prependChild:function prependChild(curEle,parent){
        var first=this.firstChild(parent);
        if(first){
            parent.insertBefore(curEle,first);
        }else{
            parent.appendChild(curEle);
        }
    },
        insertBefore:function insertBefore(curEle,oldEle){
        oldEle.parentNode.insertBefore(curEle,oldEle);
    },
        insertAfter:function insertAfter(curEle,oldEle){
        var nex=this.next(oldEle);
        if(nex){
            oldEle.parentNode.insertBefore(curEle,nex);
        }else{
            oldEle.parentNode.appendChild(curEle);
        }
    },




    }
})()//utils结束