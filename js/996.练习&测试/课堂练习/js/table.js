;(function(){
//1.获取元素
    var oTab = document.getElementById('tab');
    var tHead = oTab.tHead;
    var tCells = tHead.rows[0].cells;
    var tBody = oTab.tBodies[0];
    var aRows = tBody.rows;
    var data = null;
//2.获取数据
 getData();
    function getData() {
    var xml = new XMLHttpRequest();
    xml.open('get', 'data.txt', false);
    xml.onreadystatechange = function () {
        if (xml.readyState === 4 && /^2\d{2}/.test(xml.status)) {
            data = utils.jsonParse(xml.responseText)
        }
    }

xml.send();
    }
//3.绑定数据
bind();
function bind(){
    var frg=document.createDocumentFragment();
    for(var i=0;i<data.length;i++){
        var cur=data[i];
        var oTr=document.createElement('tr');
        for(var attr in cur){
            if(attr=='sex'){
                cur[attr]=cur[attr]==0?'男':'女';
            }
            var oTd=document.createElement('td');
            oTd.innerHTML=cur[attr];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg=null;
}
//4.各行换色
changeColor();
function changeColor(){
    for(var i=0;i<aRows.length;i++){
        aRows[i].className='bg'+i%2;
    }
}
//5.点击排序
function sort(n){

    //1.类数组转数组
    var ary=utils.makeArray(aRows);
    //2.sort排序
    ary.sort(function(a,b){
        a= a.cells[n].innerHTML;
        b= b.cells[n].innerHTML;
        if(isNaN(a)&&isNaN(b)){
            return (a.localeCompare(b))*tCells[n].flag
        }
        return (a-b)*tCells[n].flag;
    });
    //3.插入数组
    var frg=document.createDocumentFragment();
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg=null;
    changeColor();
}
for(var i=0;i<tCells.length;i++){
    if(tCells[i].className==='cursor'){
        tCells[i].flag=-1;
        tCells[i].index=i;
        tCells[i].onclick=function(){
            tCells[this.index].flag*=-1;
            sort(this.index);
        }
    }
}


})()