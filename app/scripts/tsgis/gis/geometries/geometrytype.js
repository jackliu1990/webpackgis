/**
 * @class GeometryType: 几何图形类型枚举
 * Created by ligang on 2014/9/15.
 */

define(function () {

    return {
        /***不指定具体形状类别的图形*/
        Geometry: 0,
        /***点状图形*/
        Point: 1,
        /***圆弧状图形*/
        Curve: 2,
        /***段状图形*/
        Segment: 3,
        /***矩形*/
        Envelope: 4,
        /***线形*/
        Line: 5,
        /***方形*/
        Rectangle: 6,
        /***正方形*/
        Square: 7,
        /***圆形*/
        Circle: 8,
        /***椭圆形*/
        Ellipse: 9,
        /***多个点表示的路径*/
        Path: 10,
        /***由一系列的点构成的环状闭合图形*/
        Ring: 11,
        /***多圆弧图形*/
        PolyCurve: 12,
        /***一个或多个路径状图形表示的空间几何图形*/
        Polyline: 13,
        /***一个或者多个环状图形表示的空间几何图形*/
        Polygon: 14,
        /**
         * 多点
         */
        MultiPoint: 15,
        /**
         * 多面
         */
        MultiPolygon: 16
    }
});
