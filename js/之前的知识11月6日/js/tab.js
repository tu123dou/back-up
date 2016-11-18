/**
 * Created by QW on 2016/11/8.
 */
var oTab=document.getElementById('tab');
var tHead=oTab.tHead;
var tCells=tHead.rows[0].cells;
var tBody=oTab.tBodies[0];
var aRows=tBody.rows;
var data=null;
var xml=new XMLHttpRequest();
xml.open('get','data.txt',false);
xml.onreadystatechange=function(){
    if(xml.readyState===4&&/^2\d{2}/.test(xml.status)){
        data=utils.jsonParse(xml.responseText);
    }
}
xml.send();
console.log(data);
(function(){
    var frg=document.createDocumentFragment();
    for(var i=0;i<data.length;i++){
        var aTr=document.createElement('tr');
        for(var attr in data[i]){
            if(attr=='sex'){
                data[i][attr]=data[i][attr]==0?'男':'女';
            }
            var aTd=document.createElement('td');
            aTd.innerHTML=data[i][attr];
            aTr.appendChild(aTd);
        }
        frg.appendChild(aTr);
    }
    tBody.appendChild(frg);

})();
changeColor();
function changeColor(){
    for(var i=0;i<aRows.length;i++){
        aRows[i].className='bg'+i%2;
    }
}
function sort(n){
    for(var i=0;i<tCells.length;i++){
        if(n==i){
            tCells[n].frg*=-1
        }else{
            tCells[i].frg=-1
        }
    }
    var ary=utils.makeArray(aRows);
    ary.sort(function(a,b){
         a=a.cells[n].innerHTML;
        b=b.cells[n].innerHTML;
        if(isNaN(a)&&isNaN(b)){
            return a.localeCompare(b)*tCells[n].frg;
        }
        return (a-b)*tCells[n].frg;
    });
    var frg=document.createDocumentFragment();
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i])
    }
    tBody.appendChild(frg);
    frg=null;
    changeColor()
}
for(var i=0;i<tCells.length;i++){
     tCells[i].index=i;
    tCells[i].frg=-1;
    tCells[i].onclick=function(){
        sort(this.index)
    }

}