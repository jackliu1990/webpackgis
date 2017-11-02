/**
 * Created by liufeng on 2017/11/2.
 */

define(['./geometries/geometrytype','./geometries/geometry',"./map/map","./map/globe"], function (GeometryType,Geometry,Map,Globe) {
    window.g2 = window.g2 || {};
    var g2 = window.g2;
    g2.geom = g2.geom ||{};
    g2.maps =g2.maps || {};
    g2.geom.GeometryType=GeometryType;
    g2.geom.Geometry =Geometry;
    g2.maps.IMap=Map;
    g2.maps.IGlobe = Globe;
    g2.maps.Globeddd55 = Globe;
})