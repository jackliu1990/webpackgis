/**
 * Created by liufeng on 2017/11/2.
 */
window.g2 = window.g2 || {};
define(['./geometries/geometrytype','./geometries/geometry',"./map/map","./map/globe"], function (GeometryType,Geometry,Map,Globe) {
    var g2 = window.g2;
    g2.geom = g2.geom ||{};
    g2.maps =g2.maps || {};
    g2.geom.GeometryType=GeometryType;
    g2.geom.Geometry =Geometry;
    g2.maps.IMap=Map;
    g2.maps.IGlobe = Globe;
})