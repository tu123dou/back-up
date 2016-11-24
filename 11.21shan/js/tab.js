/**
 * Created by QW on 2016/11/23.
 */
function Tab(){
    this.$oBox=$('#box');
    this.$oBoxInner=this.$oBox.find('.boxInner');
    this.$aDiv=null;
    this.$aImg=null;
    this.$oUl=this.$oBox.find('ul');
    this.$aLi=null;
    this.$left=this.$oBox.find('.left');
    this.$right=this.$oBox.find('.right');
    this.init();
    this.data=null;
}
Tab.prototype={
    construct:Tab,
    init:function(){
        //1.获取数据
        this.getData();
        //2.绑定数据
        this.bind();
        //3.延迟加载
        this.lazyImg();
        //4.渐隐渐现
        //5.
    },
    getData:function(){
        var _this=this;
        $.ajax({
            type:'get',
            url:'json/data.txt',
            async:false,
            dataType:'json',
            success:function(val){
                _this.data=val
            }
        });
        console.log(this.data)
    },
    bind:function(){
        var strDiv='';
        var strLi='';
        $.each(this.data,function(index,item){
            strDiv+='<div><img src="" realImg="'+item.imgSrc+'" alt=""></div>';
            strLi+=index==0?'<li class="on"></li>':'<li></li>';
        });
        this.$oBoxInner.html(strDiv);
        this.$oUl.html(strLi);
        this.$aDiv=this.$oBoxInner.children('div');
        this.$aImg=this.$oBoxInner.find('img');
        this.$aLi=this.$oUl.find('li');
    },
    lazyImg:function(){
        var _this=this;
        $.each(this.$aImg,function(index,item){
            var tmpImg=new Image;
            tmpImg.src=item.getAttribute('realImg');
            tmpImg.onload=function(){
                $(item).attr('src',this.src);
                tmpImg=null;
                _this.$aDiv.first().css('zIndex',1).animate({opacity:1})
            }
        })
        console.log('a')
    }
}