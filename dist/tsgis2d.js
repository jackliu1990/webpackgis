define(function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @class classUtil: 定义类型工具，实现类型继承
 *  Created by ligang on 2014/8/13.
 *  @modify }{yellow 
 */

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

    var id = 10000;

    var util = function util() {};

    util.extend = function (child, parent) {
        var F = function F() {};
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
        child.uber = parent.prototype;
    };

    util.extend2 = function (child, parent) {
        var p = parent.prototype;
        var c = child.prototype;
        for (var i in p) {
            c[i] = p[i];
        }
        c.uber = p;
    };

    util.isArray = function (obj) {
        return !!obj && obj.constructor == Array;
    };

    util.newId = function () {
        return id++;
    };

    util.extendCopy = function (p) {
        var c = {};
        for (var i in p) {
            c[i] = p[i];
        }
        c.uber = p;
        return c;
    };

    util.deepCopy = deepCopy;

    util.objectPlus = function (o, stuff) {
        var n;
        function F() {};
        F.prototype = o;
        n = new F();
        n.uber = o;

        for (var i in stuff) {
            n[i] = stuff[i];
        }

        return n;
    };

    util.extendMulti = function () {
        var n = {},
            stuff,
            j = 0,
            len = arguments.length;
        for (j = 0; j < len; j++) {
            stuff = arguments[j];
            for (var i in stuff) {
                n[i] = stuff[i];
            }
        }
        return n;
    };

    function deepCopy(p, c) {
        var c = c || {};
        for (var i in p) {
            if (_typeof(p[i]) === 'object') {
                c[i] = p[i].constructor === Array ? [] : {};
                deepCopy(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    }

    return util;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * @class Map: 地图类型，基类
 * Created by ligang on 2014/9/16.
 */

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

    /****
     * 定义地图要处理的事件列表
     * @returns 返回事件列表
     */
    function createEvents() {
        var events = {};
        events.click = [];
        events.mousemove = [];
        events.mouseout = [];
        events.mousedown = [];
        events.mouseup = [];
        events.dblclick = [];
        events.extentchanged = [];
        events.resize = [];
        return events;
    }

    var map = function map() {
        this.layers = [];
        this.tool = null;
        this.cursor = null;
        this.events = createEvents();
    };

    /*/!****定义地图图层列表*!/
    map.prototype.layers = [];
      /!****定义地图工具对象*!/
    map.prototype.tool = null;
      /!****定义地图鼠标的图标*!/
    map.prototype.cursor = null;
      /!***定义地图事件列表*!/
    map.prototype.events = createEvents();*/
    /***
     * 定义带参数的地图初始化
     * @param Anonymous opts 包含初始化参数的复杂对象
     */
    map.prototype.init = function (opts) {};

    /***
     * 定义添加图层方法
     * @param layer 添加的图层
     */
    map.prototype.addLayer = function (layer) {
        this.layers.push(layer);
    };
    /***
     * 获取可视范转
     */
    map.prototype.getExtent = function () {};
    /***
     * 删除图层
     * @param layer 要删除的图层
     */
    map.prototype.removeLayer = function (layer) {
        var index = this.layers.indexOf(layer);
        if (index > 0) {
            this.layers.splice(index, 1);
        }
    };
    /***
     * 设置鼠标样式
     * @param cursor 鼠标样式
     */
    map.prototype.setCursor = function (cursor) {};
    /***
     * 返回地图窗口尺寸 px单位
     */
    map.prototype.getViewSize = function () {};
    /***
     * 获取图层数量
     * @returns 返回图层数量
     */
    map.prototype.getLayerCount = function () {
        return this.layers.length;
    };

    /***
     * 获取指定索引位置的图层
     * @param index 索引
     * @returns 返回图层
     */
    map.prototype.getLayer = function (index) {
        return this.layers[index];
    };

    /***
     * 获取所有图层
     * @returns 返回图层数组
     */
    map.prototype.getLayers = function () {
        return this.layers;
    };

    /***
     * 获取地图缩放级别
     */
    map.prototype.getZoomLevel = function () {};

    /***
     * 获取分辨率
     */
    map.prototype.getResolution = function () {};

    /***
     * 获取坐标原点
     */
    map.prototype.getOrigin = function () {};

    /***
     * 查找图层
     * @param String name 图层名称
     * @returns {*}
     */
    map.prototype.findLayer = function (name) {
        for (var i = 0; i < this.layers.length; ++i) {
            var layer = this.layers[i];
            if (layer.name == name || layer.id == name) {
                return layer;
            }
        }
        return null;
    };

    /***
     * 监听指定名称的鼠标事件并设置关联的事件处理方法
     * @param String name 事件名称
     * @param Function func 处理方法名称
     */
    map.prototype.on = function (name, func) {
        if (name in this.events) {
            var events = this.events[name];
            events.push(func);
        }
    };

    /***
     * 取消监听指定名称的鼠标事件并取消事件处理方法的关联
     * @param String name 事件名称
     * @param Function func 处理方法名称
     */
    map.prototype.un = function (name, func) {
        if (name in this.events) {
            var events = this.events[name];
            for (var i = 0, len = events.length; i < len; ++i) {
                var event = events[i];
                if (event === func) {
                    events.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
    };

    /***
     * 地图缩放到空间数据定义的全图范围
     */
    map.prototype.fullExtend = function () {};

    /***
     * 地图缩小
     */
    map.prototype.zoomOut = function () {};

    /***
     * 地图放大
     */
    map.prototype.zoomIn = function () {};

    /***
     * 平移几何图形对象
     * @param geometry
     */
    map.prototype.pan = function (geometry) {};

    /***
     * 设定指定的坐标点为地图中心点
     * @param Point center 地理坐标点
     */
    map.prototype.setCenter = function (center) {};

    /***
     * 获取指定的地理坐标点显示在屏幕上的位置
     * @param Point coordinate 地理坐标点
     */
    map.prototype.getPixelFromCoordinate = function (coordinate) {};

    /***
     * 获取屏幕上指定像素点对应的地理坐标点
     * @param Point pixel 屏幕像素点坐标
     */
    map.prototype.getCoordinateFromPixel = function (pixel) {};

    /***
     * 导出
     * @param name 导出名称
     */
    map.prototype.export = function (name) {};

    /***
     * 停目拖拽
     */
    map.prototype.stopDragPan = function () {};

    /**
     * 继续拖拽
     */
    map.prototype.resumeDragpan = function () {};

    /***
     * 停止双击
     */
    map.prototype.stopDbClick = function () {};

    /***
     * 继续双击
     */
    map.prototype.resumeDbClick = function () {};

    /***
    * 添加地图相关控件
    * @param ol.control.Control
    */
    map.prototype.addControl = function (ctl) {};
    /***
     * 当前正在使用的地图工具
     * @param ToolBase tool
     */
    map.prototype.currentTool = function (tool) {
        if (this.tool != tool) {
            if (this.tool != null) {
                this.tool.deactivate();
            }
            this.tool = tool;
            if (this.tool != null) {
                this.cursor = this.tool.cursor;
            }
        }
    };

    /***
     * 鼠标单击事件
     * @param Number button 按下的鼠标按键
     * @param Number shift 是否同时按下的键盘上的shift键
     * @param Number screenX 事件发生时鼠标在屏幕上的X坐标
     * @param Number screenY 事件发生时鼠标在屏幕上的Y坐标
     * @param Number mapX 鼠标在地图上的X坐标
     * @param Number mapY 鼠标在地图上的Y坐标
     * @param Number handle 该事件是否已经不需要再处理
     */
    map.prototype.onMouseClick = function (button, shift, screenX, screenY, mapX, mapY, handle) {
        if (!!this.tool) {
            this.tool.onMouseClick(button, shift, screenX, screenY, mapX, mapY, handle);
        }
    };

    /****
     * 鼠标悬停事件
     * @param Event e 事件对象
     */
    map.prototype.onMouseOver = function (e) {
        if (this.tool != null) {
            this.tool.onMouseOver(e);
        }
    };

    /***
     * 鼠标按键按下时的事件处理方法
     * @param Number button 按下的鼠标按键
     * @param Number shift 是否同时按下的键盘上的shift键
     * @param Number screenX 事件发生时鼠标在屏幕上的X坐标
     * @param Number screenY 事件发生时鼠标在屏幕上的Y坐标
     * @param Number mapX 鼠标在地图上的X坐标
     * @param Number mapY 鼠标在地图上的Y坐标
     * @param Number handle 该事件是否已经不需要再处理
     */
    map.prototype.onMouseDown = function (button, shift, screenX, screenY, mapX, mapY, handle) {
        if (!!this.tool) {
            this.tool.onMouseDown(button, shift, screenX, screenY, mapX, mapY, handle);
        }

        for (var i = 0; i < this.events.mousedown.length; ++i) {
            var event = this.events.mousedown[i];
            event(button, shift, screenX, screenY, mapX, mapY, handle);
        }
    };

    /****
     * 鼠标按键按下后抬起的事件的处理方法
     * @param Number button 按下的鼠标按键
     * @param Number shift 是否同时按下的键盘上的shift键
     * @param Number screenX 事件发生时鼠标在屏幕上的X坐标
     * @param Number screenY 事件发生时鼠标在屏幕上的Y坐标
     * @param Number mapX 鼠标在地图上的X坐标
     * @param Number mapY 鼠标在地图上的Y坐标
     * @param Number handle 该事件是否已经不需要再处理
     */
    map.prototype.onMouseUp = function (button, shift, screenX, screenY, mapX, mapY, handle) {
        if (!!this.tool) {
            this.tool.onMouseUp(button, shift, screenX, screenY, mapX, mapY, handle);
        }

        for (var i = 0; i < this.events.mouseup.length; ++i) {
            var event = this.events.mouseup[i];
            event(button, shift, screenX, screenY, mapX, mapY, handle);
        }
    };

    /***
     * 鼠标移动事件处理方法
     * @param Number button 按下的鼠标按键
     * @param Number shift 是否同时按下的键盘上的shift键
     * @param Number screenX 事件发生时鼠标在屏幕上的X坐标
     * @param Number screenY 事件发生时鼠标在屏幕上的Y坐标
     * @param Number mapX 鼠标在地图上的X坐标
     * @param Number mapY 鼠标在地图上的Y坐标
     * @param Number handle 该事件是否已经不需要再处理
     */
    map.prototype.onMouseMove = function (button, shift, screenX, screenY, mapX, mapY, handle) {
        if (!!this.tool) {
            this.tool.onMouseMove ? this.tool.onMouseMove(button, shift, screenX, screenY, mapX, mapY, handle) : null;
        }

        for (var i = 0; i < this.events.mousemove.length; ++i) {
            var event = this.events.mousemove[i];
            event(button, shift, screenX, screenY, mapX, mapY, handle);
        }
    };

    /***
     * 地图可视范围改变事件
     * @param Number left 左上角X坐标
     * @param Number top 左上角Y坐标
     * @param Number right 右下角X坐标
     * @param Number bottom 右下角Y坐标
     */
    map.prototype.onExtentChanged = function (left, top, right, bottom) {
        if (!!this.tool) {
            this.tool.onExtentChanged ? this.tool.onExtentChanged(left, top, right, bottom) : null;
        }

        for (var i = 0; i < this.events.extentchanged.length; ++i) {
            var event = this.events.extentchanged[i];
            event(left, top, right, bottom);
        }
    };

    /***
     * 鼠标双击事件
     * @param Event e 事件对象
     */
    map.prototype.onDblclick = function (e) {
        if (this.tool != null) {
            this.tool.onDblclick(e);
        }
    };

    /***
     * 浏览器窗口大小改变事件
     * @param Number width 新的窗口宽度
     * @param Number height 新的窗口高度
     */
    map.prototype.onResize = function (width, height) {};

    /***
     * 地图获得焦点的事件
     * @param Event e 事件对象
     */
    map.prototype.onFocus = function (e) {};
    /***
     * 移除地图相关的交互
     */
    map.prototype.removeInteractions = function () {};
    /***
     * 重置地图相关的交互
     */
    map.prototype.resumeInteractions = function () {};

    return map;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * @class GeometryType: 几何图形类型枚举
 * Created by ligang on 2014/9/15.
 */

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

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
  };
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
    var globe = function globe() {};
    return globe;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6), __webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (GeometryType, Geometry, Map, Globe) {
    window.g2 = window.g2 || {};
    var g2 = window.g2;
    g2.geom = g2.geom || {};
    g2.maps = g2.maps || {};
    g2.geom.GeometryType = GeometryType;
    g2.geom.Geometry = Geometry;
    g2.maps.IMap = Map;
    g2.maps.IGlobe = Globe;
    g2.maps.Globeddd55liufeng = Globe;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ClassUtil) {
    window.g2 = window.g2 || {};
    var g2 = window.g2;
    g2.lang = g2.lang || {};
    g2.lang.ClassUtil = ClassUtil;
    g2.lang.a555 = ClassUtil;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * @class Geometry: 所有空间几何图形的基类型
 * Created by ligang on 2014/8/21.
 */

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (GeometryType) {
    var geometry = function geometry(opts) {
        this.$type = 'Geometry,http://www.Gs.com';
        var optss = opts || {};
        /***空间数据参考，如要查看更多资料，请参见enumSpatialReference枚举。*/
        this.spatialReference = optss.spatialReference;
    };

    /***浮点数类型计算精度，保留4位小数*/
    geometry.tolerate = 0.000000000001;

    /***
     * 设置空间数据参考
     * @param Number sr 新的空间数据参考
     */
    geometry.prototype.setSpatialReference = function (sr) {
        this.spatialReference = sr;
    };

    /****
     * 获取空间数据参考
     * @returns 返回整数形式表示的空间数据参考
     */
    geometry.prototype.getSpatialReference = function () {
        return this.spatialReference;
    };

    /***
     * 获取几何图形类型，如要查看更多资料，请参见GeometryType枚举。
     * @returns 返回GeometryType枚举
     */
    geometry.prototype.getGeometryType = function () {
        return GeometryType.Geometry;
    };

    /***空间数据参考值*/
    geometry.prototype.spatialReference = 0;

    /***
     * 比较两个几何图形对象是否相同
     * @param Geometry obj 比较的几何图形对象
     * @returns 返回true表示相同，返回false表示不同
     */
    geometry.prototype.equals = function (obj) {
        return false;
    };

    /***
     * 使几何图形正常化、规范化。
     */
    geometry.prototype.normalize = function () {};

    /***
     * 移动几何图形对象
     * @param Point point Geometry对象偏移量
     */
    geometry.prototype.offset = function (point) {};

    /***
     * 克隆对象
     * @returns 返回一个新的Geometry对象
     */
    geometry.prototype.copy = function () {
        return new geometry(this);
    };

    /***
     * 获取当前GIS形状的外接矩形
     */
    geometry.prototype.envelope = function () {};

    return geometry;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function (gis, OlMap) {
    window.g2 = window.g2 || {};
    var g2 = window.g2;
    g2.maps = g2.maps || {};
    g2.maps.Map = OlMap;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
/**
 * @class OlMap: OpenLayer地图类型
 * Created by ligang on 2014/9/17.
 */

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ClassUtil, Map) {

  var olmap = function olmap(opts) {
    var optss = opts || {};
    Map.call(this, optss);
  };
  ClassUtil.extend2(olmap, Map);
  return olmap;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function () {}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })
/******/ ])});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWE3OGRkYWJiZjE4MGMyOTA3ZGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2cyL2xhbmcvY2xhc3NVdGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9naXMvbWFwL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2lzL2dlb21ldHJpZXMvZ2VvbWV0cnl0eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9naXMvbWFwL2dsb2JlLmpzIiwid2VicGFjazovLy8uL3NyYy9naXMvZXhwb3J0LmpzIiwid2VicGFjazovLy8uL3NyYy9nMi9leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dpcy9nZW9tZXRyaWVzL2dlb21ldHJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9naXMvZXhwb3J0MmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dpcy9tYXAvb2wvb2xtYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzZ2lzMmQuanMiXSwibmFtZXMiOlsiaWQiLCJ1dGlsIiwiZXh0ZW5kIiwiY2hpbGQiLCJwYXJlbnQiLCJGIiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJ1YmVyIiwiZXh0ZW5kMiIsInAiLCJjIiwiaSIsImlzQXJyYXkiLCJvYmoiLCJBcnJheSIsIm5ld0lkIiwiZXh0ZW5kQ29weSIsImRlZXBDb3B5Iiwib2JqZWN0UGx1cyIsIm8iLCJzdHVmZiIsIm4iLCJleHRlbmRNdWx0aSIsImoiLCJsZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJjcmVhdGVFdmVudHMiLCJldmVudHMiLCJjbGljayIsIm1vdXNlbW92ZSIsIm1vdXNlb3V0IiwibW91c2Vkb3duIiwibW91c2V1cCIsImRibGNsaWNrIiwiZXh0ZW50Y2hhbmdlZCIsInJlc2l6ZSIsIm1hcCIsImxheWVycyIsInRvb2wiLCJjdXJzb3IiLCJpbml0Iiwib3B0cyIsImFkZExheWVyIiwibGF5ZXIiLCJwdXNoIiwiZ2V0RXh0ZW50IiwicmVtb3ZlTGF5ZXIiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJzZXRDdXJzb3IiLCJnZXRWaWV3U2l6ZSIsImdldExheWVyQ291bnQiLCJnZXRMYXllciIsImdldExheWVycyIsImdldFpvb21MZXZlbCIsImdldFJlc29sdXRpb24iLCJnZXRPcmlnaW4iLCJmaW5kTGF5ZXIiLCJuYW1lIiwib24iLCJmdW5jIiwidW4iLCJldmVudCIsImZ1bGxFeHRlbmQiLCJ6b29tT3V0Iiwiem9vbUluIiwicGFuIiwiZ2VvbWV0cnkiLCJzZXRDZW50ZXIiLCJjZW50ZXIiLCJnZXRQaXhlbEZyb21Db29yZGluYXRlIiwiY29vcmRpbmF0ZSIsImdldENvb3JkaW5hdGVGcm9tUGl4ZWwiLCJwaXhlbCIsImV4cG9ydCIsInN0b3BEcmFnUGFuIiwicmVzdW1lRHJhZ3BhbiIsInN0b3BEYkNsaWNrIiwicmVzdW1lRGJDbGljayIsImFkZENvbnRyb2wiLCJjdGwiLCJjdXJyZW50VG9vbCIsImRlYWN0aXZhdGUiLCJvbk1vdXNlQ2xpY2siLCJidXR0b24iLCJzaGlmdCIsInNjcmVlblgiLCJzY3JlZW5ZIiwibWFwWCIsIm1hcFkiLCJoYW5kbGUiLCJvbk1vdXNlT3ZlciIsImUiLCJvbk1vdXNlRG93biIsIm9uTW91c2VVcCIsIm9uTW91c2VNb3ZlIiwib25FeHRlbnRDaGFuZ2VkIiwibGVmdCIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwib25EYmxjbGljayIsIm9uUmVzaXplIiwid2lkdGgiLCJoZWlnaHQiLCJvbkZvY3VzIiwicmVtb3ZlSW50ZXJhY3Rpb25zIiwicmVzdW1lSW50ZXJhY3Rpb25zIiwiR2VvbWV0cnkiLCJQb2ludCIsIkN1cnZlIiwiU2VnbWVudCIsIkVudmVsb3BlIiwiTGluZSIsIlJlY3RhbmdsZSIsIlNxdWFyZSIsIkNpcmNsZSIsIkVsbGlwc2UiLCJQYXRoIiwiUmluZyIsIlBvbHlDdXJ2ZSIsIlBvbHlsaW5lIiwiUG9seWdvbiIsIk11bHRpUG9pbnQiLCJNdWx0aVBvbHlnb24iLCJnbG9iZSIsIkdlb21ldHJ5VHlwZSIsIk1hcCIsIkdsb2JlIiwid2luZG93IiwiZzIiLCJnZW9tIiwibWFwcyIsIklNYXAiLCJJR2xvYmUiLCJHbG9iZWRkZDU1bGl1ZmVuZyIsIkNsYXNzVXRpbCIsImxhbmciLCJhNTU1IiwiJHR5cGUiLCJvcHRzcyIsInNwYXRpYWxSZWZlcmVuY2UiLCJ0b2xlcmF0ZSIsInNldFNwYXRpYWxSZWZlcmVuY2UiLCJzciIsImdldFNwYXRpYWxSZWZlcmVuY2UiLCJnZXRHZW9tZXRyeVR5cGUiLCJlcXVhbHMiLCJub3JtYWxpemUiLCJvZmZzZXQiLCJwb2ludCIsImNvcHkiLCJlbnZlbG9wZSIsImdpcyIsIk9sTWFwIiwib2xtYXAiLCJjYWxsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7O0FBTUEsa0NBQU8sWUFBWTs7QUFFZixRQUFJQSxLQUFLLEtBQVQ7O0FBRUEsUUFBSUMsT0FBTyxTQUFQQSxJQUFPLEdBQVcsQ0FBRSxDQUF4Qjs7QUFFQUEsU0FBS0MsTUFBTCxHQUFjLFVBQVNDLEtBQVQsRUFBZ0JDLE1BQWhCLEVBQXdCO0FBQ2xDLFlBQUlDLElBQUksU0FBSkEsQ0FBSSxHQUFXLENBQUUsQ0FBckI7QUFDQUEsVUFBRUMsU0FBRixHQUFjRixPQUFPRSxTQUFyQjtBQUNBSCxjQUFNRyxTQUFOLEdBQWtCLElBQUlELENBQUosRUFB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Rzs7Ozs7Ozs7Ozs7QUNSQTs7O0FBR0EsaUNBQU8sQ0FBQyxzQkFBRCxFQUFlLHNCQUFmLENBQVAsa0NBQXdDLFlBQVUsQ0FFakQsQ0FGRDtBQUFBLHFHIiwiZmlsZSI6InRzZ2lzMmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxYTc4ZGRhYmJmMTgwYzI5MDdkZSIsIi8qKlxyXG4gKiBAY2xhc3MgY2xhc3NVdGlsOiDlrprkuYnnsbvlnovlt6XlhbfvvIzlrp7njrDnsbvlnovnu6fmib9cclxuICogIENyZWF0ZWQgYnkgbGlnYW5nIG9uIDIwMTQvOC8xMy5cclxuICogIEBtb2RpZnkgfXt5ZWxsb3cgXHJcbiAqL1xyXG5cclxuZGVmaW5lKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgaWQgPSAxMDAwMDtcclxuXHJcbiAgICB2YXIgdXRpbCA9IGZ1bmN0aW9uKCkge31cclxuXHJcbiAgICB1dGlsLmV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHtcclxuICAgICAgICB2YXIgRiA9IGZ1bmN0aW9uKCkge307XHJcbiAgICAgICAgRi5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xyXG4gICAgICAgIGNoaWxkLnByb3RvdHlwZSA9IG5ldyBGKCk7XHJcbiAgICAgICAgY2hpbGQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2hpbGQ7XHJcbiAgICAgICAgY2hpbGQudWJlciA9IHBhcmVudC5wcm90b3R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgdXRpbC5leHRlbmQyID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkge1xyXG4gICAgICAgIHZhciBwID0gcGFyZW50LnByb3RvdHlwZTtcclxuICAgICAgICB2YXIgYyA9IGNoaWxkLnByb3RvdHlwZTtcclxuICAgICAgICBmb3IgKCB2YXIgaSBpbiBwKSB7XHJcbiAgICAgICAgICAgIGNbaV0gPSBwW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjLnViZXIgPSBwO1xyXG4gICAgfVxyXG5cclxuICAgIHV0aWwuaXNBcnJheSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICByZXR1cm4gKCEhb2JqICYmIG9iai5jb25zdHJ1Y3RvciA9PSBBcnJheSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXRpbC5uZXdJZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gaWQrKztcclxuICAgIH1cclxuXHJcbiAgICB1dGlsLmV4dGVuZENvcHk9IGZ1bmN0aW9uKHApIHtcclxuICAgICAgICB2YXIgYyA9IHt9O1xyXG4gICAgICAgIGZvciAoIHZhciBpIGluIHAgKSB7XHJcbiAgICAgICAgICAgIGNbaV0gPSBwW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjLnViZXIgPSBwO1xyXG4gICAgICAgIHJldHVybiBjO1xyXG4gICAgfVxyXG5cclxuICAgIHV0aWwuZGVlcENvcHkgPSBkZWVwQ29weTtcclxuXHJcbiAgICB1dGlsLm9iamVjdFBsdXMgPSBmdW5jdGlvbihvLCBzdHVmZikge1xyXG4gICAgICAgIHZhciBuO1xyXG4gICAgICAgIGZ1bmN0aW9uIEYoKSB7fTtcclxuICAgICAgICBGLnByb3RvdHlwZSA9IG87XHJcbiAgICAgICAgbiA9IG5ldyBGKCk7XHJcbiAgICAgICAgbi51YmVyID0gbztcclxuXHJcbiAgICAgICAgZm9yICggdmFyIGkgaW4gc3R1ZmYpIHtcclxuICAgICAgICAgICAgbltpXSA9IHN0dWZmW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG47XHJcbiAgICB9XHJcblxyXG4gICAgdXRpbC5leHRlbmRNdWx0aSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBuID0ge30sIHN0dWZmLCBqID0gMCwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGxlbjsgaisrKSB7XHJcbiAgICAgICAgICAgIHN0dWZmID0gYXJndW1lbnRzW2pdO1xyXG4gICAgICAgICAgICBmb3IgKCB2YXIgaSBpbiBzdHVmZikge1xyXG4gICAgICAgICAgICAgICAgbltpXSA9IHN0dWZmW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlZXBDb3B5KHAsIGMpIHtcclxuICAgICAgICB2YXIgYyA9IGMgfHwge307XHJcbiAgICAgICAgZm9yICggdmFyIGkgaW4gcCApIHtcclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgcFtpXSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGNbaV0gPSAocFtpXS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpID8gW10gOiB7fTtcclxuICAgICAgICAgICAgICAgIGRlZXBDb3B5KHBbaV0sIGNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY1tpXSA9IHBbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHV0aWw7XHJcblxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2cyL2xhbmcvY2xhc3NVdGlsLmpzIiwiLyoqXHJcbiAqIEBjbGFzcyBNYXA6IOWcsOWbvuexu+Wei++8jOWfuuexu1xyXG4gKiBDcmVhdGVkIGJ5IGxpZ2FuZyBvbiAyMDE0LzkvMTYuXHJcbiAqL1xyXG5cclxuZGVmaW5lKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvKioqKlxyXG4gICAgICog5a6a5LmJ5Zyw5Zu+6KaB5aSE55CG55qE5LqL5Lu25YiX6KGoXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57kuovku7bliJfooahcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlRXZlbnRzKCkge1xyXG4gICAgICAgIHZhciBldmVudHMgPSB7fTtcclxuICAgICAgICBldmVudHMuY2xpY2sgPSBbXTtcclxuICAgICAgICBldmVudHMubW91c2Vtb3ZlID0gW107XHJcbiAgICAgICAgZXZlbnRzLm1vdXNlb3V0ID0gW107XHJcbiAgICAgICAgZXZlbnRzLm1vdXNlZG93biA9IFtdO1xyXG4gICAgICAgIGV2ZW50cy5tb3VzZXVwID0gW107XHJcbiAgICAgICAgZXZlbnRzLmRibGNsaWNrID0gW107XHJcbiAgICAgICAgZXZlbnRzLmV4dGVudGNoYW5nZWQgPSBbXTtcclxuICAgICAgICBldmVudHMucmVzaXplID0gW107XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50cztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbWFwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy50b29sID0gbnVsbDtcclxuICAgICAgICB0aGlzLmN1cnNvciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSBjcmVhdGVFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKi8hKioqKuWumuS5ieWcsOWbvuWbvuWxguWIl+ihqCohL1xyXG4gICAgbWFwLnByb3RvdHlwZS5sYXllcnMgPSBbXTtcclxuXHJcbiAgICAvISoqKirlrprkuYnlnLDlm77lt6Xlhbflr7nosaEqIS9cclxuICAgIG1hcC5wcm90b3R5cGUudG9vbCA9IG51bGw7XHJcblxyXG4gICAgLyEqKioq5a6a5LmJ5Zyw5Zu+6byg5qCH55qE5Zu+5qCHKiEvXHJcbiAgICBtYXAucHJvdG90eXBlLmN1cnNvciA9IG51bGw7XHJcblxyXG4gICAgLyEqKirlrprkuYnlnLDlm77kuovku7bliJfooagqIS9cclxuICAgIG1hcC5wcm90b3R5cGUuZXZlbnRzID0gY3JlYXRlRXZlbnRzKCk7Ki9cclxuICAgIC8qKipcclxuICAgICAqIOWumuS5ieW4puWPguaVsOeahOWcsOWbvuWIneWni+WMllxyXG4gICAgICogQHBhcmFtIEFub255bW91cyBvcHRzIOWMheWQq+WIneWni+WMluWPguaVsOeahOWkjeadguWvueixoVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0cykge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWumuS5iea3u+WKoOWbvuWxguaWueazlVxyXG4gICAgICogQHBhcmFtIGxheWVyIOa3u+WKoOeahOWbvuWxglxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmFkZExheWVyID0gZnVuY3Rpb24gKGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy5sYXllcnMucHVzaChsYXllcik7XHJcbiAgICB9XHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5blj6/op4bojIPovaxcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRFeHRlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcbiAgICAvKioqXHJcbiAgICAgKiDliKDpmaTlm77lsYJcclxuICAgICAqIEBwYXJhbSBsYXllciDopoHliKDpmaTnmoTlm77lsYJcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5yZW1vdmVMYXllciA9IGZ1bmN0aW9uIChsYXllcikge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMubGF5ZXJzLmluZGV4T2YobGF5ZXIpO1xyXG4gICAgICAgIGlmKGluZGV4PjApIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKioqXHJcbiAgICAgKiDorr7nva7pvKDmoIfmoLflvI9cclxuICAgICAqIEBwYXJhbSBjdXJzb3Ig6byg5qCH5qC35byPXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuc2V0Q3Vyc29yID0gZnVuY3Rpb24gKGN1cnNvcikge1xyXG5cclxuICAgIH1cclxuICAgIC8qKipcclxuICAgICAqIOi/lOWbnuWcsOWbvueql+WPo+WwuuWvuCBweOWNleS9jVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldFZpZXdTaXplID0gZnVuY3Rpb24oKXtcclxuICAgIH1cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluWbvuWxguaVsOmHj1xyXG4gICAgICogQHJldHVybnMg6L+U5Zue5Zu+5bGC5pWw6YePXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0TGF5ZXJDb3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllcnMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluaMh+Wumue0ouW8leS9jee9rueahOWbvuWxglxyXG4gICAgICogQHBhcmFtIGluZGV4IOe0ouW8lVxyXG4gICAgICogQHJldHVybnMg6L+U5Zue5Zu+5bGCXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0TGF5ZXIgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllcnNbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluaJgOacieWbvuWxglxyXG4gICAgICogQHJldHVybnMg6L+U5Zue5Zu+5bGC5pWw57uEXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0TGF5ZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxheWVycztcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5blnLDlm77nvKnmlL7nuqfliKtcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRab29tTGV2ZWwgPSBmdW5jdGlvbigpe31cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5bliIbovqjnjodcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRSZXNvbHV0aW9uID0gZnVuY3Rpb24oKXtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5blnZDmoIfljp/ngrlcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRPcmlnaW4gPSBmdW5jdGlvbigpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDmn6Xmib7lm77lsYJcclxuICAgICAqIEBwYXJhbSBTdHJpbmcgbmFtZSDlm77lsYLlkI3np7BcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmZpbmRMYXllciA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxheWVycy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmxheWVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKGxheWVyLm5hbWUgPT0gbmFtZSB8fCBsYXllci5pZCA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGF5ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog55uR5ZCs5oyH5a6a5ZCN56ew55qE6byg5qCH5LqL5Lu25bm26K6+572u5YWz6IGU55qE5LqL5Lu25aSE55CG5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gU3RyaW5nIG5hbWUg5LqL5Lu25ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gRnVuY3Rpb24gZnVuYyDlpITnkIbmlrnms5XlkI3np7BcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChuYW1lLCBmdW5jKSB7XHJcbiAgICAgICAgaWYgKG5hbWUgaW4gdGhpcy5ldmVudHMpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuZXZlbnRzW25hbWVdO1xyXG4gICAgICAgICAgICBldmVudHMucHVzaChmdW5jKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5Y+W5raI55uR5ZCs5oyH5a6a5ZCN56ew55qE6byg5qCH5LqL5Lu25bm25Y+W5raI5LqL5Lu25aSE55CG5pa55rOV55qE5YWz6IGUXHJcbiAgICAgKiBAcGFyYW0gU3RyaW5nIG5hbWUg5LqL5Lu25ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gRnVuY3Rpb24gZnVuYyDlpITnkIbmlrnms5XlkI3np7BcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS51biA9IGZ1bmN0aW9uIChuYW1lLCBmdW5jKSB7XHJcbiAgICAgICAgaWYgKG5hbWUgaW4gIHRoaXMuZXZlbnRzKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudHMgPSB0aGlzLmV2ZW50c1tuYW1lXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2ZW50cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYoZXZlbnQgPT09IGZ1bmMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5Zyw5Zu+57yp5pS+5Yiw56m66Ze05pWw5o2u5a6a5LmJ55qE5YWo5Zu+6IyD5Zu0XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZnVsbEV4dGVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlnLDlm77nvKnlsI9cclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS56b29tT3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWcsOWbvuaUvuWkp1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnpvb21JbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlubPnp7vlh6DkvZXlm77lvaLlr7nosaFcclxuICAgICAqIEBwYXJhbSBnZW9tZXRyeVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnBhbiA9IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiuvuWumuaMh+WumueahOWdkOagh+eCueS4uuWcsOWbvuS4reW/g+eCuVxyXG4gICAgICogQHBhcmFtIFBvaW50IGNlbnRlciDlnLDnkIblnZDmoIfngrlcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5zZXRDZW50ZXIgPSBmdW5jdGlvbiAoY2VudGVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5oyH5a6a55qE5Zyw55CG5Z2Q5qCH54K55pi+56S65Zyo5bGP5bmV5LiK55qE5L2N572uXHJcbiAgICAgKiBAcGFyYW0gUG9pbnQgY29vcmRpbmF0ZSDlnLDnkIblnZDmoIfngrlcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRQaXhlbEZyb21Db29yZGluYXRlID0gZnVuY3Rpb24gKGNvb3JkaW5hdGUpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5blsY/luZXkuIrmjIflrprlg4/ntKDngrnlr7nlupTnmoTlnLDnkIblnZDmoIfngrlcclxuICAgICAqIEBwYXJhbSBQb2ludCBwaXhlbCDlsY/luZXlg4/ntKDngrnlnZDmoIdcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRDb29yZGluYXRlRnJvbVBpeGVsID0gZnVuY3Rpb24gKHBpeGVsKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5a+85Ye6XHJcbiAgICAgKiBAcGFyYW0gbmFtZSDlr7zlh7rlkI3np7BcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5leHBvcnQgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWBnOebruaLluaLvVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnN0b3BEcmFnUGFuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57un57ut5ouW5ou9XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUucmVzdW1lRHJhZ3BhbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlgZzmraLlj4zlh7tcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5zdG9wRGJDbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDnu6fnu63lj4zlh7tcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5yZXN1bWVEYkNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgKiDmt7vliqDlnLDlm77nm7jlhbPmjqfku7ZcclxuICAgICogQHBhcmFtIG9sLmNvbnRyb2wuQ29udHJvbFxyXG4gICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5hZGRDb250cm9sID0gZnVuY3Rpb24gKGN0bCkge1xyXG4gICAgfVxyXG4gICAgLyoqKlxyXG4gICAgICog5b2T5YmN5q2j5Zyo5L2/55So55qE5Zyw5Zu+5bel5YW3XHJcbiAgICAgKiBAcGFyYW0gVG9vbEJhc2UgdG9vbFxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmN1cnJlbnRUb29sID0gZnVuY3Rpb24gKHRvb2wpIHtcclxuICAgICAgICBpZiAodGhpcy50b29sICE9IHRvb2wpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudG9vbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2wuZGVhY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudG9vbCA9IHRvb2w7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRvb2wgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJzb3IgPSB0aGlzLnRvb2wuY3Vyc29yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOm8oOagh+WNleWHu+S6i+S7tlxyXG4gICAgICogQHBhcmFtIE51bWJlciBidXR0b24g5oyJ5LiL55qE6byg5qCH5oyJ6ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNoaWZ0IOaYr+WQpuWQjOaXtuaMieS4i+eahOmUruebmOS4iueahHNoaWZ06ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblgg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBzY3JlZW5ZIOS6i+S7tuWPkeeUn+aXtum8oOagh+WcqOWxj+W5leS4iueahFnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWCDpvKDmoIflnKjlnLDlm77kuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIG1hcFkg6byg5qCH5Zyo5Zyw5Zu+5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBoYW5kbGUg6K+l5LqL5Lu25piv5ZCm5bey57uP5LiN6ZyA6KaB5YaN5aSE55CGXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25Nb3VzZUNsaWNrID0gZnVuY3Rpb24gKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSkge1xyXG4gICAgICAgIGlmICghIXRoaXMudG9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2wub25Nb3VzZUNsaWNrKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqXHJcbiAgICAgKiDpvKDmoIfmgqzlgZzkuovku7ZcclxuICAgICAqIEBwYXJhbSBFdmVudCBlIOS6i+S7tuWvueixoVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uTW91c2VPdmVyID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAodGhpcy50b29sICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50b29sLm9uTW91c2VPdmVyKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDpvKDmoIfmjInplK7mjInkuIvml7bnmoTkuovku7blpITnkIbmlrnms5VcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgYnV0dG9uIOaMieS4i+eahOm8oOagh+aMiemUrlxyXG4gICAgICogQHBhcmFtIE51bWJlciBzaGlmdCDmmK/lkKblkIzml7bmjInkuIvnmoTplK7nm5jkuIrnmoRzaGlmdOmUrlxyXG4gICAgICogQHBhcmFtIE51bWJlciBzY3JlZW5YIOS6i+S7tuWPkeeUn+aXtum8oOagh+WcqOWxj+W5leS4iueahFjlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2NyZWVuWSDkuovku7blj5HnlJ/ml7bpvKDmoIflnKjlsY/luZXkuIrnmoRZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIG1hcFgg6byg5qCH5Zyo5Zyw5Zu+5LiK55qEWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBtYXBZIOm8oOagh+WcqOWcsOWbvuS4iueahFnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgaGFuZGxlIOivpeS6i+S7tuaYr+WQpuW3sue7j+S4jemcgOimgeWGjeWkhOeQhlxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uTW91c2VEb3duID0gZnVuY3Rpb24gKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSkge1xyXG4gICAgICAgIGlmICghIXRoaXMudG9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2wub25Nb3VzZURvd24oYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ldmVudHMubW91c2Vkb3duLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IHRoaXMuZXZlbnRzLm1vdXNlZG93bltpXTtcclxuICAgICAgICAgICAgZXZlbnQoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKipcclxuICAgICAqIOm8oOagh+aMiemUruaMieS4i+WQjuaKrOi1t+eahOS6i+S7tueahOWkhOeQhuaWueazlVxyXG4gICAgICogQHBhcmFtIE51bWJlciBidXR0b24g5oyJ5LiL55qE6byg5qCH5oyJ6ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNoaWZ0IOaYr+WQpuWQjOaXtuaMieS4i+eahOmUruebmOS4iueahHNoaWZ06ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblgg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBzY3JlZW5ZIOS6i+S7tuWPkeeUn+aXtum8oOagh+WcqOWxj+W5leS4iueahFnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWCDpvKDmoIflnKjlnLDlm77kuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIG1hcFkg6byg5qCH5Zyo5Zyw5Zu+5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBoYW5kbGUg6K+l5LqL5Lu25piv5ZCm5bey57uP5LiN6ZyA6KaB5YaN5aSE55CGXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25Nb3VzZVVwID0gZnVuY3Rpb24gKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSkge1xyXG4gICAgICAgIGlmICghIXRoaXMudG9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2wub25Nb3VzZVVwKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZXZlbnRzLm1vdXNldXAubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudHMubW91c2V1cFtpXTtcclxuICAgICAgICAgICAgZXZlbnQoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6byg5qCH56e75Yqo5LqL5Lu25aSE55CG5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGJ1dHRvbiDmjInkuIvnmoTpvKDmoIfmjInplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2hpZnQg5piv5ZCm5ZCM5pe25oyJ5LiL55qE6ZSu55uY5LiK55qEc2hpZnTplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2NyZWVuWCDkuovku7blj5HnlJ/ml7bpvKDmoIflnKjlsY/luZXkuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblkg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBtYXBYIOm8oOagh+WcqOWcsOWbvuS4iueahFjlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWSDpvKDmoIflnKjlnLDlm77kuIrnmoRZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGhhbmRsZSDor6Xkuovku7bmmK/lkKblt7Lnu4/kuI3pnIDopoHlho3lpITnkIZcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbk1vdXNlTW92ZSA9IGZ1bmN0aW9uIChidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpIHtcclxuICAgICAgICBpZiAoISF0aGlzLnRvb2wpIHtcclxuICAgICAgICAgICAgdGhpcy50b29sLm9uTW91c2VNb3ZlID8gdGhpcy50b29sLm9uTW91c2VNb3ZlKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSkgOiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV2ZW50cy5tb3VzZW1vdmUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudHMubW91c2Vtb3ZlW2ldO1xyXG4gICAgICAgICAgICBldmVudChidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlnLDlm77lj6/op4bojIPlm7TmlLnlj5jkuovku7ZcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbGVmdCDlt6bkuIrop5JY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHRvcCDlt6bkuIrop5JZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHJpZ2h0IOWPs+S4i+inkljlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgYm90dG9tIOWPs+S4i+inklnlnZDmoIdcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbkV4dGVudENoYW5nZWQgPSBmdW5jdGlvbiAobGVmdCwgdG9wLCByaWdodCwgYm90dG9tKSB7XHJcbiAgICAgICAgaWYgKCEhdGhpcy50b29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbC5vbkV4dGVudENoYW5nZWQgPyB0aGlzLnRvb2wub25FeHRlbnRDaGFuZ2VkKGxlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbSkgOiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV2ZW50cy5leHRlbnRjaGFuZ2VkLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IHRoaXMuZXZlbnRzLmV4dGVudGNoYW5nZWRbaV07XHJcbiAgICAgICAgICAgIGV2ZW50KGxlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOm8oOagh+WPjOWHu+S6i+S7tlxyXG4gICAgICogQHBhcmFtIEV2ZW50IGUg5LqL5Lu25a+56LGhXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25EYmxjbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudG9vbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbC5vbkRibGNsaWNrKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDmtY/op4jlmajnqpflj6PlpKflsI/mlLnlj5jkuovku7ZcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgd2lkdGgg5paw55qE56qX5Y+j5a695bqmXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGhlaWdodCDmlrDnmoTnqpflj6Ppq5jluqZcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vblJlc2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5Zyw5Zu+6I635b6X54Sm54K555qE5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gRXZlbnQgZSDkuovku7blr7nosaFcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbkZvY3VzID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIH1cclxuICAgIC8qKipcclxuICAgICAqIOenu+mZpOWcsOWbvuebuOWFs+eahOS6pOS6klxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnJlbW92ZUludGVyYWN0aW9ucyA9IGZ1bmN0aW9uKCl7fVxyXG4gICAgLyoqKlxyXG4gICAgICog6YeN572u5Zyw5Zu+55u45YWz55qE5Lqk5LqSXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUucmVzdW1lSW50ZXJhY3Rpb25zID0gZnVuY3Rpb24oKXt9XHJcbiAgICBcclxuICAgIHJldHVybiBtYXA7XHJcblxyXG59KVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2lzL21hcC9tYXAuanMiLCIvKipcclxuICogQGNsYXNzIEdlb21ldHJ5VHlwZTog5Yeg5L2V5Zu+5b2i57G75Z6L5p6a5Li+XHJcbiAqIENyZWF0ZWQgYnkgbGlnYW5nIG9uIDIwMTQvOS8xNS5cclxuICovXHJcblxyXG5kZWZpbmUoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgLyoqKuS4jeaMh+WumuWFt+S9k+W9oueKtuexu+WIq+eahOWbvuW9oiovXHJcbiAgICAgICAgR2VvbWV0cnk6IDAsXHJcbiAgICAgICAgLyoqKueCueeKtuWbvuW9oiovXHJcbiAgICAgICAgUG9pbnQ6IDEsXHJcbiAgICAgICAgLyoqKuWchuW8p+eKtuWbvuW9oiovXHJcbiAgICAgICAgQ3VydmU6IDIsXHJcbiAgICAgICAgLyoqKuauteeKtuWbvuW9oiovXHJcbiAgICAgICAgU2VnbWVudDogMyxcclxuICAgICAgICAvKioq55+p5b2iKi9cclxuICAgICAgICBFbnZlbG9wZTogNCxcclxuICAgICAgICAvKioq57q/5b2iKi9cclxuICAgICAgICBMaW5lOiA1LFxyXG4gICAgICAgIC8qKirmlrnlvaIqL1xyXG4gICAgICAgIFJlY3RhbmdsZTogNixcclxuICAgICAgICAvKioq5q2j5pa55b2iKi9cclxuICAgICAgICBTcXVhcmU6IDcsXHJcbiAgICAgICAgLyoqKuWchuW9oiovXHJcbiAgICAgICAgQ2lyY2xlOiA4LFxyXG4gICAgICAgIC8qKirmpK3lnIblvaIqL1xyXG4gICAgICAgIEVsbGlwc2U6IDksXHJcbiAgICAgICAgLyoqKuWkmuS4queCueihqOekuueahOi3r+W+hCovXHJcbiAgICAgICAgUGF0aDogMTAsXHJcbiAgICAgICAgLyoqKueUseS4gOezu+WIl+eahOeCueaehOaIkOeahOeOr+eKtumXreWQiOWbvuW9oiovXHJcbiAgICAgICAgUmluZzogMTEsXHJcbiAgICAgICAgLyoqKuWkmuWchuW8p+WbvuW9oiovXHJcbiAgICAgICAgUG9seUN1cnZlOiAxMixcclxuICAgICAgICAvKioq5LiA5Liq5oiW5aSa5Liq6Lev5b6E54q25Zu+5b2i6KGo56S655qE56m66Ze05Yeg5L2V5Zu+5b2iKi9cclxuICAgICAgICBQb2x5bGluZTogMTMsXHJcbiAgICAgICAgLyoqKuS4gOS4quaIluiAheWkmuS4queOr+eKtuWbvuW9ouihqOekuueahOepuumXtOWHoOS9leWbvuW9oiovXHJcbiAgICAgICAgUG9seWdvbjogMTQsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5aSa54K5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTXVsdGlQb2ludDogMTUsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5aSa6Z2iXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTXVsdGlQb2x5Z29uOiAxNlxyXG4gICAgfVxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dpcy9nZW9tZXRyaWVzL2dlb21ldHJ5dHlwZS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuZGVmaW5lKFtdLGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgZ2xvYmUgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgIH1cclxuICAgIHJldHVybiBnbG9iZTtcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2lzL21hcC9nbG9iZS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuXHJcbmRlZmluZShbJy4vZ2VvbWV0cmllcy9nZW9tZXRyeXR5cGUnLCcuL2dlb21ldHJpZXMvZ2VvbWV0cnknLFwiLi9tYXAvbWFwXCIsXCIuL21hcC9nbG9iZVwiXSwgZnVuY3Rpb24gKEdlb21ldHJ5VHlwZSxHZW9tZXRyeSxNYXAsR2xvYmUpIHtcclxuICAgIHdpbmRvdy5nMiA9IHdpbmRvdy5nMiB8fCB7fTtcclxuICAgIHZhciBnMiA9IHdpbmRvdy5nMjtcclxuICAgIGcyLmdlb20gPSBnMi5nZW9tIHx8e307XHJcbiAgICBnMi5tYXBzID1nMi5tYXBzIHx8IHt9O1xyXG4gICAgZzIuZ2VvbS5HZW9tZXRyeVR5cGU9R2VvbWV0cnlUeXBlO1xyXG4gICAgZzIuZ2VvbS5HZW9tZXRyeSA9R2VvbWV0cnk7XHJcbiAgICBnMi5tYXBzLklNYXA9TWFwO1xyXG4gICAgZzIubWFwcy5JR2xvYmUgPSBHbG9iZTtcclxuICAgIGcyLm1hcHMuR2xvYmVkZGQ1NWxpdWZlbmcgPSBHbG9iZTtcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2lzL2V4cG9ydC5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuZGVmaW5lKFsnLi9sYW5nL2NsYXNzVXRpbCddLCBmdW5jdGlvbiAoQ2xhc3NVdGlsKSB7XHJcbiAgICB3aW5kb3cuZzIgPSB3aW5kb3cuZzIgfHwge307XHJcbiAgICB2YXIgZzIgPSB3aW5kb3cuZzI7XHJcbiAgICBnMi5sYW5nPWcyLmxhbmcgfHwge307XHJcbiAgICBnMi5sYW5nLkNsYXNzVXRpbCA9IENsYXNzVXRpbDtcclxuICAgIGcyLmxhbmcuYTU1NT0gQ2xhc3NVdGlsO1xyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nMi9leHBvcnQuanMiLCIvKipcclxuICogQGNsYXNzIEdlb21ldHJ5OiDmiYDmnInnqbrpl7Tlh6DkvZXlm77lvaLnmoTln7rnsbvlnotcclxuICogQ3JlYXRlZCBieSBsaWdhbmcgb24gMjAxNC84LzIxLlxyXG4gKi9cclxuXHJcbmRlZmluZShbJy4vZ2VvbWV0cnl0eXBlJ10sIGZ1bmN0aW9uIChHZW9tZXRyeVR5cGUpIHtcclxuICAgIHZhciBnZW9tZXRyeSA9IGZ1bmN0aW9uIChvcHRzKSB7XHJcbiAgICAgICAgdGhpcy4kdHlwZSA9ICdHZW9tZXRyeSxodHRwOi8vd3d3LkdzLmNvbSc7XHJcbiAgICAgICAgdmFyIG9wdHNzID0gb3B0cyB8fCB7fTtcclxuICAgICAgICAvKioq56m66Ze05pWw5o2u5Y+C6ICD77yM5aaC6KaB5p+l55yL5pu05aSa6LWE5paZ77yM6K+35Y+C6KeBZW51bVNwYXRpYWxSZWZlcmVuY2XmnprkuL7jgIIqL1xyXG4gICAgICAgIHRoaXMuc3BhdGlhbFJlZmVyZW5jZSA9IG9wdHNzLnNwYXRpYWxSZWZlcmVuY2U7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKirmta7ngrnmlbDnsbvlnovorqHnrpfnsr7luqbvvIzkv53nlZk05L2N5bCP5pWwKi9cclxuICAgIGdlb21ldHJ5LnRvbGVyYXRlID0gMC4wMDAwMDAwMDAwMDE7XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6K6+572u56m66Ze05pWw5o2u5Y+C6ICDXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNyIOaWsOeahOepuumXtOaVsOaNruWPguiAg1xyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUuc2V0U3BhdGlhbFJlZmVyZW5jZSA9IGZ1bmN0aW9uIChzcikge1xyXG4gICAgICAgIHRoaXMuc3BhdGlhbFJlZmVyZW5jZSA9IHNyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKioqXHJcbiAgICAgKiDojrflj5bnqbrpl7TmlbDmja7lj4LogINcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuaVtOaVsOW9ouW8j+ihqOekuueahOepuumXtOaVsOaNruWPguiAg1xyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUuZ2V0U3BhdGlhbFJlZmVyZW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluWHoOS9leWbvuW9ouexu+Wei++8jOWmguimgeafpeeci+abtOWkmui1hOaWme+8jOivt+WPguingUdlb21ldHJ5VHlwZeaemuS4vuOAglxyXG4gICAgICogQHJldHVybnMg6L+U5ZueR2VvbWV0cnlUeXBl5p6a5Li+XHJcbiAgICAgKi9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5nZXRHZW9tZXRyeVR5cGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIEdlb21ldHJ5VHlwZS5HZW9tZXRyeTtcclxuICAgIH1cclxuXHJcbiAgICAvKioq56m66Ze05pWw5o2u5Y+C6ICD5YC8Ki9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5zcGF0aWFsUmVmZXJlbmNlID0gMDtcclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDmr5TovoPkuKTkuKrlh6DkvZXlm77lvaLlr7nosaHmmK/lkKbnm7jlkIxcclxuICAgICAqIEBwYXJhbSBHZW9tZXRyeSBvYmog5q+U6L6D55qE5Yeg5L2V5Zu+5b2i5a+56LGhXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm550cnVl6KGo56S655u45ZCM77yM6L+U5ZueZmFsc2XooajnpLrkuI3lkIxcclxuICAgICAqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5L2/5Yeg5L2V5Zu+5b2i5q2j5bi45YyW44CB6KeE6IyD5YyW44CCXHJcbiAgICAgKi9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog56e75Yqo5Yeg5L2V5Zu+5b2i5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gUG9pbnQgcG9pbnQgR2VvbWV0cnnlr7nosaHlgY/np7vph49cclxuICAgICAqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLm9mZnNldCA9IGZ1bmN0aW9uIChwb2ludCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWFi+mahuWvueixoVxyXG4gICAgICogQHJldHVybnMg6L+U5Zue5LiA5Liq5paw55qER2VvbWV0cnnlr7nosaFcclxuICAgICAqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBnZW9tZXRyeSh0aGlzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5b2T5YmNR0lT5b2i54q255qE5aSW5o6l55+p5b2iXHJcbiAgICAgKi9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5lbnZlbG9wZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZ2VvbWV0cnk7XHJcbn0pO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dpcy9nZW9tZXRyaWVzL2dlb21ldHJ5LmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGl1ZmVuZyBvbiAyMDE3LzExLzIuXHJcbiAqL1xyXG5kZWZpbmUoW1wiLi9leHBvcnRcIixcIi4vbWFwL29sL29sbWFwXCJdLGZ1bmN0aW9uKGdpcyxPbE1hcCl7XHJcbiAgICB3aW5kb3cuZzIgPSB3aW5kb3cuZzIgfHwge307XHJcbiAgICB2YXIgZzIgPSB3aW5kb3cuZzI7XHJcbiAgICBnMi5tYXBzPWcyLm1hcHMgfHwge307XHJcbiAgICBnMi5tYXBzLk1hcCA9IE9sTWFwO1xyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9naXMvZXhwb3J0MmQuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBsaXVmZW5nIG9uIDIwMTcvMTEvMi5cclxuICovXHJcbi8qKlxyXG4gKiBAY2xhc3MgT2xNYXA6IE9wZW5MYXllcuWcsOWbvuexu+Wei1xyXG4gKiBDcmVhdGVkIGJ5IGxpZ2FuZyBvbiAyMDE0LzkvMTcuXHJcbiAqL1xyXG5cclxuZGVmaW5lKFsnLi4vLi4vLi4vZzIvbGFuZy9jbGFzc1V0aWwnLCAnLi4vbWFwJ10sIGZ1bmN0aW9uIChDbGFzc1V0aWwsIE1hcCkge1xyXG5cclxuICAgdmFyIG9sbWFwID0gZnVuY3Rpb24ob3B0cyl7XHJcbiAgICAgICB2YXIgb3B0c3MgPSBvcHRzIHx8e307XHJcbiAgICAgICBNYXAuY2FsbCh0aGlzLG9wdHNzKTtcclxuICAgfVxyXG4gICAgQ2xhc3NVdGlsLmV4dGVuZDIob2xtYXAsIE1hcCk7XHJcbiAgIHJldHVybiBvbG1hcDtcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2lzL21hcC9vbC9vbG1hcC5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuZGVmaW5lKFtcIi4vZzIvZXhwb3J0XCIsXCIuL2dpcy9leHBvcnQyZFwiXSxmdW5jdGlvbigpe1xyXG5cclxufSlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzZ2lzMmQuanMiXSwic291cmNlUm9vdCI6IiJ9