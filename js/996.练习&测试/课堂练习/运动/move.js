/**
 * Created by QW on 2016/11/15.
 */
(function(){
    var Effect={
        linear:function(t,b,c,d){
            return b+c/d*t;
        }
    };
    function move(curEle,target){
        clearInterval(curEle.timer);
        var begin={},change={};
        var duration=700;
        var time=null;
        for(var attr in target){
            begin[attr]=utils.getCss(curEle,attr);
            change[attr]=target[attr]-begin[attr];
        }
        curEle.timer=setInterval(function(){
            if(time>=duration){
                utils.css(curEle,target);
                clearInterval(curEle.timer);
                return;
            }
            time+=10;
            for(var attr in change){
                var curPos=Effect.linear(time,begin[attr],change[attr],duration);
                utils.css(curEle,attr,curPos)
            }
        },10)
    }

    window.animate=move;



})()