/**
 * Created by QW on 2016/11/6.
 */
var utils={

    makeArray:function makeArray(oDiv) {
        var ary = [];
        try {
            ary=Array.prototype.slice.apply(oDiv)
        } catch (e) {
            for (var i = 0; i < oDiv.length; i++) {
                ary.push(oDiv[i])
            }
        }
        return ary
    },
    jsonParse:function jsonParse(str){
        return 'json'in window?JSON.parse(str) :eval('('+ str+')')
    }
};