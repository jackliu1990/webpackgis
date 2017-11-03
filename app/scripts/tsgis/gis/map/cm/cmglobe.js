/**
 * Created by liufeng on 2017/11/2.
 */
define(['../../../g2/lang/classUtil', '../map', '../globe'], function (ClassUtil, Map,Globe) {

    var globe = function(opts){
        var optss = opts || {};
        Globe.call(this,optss);
        Map.call(this,optss);
    }

    ClassUtil.extend2(globe,Globe);
    ClassUtil.extend2(globe,Map);
    return globe;
})