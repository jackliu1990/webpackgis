/**
 * Created by liufeng on 2017/11/2.
 */
window.g2 = window.g2 || {};
define(["./export","./map/ol/olmap"],function(gis,OlMap){
    var g2 = window.g2;
    g2.maps=g2.maps || {};
    g2.maps.Map = OlMap;
})