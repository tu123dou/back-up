/**
 * Created by Administrator on 2016/11/15.
 */
var utils = {
    makeArray: function (arg) {
        var ary = [];
        if ('getComputedStyle' in window) {//标准浏览器
            ary = Array.prototype.slice.call(arg);
        } else {//IE浏览器；
            for (var i = 0; i < arg.length; i++) {
                ary.push(arg[i]);
            }
        }
        return ary;
    },
    win: function (attr, value) {
        if (value === undefined) {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = document.body[attr] = value;
    },
    offset: function (curEle) {
        var par = curEle.offsetParent;
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        while (par) {
            if (window.navigator.userAgent.indexOf('MSIE 8') == -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t};
    },
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
    }

}