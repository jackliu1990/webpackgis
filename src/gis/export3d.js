/**
 * Created by liufeng on 2017/11/2.
 */
define(["./export","./map/cm/cmglobe"],function(gis,CMGlobe){
    window.g2 = window.g2 || {};
    var g2 = window.g2;
    g2.maps=g2.maps || {}
    g2.maps.Globe=CMGlobe;

})