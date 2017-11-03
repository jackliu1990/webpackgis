/**
 * Created by liufeng on 2017/11/2.
 */
/**
 * @class OlMap: OpenLayer地图类型
 * Created by ligang on 2014/9/17.
 */

define(['../../../g2/lang/classUtil', '../map',"../../../../../vendor/jquery.min"], function (ClassUtil, Map,jQuery) {
    console.log(window.jQuery);
   var olmap = function(opts){
       var optss = opts ||{};
       Map.call(this,optss);
   }
    ClassUtil.extend2(olmap, Map);
   return olmap;
})