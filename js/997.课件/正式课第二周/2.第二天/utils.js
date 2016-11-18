/**
 * Created by 39753 on 2016/11/2.
 */
var utils={
    /**
     *
     * @param arg
     * @returns {Array}
     */
    makeArray:function makeArray(arg){
        var ary=[];
        try{
            ary=Array.prototype.slice.call(arg);
        }catch (e){
            for(var i=0; i<arg.length; i++){
                ary.push(arg[i]);
            }
        }
        return ary;
    },
    /**
     * jsonParse功能:把JSON格式的字符串，转成JSON格式的数据；
     * @param jsonStr JSON格式的字符串
     * @returns {Object}JSON格式的数据
     */
    jsonParse:function(jsonStr){
        return 'JSON' in window?JSON.parse(jsonStr):eval('('+jsonStr+')');
    }
}