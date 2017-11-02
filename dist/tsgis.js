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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function (gis, CMGlobe) {
    window.g2 = window.g2 || {};
    var g2 = window.g2;
    g2.maps = g2.maps || {};
    g2.maps.Globe = CMGlobe;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ClassUtil, Map, Globe) {

    var globe = function globe(opts) {
        var optss = opts || {};
        Globe.call(this, optss);
        Map.call(this, optss);
    };

    ClassUtil.extend2(globe, Globe);
    ClassUtil.extend2(globe, Map);
    return globe;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(7), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function () {}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })
/******/ ])});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWE3OGRkYWJiZjE4MGMyOTA3ZGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2cyL2xhbmcvY2xhc3NVdGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9naXMvbWFwL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2lzL2dlb21ldHJpZXMvZ2VvbWV0cnl0eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9naXMvbWFwL2dsb2JlLmpzIiwid2VicGFjazovLy8uL3NyYy9naXMvZXhwb3J0LmpzIiwid2VicGFjazovLy8uL3NyYy9nMi9leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dpcy9nZW9tZXRyaWVzL2dlb21ldHJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9naXMvZXhwb3J0MmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dpcy9tYXAvb2wvb2xtYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dpcy9leHBvcnQzZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2lzL21hcC9jbS9jbWdsb2JlLmpzIiwid2VicGFjazovLy8uL3NyYy90c2dpcy5qcyJdLCJuYW1lcyI6WyJpZCIsInV0aWwiLCJleHRlbmQiLCJjaGlsZCIsInBhcmVudCIsIkYiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsInViZXIiLCJleHRlbmQyIiwicCIsImMiLCJpIiwiaXNBcnJheSIsIm9iaiIsIkFycmF5IiwibmV3SWQiLCJleHRlbmRDb3B5IiwiZGVlcENvcHkiLCJvYmplY3RQbHVzIiwibyIsInN0dWZmIiwibiIsImV4dGVuZE11bHRpIiwiaiIsImxlbiIsImFyZ3VtZW50cyIsImxlbmd0aCIsImNyZWF0ZUV2ZW50cyIsImV2ZW50cyIsImNsaWNrIiwibW91c2Vtb3ZlIiwibW91c2VvdXQiLCJtb3VzZWRvd24iLCJtb3VzZXVwIiwiZGJsY2xpY2siLCJleHRlbnRjaGFuZ2VkIiwicmVzaXplIiwibWFwIiwibGF5ZXJzIiwidG9vbCIsImN1cnNvciIsImluaXQiLCJvcHRzIiwiYWRkTGF5ZXIiLCJsYXllciIsInB1c2giLCJnZXRFeHRlbnQiLCJyZW1vdmVMYXllciIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsInNldEN1cnNvciIsImdldFZpZXdTaXplIiwiZ2V0TGF5ZXJDb3VudCIsImdldExheWVyIiwiZ2V0TGF5ZXJzIiwiZ2V0Wm9vbUxldmVsIiwiZ2V0UmVzb2x1dGlvbiIsImdldE9yaWdpbiIsImZpbmRMYXllciIsIm5hbWUiLCJvbiIsImZ1bmMiLCJ1biIsImV2ZW50IiwiZnVsbEV4dGVuZCIsInpvb21PdXQiLCJ6b29tSW4iLCJwYW4iLCJnZW9tZXRyeSIsInNldENlbnRlciIsImNlbnRlciIsImdldFBpeGVsRnJvbUNvb3JkaW5hdGUiLCJjb29yZGluYXRlIiwiZ2V0Q29vcmRpbmF0ZUZyb21QaXhlbCIsInBpeGVsIiwiZXhwb3J0Iiwic3RvcERyYWdQYW4iLCJyZXN1bWVEcmFncGFuIiwic3RvcERiQ2xpY2siLCJyZXN1bWVEYkNsaWNrIiwiYWRkQ29udHJvbCIsImN0bCIsImN1cnJlbnRUb29sIiwiZGVhY3RpdmF0ZSIsIm9uTW91c2VDbGljayIsImJ1dHRvbiIsInNoaWZ0Iiwic2NyZWVuWCIsInNjcmVlblkiLCJtYXBYIiwibWFwWSIsImhhbmRsZSIsIm9uTW91c2VPdmVyIiwiZSIsIm9uTW91c2VEb3duIiwib25Nb3VzZVVwIiwib25Nb3VzZU1vdmUiLCJvbkV4dGVudENoYW5nZWQiLCJsZWZ0IiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJvbkRibGNsaWNrIiwib25SZXNpemUiLCJ3aWR0aCIsImhlaWdodCIsIm9uRm9jdXMiLCJyZW1vdmVJbnRlcmFjdGlvbnMiLCJyZXN1bWVJbnRlcmFjdGlvbnMiLCJHZW9tZXRyeSIsIlBvaW50IiwiQ3VydmUiLCJTZWdtZW50IiwiRW52ZWxvcGUiLCJMaW5lIiwiUmVjdGFuZ2xlIiwiU3F1YXJlIiwiQ2lyY2xlIiwiRWxsaXBzZSIsIlBhdGgiLCJSaW5nIiwiUG9seUN1cnZlIiwiUG9seWxpbmUiLCJQb2x5Z29uIiwiTXVsdGlQb2ludCIsIk11bHRpUG9seWdvbiIsImdsb2JlIiwiR2VvbWV0cnlUeXBlIiwiTWFwIiwiR2xvYmUiLCJ3aW5kb3ciLCJnMiIsImdlb20iLCJtYXBzIiwiSU1hcCIsIklHbG9iZSIsIkdsb2JlZGRkNTVsaXVmZW5nIiwiQ2xhc3NVdGlsIiwibGFuZyIsImE1NTUiLCIkdHlwZSIsIm9wdHNzIiwic3BhdGlhbFJlZmVyZW5jZSIsInRvbGVyYXRlIiwic2V0U3BhdGlhbFJlZmVyZW5jZSIsInNyIiwiZ2V0U3BhdGlhbFJlZmVyZW5jZSIsImdldEdlb21ldHJ5VHlwZSIsImVxdWFscyIsIm5vcm1hbGl6ZSIsIm9mZnNldCIsInBvaW50IiwiY29weSIsImVudmVsb3BlIiwiZ2lzIiwiT2xNYXAiLCJvbG1hcCIsImNhbGwiLCJDTUdsb2JlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7O0FBTUEsa0NBQU8sWUFBWTs7QUFFZixRQUFJQSxLQUFLLEtBQVQ7O0FBRUEsUUFBSUMsT0FBTyxTQUFQQSxJQUFPLEdBQVcsQ0FBRSxDQUF4Qjs7QUFFQUEsU0FBS0MsTUFBTCxHQUFjLFVBQVNDLEtBQVQsRUFBZ0JDLE1BQWhCLEVBQXdCO0FBQ2xDLFlBQUlDLElBQUksU0FBSkEsQ0FBSSxHQUFX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IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDFhNzhkZGFiYmYxODBjMjkwN2RlIiwiLyoqXHJcbiAqIEBjbGFzcyBjbGFzc1V0aWw6IOWumuS5ieexu+Wei+W3peWFt++8jOWunueOsOexu+Wei+e7p+aJv1xyXG4gKiAgQ3JlYXRlZCBieSBsaWdhbmcgb24gMjAxNC84LzEzLlxyXG4gKiAgQG1vZGlmeSB9e3llbGxvdyBcclxuICovXHJcblxyXG5kZWZpbmUoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBpZCA9IDEwMDAwO1xyXG5cclxuICAgIHZhciB1dGlsID0gZnVuY3Rpb24oKSB7fVxyXG5cclxuICAgIHV0aWwuZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkge1xyXG4gICAgICAgIHZhciBGID0gZnVuY3Rpb24oKSB7fTtcclxuICAgICAgICBGLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XHJcbiAgICAgICAgY2hpbGQucHJvdG90eXBlID0gbmV3IEYoKTtcclxuICAgICAgICBjaGlsZC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjaGlsZDtcclxuICAgICAgICBjaGlsZC51YmVyID0gcGFyZW50LnByb3RvdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICB1dGlsLmV4dGVuZDIgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7XHJcbiAgICAgICAgdmFyIHAgPSBwYXJlbnQucHJvdG90eXBlO1xyXG4gICAgICAgIHZhciBjID0gY2hpbGQucHJvdG90eXBlO1xyXG4gICAgICAgIGZvciAoIHZhciBpIGluIHApIHtcclxuICAgICAgICAgICAgY1tpXSA9IHBbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGMudWJlciA9IHA7XHJcbiAgICB9XHJcblxyXG4gICAgdXRpbC5pc0FycmF5ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIHJldHVybiAoISFvYmogJiYgb2JqLmNvbnN0cnVjdG9yID09IEFycmF5KTtcclxuICAgIH1cclxuXHJcbiAgICB1dGlsLm5ld0lkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBpZCsrO1xyXG4gICAgfVxyXG5cclxuICAgIHV0aWwuZXh0ZW5kQ29weT0gZnVuY3Rpb24ocCkge1xyXG4gICAgICAgIHZhciBjID0ge307XHJcbiAgICAgICAgZm9yICggdmFyIGkgaW4gcCApIHtcclxuICAgICAgICAgICAgY1tpXSA9IHBbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGMudWJlciA9IHA7XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcblxyXG4gICAgdXRpbC5kZWVwQ29weSA9IGRlZXBDb3B5O1xyXG5cclxuICAgIHV0aWwub2JqZWN0UGx1cyA9IGZ1bmN0aW9uKG8sIHN0dWZmKSB7XHJcbiAgICAgICAgdmFyIG47XHJcbiAgICAgICAgZnVuY3Rpb24gRigpIHt9O1xyXG4gICAgICAgIEYucHJvdG90eXBlID0gbztcclxuICAgICAgICBuID0gbmV3IEYoKTtcclxuICAgICAgICBuLnViZXIgPSBvO1xyXG5cclxuICAgICAgICBmb3IgKCB2YXIgaSBpbiBzdHVmZikge1xyXG4gICAgICAgICAgICBuW2ldID0gc3R1ZmZbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbjtcclxuICAgIH1cclxuXHJcbiAgICB1dGlsLmV4dGVuZE11bHRpID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIG4gPSB7fSwgc3R1ZmYsIGogPSAwLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoIGogPSAwOyBqIDwgbGVuOyBqKyspIHtcclxuICAgICAgICAgICAgc3R1ZmYgPSBhcmd1bWVudHNbal07XHJcbiAgICAgICAgICAgIGZvciAoIHZhciBpIGluIHN0dWZmKSB7XHJcbiAgICAgICAgICAgICAgICBuW2ldID0gc3R1ZmZbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG47XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVlcENvcHkocCwgYykge1xyXG4gICAgICAgIHZhciBjID0gYyB8fCB7fTtcclxuICAgICAgICBmb3IgKCB2YXIgaSBpbiBwICkge1xyXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBwW2ldID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgY1tpXSA9IChwW2ldLmNvbnN0cnVjdG9yID09PSBBcnJheSkgPyBbXSA6IHt9O1xyXG4gICAgICAgICAgICAgICAgZGVlcENvcHkocFtpXSwgY1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjW2ldID0gcFtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdXRpbDtcclxuXHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZzIvbGFuZy9jbGFzc1V0aWwuanMiLCIvKipcclxuICogQGNsYXNzIE1hcDog5Zyw5Zu+57G75Z6L77yM5Z+657G7XHJcbiAqIENyZWF0ZWQgYnkgbGlnYW5nIG9uIDIwMTQvOS8xNi5cclxuICovXHJcblxyXG5kZWZpbmUoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8qKioqXHJcbiAgICAgKiDlrprkuYnlnLDlm77opoHlpITnkIbnmoTkuovku7bliJfooahcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuS6i+S7tuWIl+ihqFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFdmVudHMoKSB7XHJcbiAgICAgICAgdmFyIGV2ZW50cyA9IHt9O1xyXG4gICAgICAgIGV2ZW50cy5jbGljayA9IFtdO1xyXG4gICAgICAgIGV2ZW50cy5tb3VzZW1vdmUgPSBbXTtcclxuICAgICAgICBldmVudHMubW91c2VvdXQgPSBbXTtcclxuICAgICAgICBldmVudHMubW91c2Vkb3duID0gW107XHJcbiAgICAgICAgZXZlbnRzLm1vdXNldXAgPSBbXTtcclxuICAgICAgICBldmVudHMuZGJsY2xpY2sgPSBbXTtcclxuICAgICAgICBldmVudHMuZXh0ZW50Y2hhbmdlZCA9IFtdO1xyXG4gICAgICAgIGV2ZW50cy5yZXNpemUgPSBbXTtcclxuICAgICAgICByZXR1cm4gZXZlbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBtYXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5sYXllcnMgPSBbXTtcclxuICAgICAgICB0aGlzLnRvb2wgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yID0gbnVsbDtcclxuICAgICAgICB0aGlzLmV2ZW50cyA9IGNyZWF0ZUV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qLyEqKioq5a6a5LmJ5Zyw5Zu+5Zu+5bGC5YiX6KGoKiEvXHJcbiAgICBtYXAucHJvdG90eXBlLmxheWVycyA9IFtdO1xyXG5cclxuICAgIC8hKioqKuWumuS5ieWcsOWbvuW3peWFt+WvueixoSohL1xyXG4gICAgbWFwLnByb3RvdHlwZS50b29sID0gbnVsbDtcclxuXHJcbiAgICAvISoqKirlrprkuYnlnLDlm77pvKDmoIfnmoTlm77moIcqIS9cclxuICAgIG1hcC5wcm90b3R5cGUuY3Vyc29yID0gbnVsbDtcclxuXHJcbiAgICAvISoqKuWumuS5ieWcsOWbvuS6i+S7tuWIl+ihqCohL1xyXG4gICAgbWFwLnByb3RvdHlwZS5ldmVudHMgPSBjcmVhdGVFdmVudHMoKTsqL1xyXG4gICAgLyoqKlxyXG4gICAgICog5a6a5LmJ5bim5Y+C5pWw55qE5Zyw5Zu+5Yid5aeL5YyWXHJcbiAgICAgKiBAcGFyYW0gQW5vbnltb3VzIG9wdHMg5YyF5ZCr5Yid5aeL5YyW5Y+C5pWw55qE5aSN5p2C5a+56LGhXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRzKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5a6a5LmJ5re75Yqg5Zu+5bGC5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIg5re75Yqg55qE5Zu+5bGCXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuYWRkTGF5ZXIgPSBmdW5jdGlvbiAobGF5ZXIpIHtcclxuICAgICAgICB0aGlzLmxheWVycy5wdXNoKGxheWVyKTtcclxuICAgIH1cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluWPr+inhuiMg+i9rFxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldEV4dGVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuICAgIC8qKipcclxuICAgICAqIOWIoOmZpOWbvuWxglxyXG4gICAgICogQHBhcmFtIGxheWVyIOimgeWIoOmZpOeahOWbvuWxglxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnJlbW92ZUxheWVyID0gZnVuY3Rpb24gKGxheWVyKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5sYXllcnMuaW5kZXhPZihsYXllcik7XHJcbiAgICAgICAgaWYoaW5kZXg+MCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKipcclxuICAgICAqIOiuvue9rum8oOagh+agt+W8j1xyXG4gICAgICogQHBhcmFtIGN1cnNvciDpvKDmoIfmoLflvI9cclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5zZXRDdXJzb3IgPSBmdW5jdGlvbiAoY3Vyc29yKSB7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqKlxyXG4gICAgICog6L+U5Zue5Zyw5Zu+56qX5Y+j5bC65a+4IHB45Y2V5L2NXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0Vmlld1NpemUgPSBmdW5jdGlvbigpe1xyXG4gICAgfVxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5Zu+5bGC5pWw6YePXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57lm77lsYLmlbDph49cclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRMYXllckNvdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxheWVycy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5oyH5a6a57Si5byV5L2N572u55qE5Zu+5bGCXHJcbiAgICAgKiBAcGFyYW0gaW5kZXgg57Si5byVXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57lm77lsYJcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRMYXllciA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxheWVyc1tpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5omA5pyJ5Zu+5bGCXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57lm77lsYLmlbDnu4RcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRMYXllcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluWcsOWbvue8qeaUvue6p+WIq1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldFpvb21MZXZlbCA9IGZ1bmN0aW9uKCl7fVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluWIhui+qOeOh1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldFJlc29sdXRpb24gPSBmdW5jdGlvbigpe1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluWdkOagh+WOn+eCuVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldE9yaWdpbiA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOafpeaJvuWbvuWxglxyXG4gICAgICogQHBhcmFtIFN0cmluZyBuYW1lIOWbvuWxguWQjeensFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZmluZExheWVyID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXllciA9IHRoaXMubGF5ZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAobGF5ZXIubmFtZSA9PSBuYW1lIHx8IGxheWVyLmlkID09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsYXllcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDnm5HlkKzmjIflrprlkI3np7DnmoTpvKDmoIfkuovku7blubborr7nva7lhbPogZTnmoTkuovku7blpITnkIbmlrnms5VcclxuICAgICAqIEBwYXJhbSBTdHJpbmcgbmFtZSDkuovku7blkI3np7BcclxuICAgICAqIEBwYXJhbSBGdW5jdGlvbiBmdW5jIOWkhOeQhuaWueazleWQjeensFxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcclxuICAgICAgICBpZiAobmFtZSBpbiB0aGlzLmV2ZW50cykge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5ldmVudHNbbmFtZV07XHJcbiAgICAgICAgICAgIGV2ZW50cy5wdXNoKGZ1bmMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlj5bmtojnm5HlkKzmjIflrprlkI3np7DnmoTpvKDmoIfkuovku7blubblj5bmtojkuovku7blpITnkIbmlrnms5XnmoTlhbPogZRcclxuICAgICAqIEBwYXJhbSBTdHJpbmcgbmFtZSDkuovku7blkI3np7BcclxuICAgICAqIEBwYXJhbSBGdW5jdGlvbiBmdW5jIOWkhOeQhuaWueazleWQjeensFxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnVuID0gZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcclxuICAgICAgICBpZiAobmFtZSBpbiAgdGhpcy5ldmVudHMpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuZXZlbnRzW25hbWVdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZXZlbnRzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZihldmVudCA9PT0gZnVuYyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICBsZW4tLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlnLDlm77nvKnmlL7liLDnqbrpl7TmlbDmja7lrprkuYnnmoTlhajlm77ojIPlm7RcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5mdWxsRXh0ZW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWcsOWbvue8qeWwj1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnpvb21PdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5Zyw5Zu+5pS+5aSnXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuem9vbUluID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOW5s+enu+WHoOS9leWbvuW9ouWvueixoVxyXG4gICAgICogQHBhcmFtIGdlb21ldHJ5XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUucGFuID0gZnVuY3Rpb24gKGdlb21ldHJ5KSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6K6+5a6a5oyH5a6a55qE5Z2Q5qCH54K55Li65Zyw5Zu+5Lit5b+D54K5XHJcbiAgICAgKiBAcGFyYW0gUG9pbnQgY2VudGVyIOWcsOeQhuWdkOagh+eCuVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnNldENlbnRlciA9IGZ1bmN0aW9uIChjZW50ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5bmjIflrprnmoTlnLDnkIblnZDmoIfngrnmmL7npLrlnKjlsY/luZXkuIrnmoTkvY3nva5cclxuICAgICAqIEBwYXJhbSBQb2ludCBjb29yZGluYXRlIOWcsOeQhuWdkOagh+eCuVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldFBpeGVsRnJvbUNvb3JkaW5hdGUgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluWxj+W5leS4iuaMh+WumuWDj+e0oOeCueWvueW6lOeahOWcsOeQhuWdkOagh+eCuVxyXG4gICAgICogQHBhcmFtIFBvaW50IHBpeGVsIOWxj+W5leWDj+e0oOeCueWdkOagh1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldENvb3JkaW5hdGVGcm9tUGl4ZWwgPSBmdW5jdGlvbiAocGl4ZWwpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlr7zlh7pcclxuICAgICAqIEBwYXJhbSBuYW1lIOWvvOWHuuWQjeensFxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmV4cG9ydCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5YGc55uu5ouW5ou9XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuc3RvcERyYWdQYW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu6fnu63mi5bmi71cclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5yZXN1bWVEcmFncGFuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWBnOatouWPjOWHu1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnN0b3BEYkNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOe7p+e7reWPjOWHu1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnJlc3VtZURiQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAqIOa3u+WKoOWcsOWbvuebuOWFs+aOp+S7tlxyXG4gICAgKiBAcGFyYW0gb2wuY29udHJvbC5Db250cm9sXHJcbiAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmFkZENvbnRyb2wgPSBmdW5jdGlvbiAoY3RsKSB7XHJcbiAgICB9XHJcbiAgICAvKioqXHJcbiAgICAgKiDlvZPliY3mraPlnKjkvb/nlKjnmoTlnLDlm77lt6XlhbdcclxuICAgICAqIEBwYXJhbSBUb29sQmFzZSB0b29sXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuY3VycmVudFRvb2wgPSBmdW5jdGlvbiAodG9vbCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvb2wgIT0gdG9vbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50b29sICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9vbC5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50b29sID0gdG9vbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMudG9vbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnNvciA9IHRoaXMudG9vbC5jdXJzb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6byg5qCH5Y2V5Ye75LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGJ1dHRvbiDmjInkuIvnmoTpvKDmoIfmjInplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2hpZnQg5piv5ZCm5ZCM5pe25oyJ5LiL55qE6ZSu55uY5LiK55qEc2hpZnTplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2NyZWVuWCDkuovku7blj5HnlJ/ml7bpvKDmoIflnKjlsY/luZXkuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblkg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBtYXBYIOm8oOagh+WcqOWcsOWbvuS4iueahFjlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWSDpvKDmoIflnKjlnLDlm77kuIrnmoRZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGhhbmRsZSDor6Xkuovku7bmmK/lkKblt7Lnu4/kuI3pnIDopoHlho3lpITnkIZcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbk1vdXNlQ2xpY2sgPSBmdW5jdGlvbiAoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKSB7XHJcbiAgICAgICAgaWYgKCEhdGhpcy50b29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbC5vbk1vdXNlQ2xpY2soYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKipcclxuICAgICAqIOm8oOagh+aCrOWBnOS6i+S7tlxyXG4gICAgICogQHBhcmFtIEV2ZW50IGUg5LqL5Lu25a+56LGhXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25Nb3VzZU92ZXIgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvb2wgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2wub25Nb3VzZU92ZXIoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOm8oOagh+aMiemUruaMieS4i+aXtueahOS6i+S7tuWkhOeQhuaWueazlVxyXG4gICAgICogQHBhcmFtIE51bWJlciBidXR0b24g5oyJ5LiL55qE6byg5qCH5oyJ6ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNoaWZ0IOaYr+WQpuWQjOaXtuaMieS4i+eahOmUruebmOS4iueahHNoaWZ06ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblgg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBzY3JlZW5ZIOS6i+S7tuWPkeeUn+aXtum8oOagh+WcqOWxj+W5leS4iueahFnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWCDpvKDmoIflnKjlnLDlm77kuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIG1hcFkg6byg5qCH5Zyo5Zyw5Zu+5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBoYW5kbGUg6K+l5LqL5Lu25piv5ZCm5bey57uP5LiN6ZyA6KaB5YaN5aSE55CGXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25Nb3VzZURvd24gPSBmdW5jdGlvbiAoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKSB7XHJcbiAgICAgICAgaWYgKCEhdGhpcy50b29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbC5vbk1vdXNlRG93bihidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV2ZW50cy5tb3VzZWRvd24ubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudHMubW91c2Vkb3duW2ldO1xyXG4gICAgICAgICAgICBldmVudChidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqKlxyXG4gICAgICog6byg5qCH5oyJ6ZSu5oyJ5LiL5ZCO5oqs6LW355qE5LqL5Lu255qE5aSE55CG5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGJ1dHRvbiDmjInkuIvnmoTpvKDmoIfmjInplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2hpZnQg5piv5ZCm5ZCM5pe25oyJ5LiL55qE6ZSu55uY5LiK55qEc2hpZnTplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2NyZWVuWCDkuovku7blj5HnlJ/ml7bpvKDmoIflnKjlsY/luZXkuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblkg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBtYXBYIOm8oOagh+WcqOWcsOWbvuS4iueahFjlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWSDpvKDmoIflnKjlnLDlm77kuIrnmoRZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGhhbmRsZSDor6Xkuovku7bmmK/lkKblt7Lnu4/kuI3pnIDopoHlho3lpITnkIZcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbk1vdXNlVXAgPSBmdW5jdGlvbiAoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKSB7XHJcbiAgICAgICAgaWYgKCEhdGhpcy50b29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbC5vbk1vdXNlVXAoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ldmVudHMubW91c2V1cC5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSB0aGlzLmV2ZW50cy5tb3VzZXVwW2ldO1xyXG4gICAgICAgICAgICBldmVudChidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDpvKDmoIfnp7vliqjkuovku7blpITnkIbmlrnms5VcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgYnV0dG9uIOaMieS4i+eahOm8oOagh+aMiemUrlxyXG4gICAgICogQHBhcmFtIE51bWJlciBzaGlmdCDmmK/lkKblkIzml7bmjInkuIvnmoTplK7nm5jkuIrnmoRzaGlmdOmUrlxyXG4gICAgICogQHBhcmFtIE51bWJlciBzY3JlZW5YIOS6i+S7tuWPkeeUn+aXtum8oOagh+WcqOWxj+W5leS4iueahFjlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2NyZWVuWSDkuovku7blj5HnlJ/ml7bpvKDmoIflnKjlsY/luZXkuIrnmoRZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIG1hcFgg6byg5qCH5Zyo5Zyw5Zu+5LiK55qEWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBtYXBZIOm8oOagh+WcqOWcsOWbvuS4iueahFnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgaGFuZGxlIOivpeS6i+S7tuaYr+WQpuW3sue7j+S4jemcgOimgeWGjeWkhOeQhlxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uTW91c2VNb3ZlID0gZnVuY3Rpb24gKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSkge1xyXG4gICAgICAgIGlmICghIXRoaXMudG9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2wub25Nb3VzZU1vdmUgPyB0aGlzLnRvb2wub25Nb3VzZU1vdmUoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKSA6IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZXZlbnRzLm1vdXNlbW92ZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSB0aGlzLmV2ZW50cy5tb3VzZW1vdmVbaV07XHJcbiAgICAgICAgICAgIGV2ZW50KGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWcsOWbvuWPr+inhuiMg+WbtOaUueWPmOS6i+S7tlxyXG4gICAgICogQHBhcmFtIE51bWJlciBsZWZ0IOW3puS4iuinkljlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgdG9wIOW3puS4iuinklnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgcmlnaHQg5Y+z5LiL6KeSWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBib3R0b20g5Y+z5LiL6KeSWeWdkOagh1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uRXh0ZW50Q2hhbmdlZCA9IGZ1bmN0aW9uIChsZWZ0LCB0b3AsIHJpZ2h0LCBib3R0b20pIHtcclxuICAgICAgICBpZiAoISF0aGlzLnRvb2wpIHtcclxuICAgICAgICAgICAgdGhpcy50b29sLm9uRXh0ZW50Q2hhbmdlZCA/IHRoaXMudG9vbC5vbkV4dGVudENoYW5nZWQobGVmdCwgdG9wLCByaWdodCwgYm90dG9tKSA6IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZXZlbnRzLmV4dGVudGNoYW5nZWQubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudHMuZXh0ZW50Y2hhbmdlZFtpXTtcclxuICAgICAgICAgICAgZXZlbnQobGVmdCwgdG9wLCByaWdodCwgYm90dG9tKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6byg5qCH5Y+M5Ye75LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gRXZlbnQgZSDkuovku7blr7nosaFcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbkRibGNsaWNrID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAodGhpcy50b29sICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50b29sLm9uRGJsY2xpY2soZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOa1j+iniOWZqOeql+WPo+Wkp+Wwj+aUueWPmOS6i+S7tlxyXG4gICAgICogQHBhcmFtIE51bWJlciB3aWR0aCDmlrDnmoTnqpflj6Plrr3luqZcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgaGVpZ2h0IOaWsOeahOeql+WPo+mrmOW6plxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uUmVzaXplID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlnLDlm77ojrflvpfnhKbngrnnmoTkuovku7ZcclxuICAgICAqIEBwYXJhbSBFdmVudCBlIOS6i+S7tuWvueixoVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uRm9jdXMgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgfVxyXG4gICAgLyoqKlxyXG4gICAgICog56e76Zmk5Zyw5Zu+55u45YWz55qE5Lqk5LqSXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUucmVtb3ZlSW50ZXJhY3Rpb25zID0gZnVuY3Rpb24oKXt9XHJcbiAgICAvKioqXHJcbiAgICAgKiDph43nva7lnLDlm77nm7jlhbPnmoTkuqTkupJcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5yZXN1bWVJbnRlcmFjdGlvbnMgPSBmdW5jdGlvbigpe31cclxuICAgIFxyXG4gICAgcmV0dXJuIG1hcDtcclxuXHJcbn0pXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9naXMvbWFwL21hcC5qcyIsIi8qKlxyXG4gKiBAY2xhc3MgR2VvbWV0cnlUeXBlOiDlh6DkvZXlm77lvaLnsbvlnovmnprkuL5cclxuICogQ3JlYXRlZCBieSBsaWdhbmcgb24gMjAxNC85LzE1LlxyXG4gKi9cclxuXHJcbmRlZmluZShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAvKioq5LiN5oyH5a6a5YW35L2T5b2i54q257G75Yir55qE5Zu+5b2iKi9cclxuICAgICAgICBHZW9tZXRyeTogMCxcclxuICAgICAgICAvKioq54K554q25Zu+5b2iKi9cclxuICAgICAgICBQb2ludDogMSxcclxuICAgICAgICAvKioq5ZyG5byn54q25Zu+5b2iKi9cclxuICAgICAgICBDdXJ2ZTogMixcclxuICAgICAgICAvKioq5q6154q25Zu+5b2iKi9cclxuICAgICAgICBTZWdtZW50OiAzLFxyXG4gICAgICAgIC8qKirnn6nlvaIqL1xyXG4gICAgICAgIEVudmVsb3BlOiA0LFxyXG4gICAgICAgIC8qKirnur/lvaIqL1xyXG4gICAgICAgIExpbmU6IDUsXHJcbiAgICAgICAgLyoqKuaWueW9oiovXHJcbiAgICAgICAgUmVjdGFuZ2xlOiA2LFxyXG4gICAgICAgIC8qKirmraPmlrnlvaIqL1xyXG4gICAgICAgIFNxdWFyZTogNyxcclxuICAgICAgICAvKioq5ZyG5b2iKi9cclxuICAgICAgICBDaXJjbGU6IDgsXHJcbiAgICAgICAgLyoqKuakreWchuW9oiovXHJcbiAgICAgICAgRWxsaXBzZTogOSxcclxuICAgICAgICAvKioq5aSa5Liq54K56KGo56S655qE6Lev5b6EKi9cclxuICAgICAgICBQYXRoOiAxMCxcclxuICAgICAgICAvKioq55Sx5LiA57O75YiX55qE54K55p6E5oiQ55qE546v54q26Zet5ZCI5Zu+5b2iKi9cclxuICAgICAgICBSaW5nOiAxMSxcclxuICAgICAgICAvKioq5aSa5ZyG5byn5Zu+5b2iKi9cclxuICAgICAgICBQb2x5Q3VydmU6IDEyLFxyXG4gICAgICAgIC8qKirkuIDkuKrmiJblpJrkuKrot6/lvoTnirblm77lvaLooajnpLrnmoTnqbrpl7Tlh6DkvZXlm77lvaIqL1xyXG4gICAgICAgIFBvbHlsaW5lOiAxMyxcclxuICAgICAgICAvKioq5LiA5Liq5oiW6ICF5aSa5Liq546v54q25Zu+5b2i6KGo56S655qE56m66Ze05Yeg5L2V5Zu+5b2iKi9cclxuICAgICAgICBQb2x5Z29uOiAxNCxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlpJrngrlcclxuICAgICAgICAgKi9cclxuICAgICAgICBNdWx0aVBvaW50OiAxNSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlpJrpnaJcclxuICAgICAgICAgKi9cclxuICAgICAgICBNdWx0aVBvbHlnb246IDE2XHJcbiAgICB9XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2lzL2dlb21ldHJpZXMvZ2VvbWV0cnl0eXBlLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGl1ZmVuZyBvbiAyMDE3LzExLzIuXHJcbiAqL1xyXG5kZWZpbmUoW10sZnVuY3Rpb24oKXtcclxuICAgIHZhciBnbG9iZSA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdsb2JlO1xyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9naXMvbWFwL2dsb2JlLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGl1ZmVuZyBvbiAyMDE3LzExLzIuXHJcbiAqL1xyXG5cclxuZGVmaW5lKFsnLi9nZW9tZXRyaWVzL2dlb21ldHJ5dHlwZScsJy4vZ2VvbWV0cmllcy9nZW9tZXRyeScsXCIuL21hcC9tYXBcIixcIi4vbWFwL2dsb2JlXCJdLCBmdW5jdGlvbiAoR2VvbWV0cnlUeXBlLEdlb21ldHJ5LE1hcCxHbG9iZSkge1xyXG4gICAgd2luZG93LmcyID0gd2luZG93LmcyIHx8IHt9O1xyXG4gICAgdmFyIGcyID0gd2luZG93LmcyO1xyXG4gICAgZzIuZ2VvbSA9IGcyLmdlb20gfHx7fTtcclxuICAgIGcyLm1hcHMgPWcyLm1hcHMgfHwge307XHJcbiAgICBnMi5nZW9tLkdlb21ldHJ5VHlwZT1HZW9tZXRyeVR5cGU7XHJcbiAgICBnMi5nZW9tLkdlb21ldHJ5ID1HZW9tZXRyeTtcclxuICAgIGcyLm1hcHMuSU1hcD1NYXA7XHJcbiAgICBnMi5tYXBzLklHbG9iZSA9IEdsb2JlO1xyXG4gICAgZzIubWFwcy5HbG9iZWRkZDU1bGl1ZmVuZyA9IEdsb2JlO1xyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9naXMvZXhwb3J0LmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGl1ZmVuZyBvbiAyMDE3LzExLzIuXHJcbiAqL1xyXG5kZWZpbmUoWycuL2xhbmcvY2xhc3NVdGlsJ10sIGZ1bmN0aW9uIChDbGFzc1V0aWwpIHtcclxuICAgIHdpbmRvdy5nMiA9IHdpbmRvdy5nMiB8fCB7fTtcclxuICAgIHZhciBnMiA9IHdpbmRvdy5nMjtcclxuICAgIGcyLmxhbmc9ZzIubGFuZyB8fCB7fTtcclxuICAgIGcyLmxhbmcuQ2xhc3NVdGlsID0gQ2xhc3NVdGlsO1xyXG4gICAgZzIubGFuZy5hNTU1PSBDbGFzc1V0aWw7XHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2cyL2V4cG9ydC5qcyIsIi8qKlxyXG4gKiBAY2xhc3MgR2VvbWV0cnk6IOaJgOacieepuumXtOWHoOS9leWbvuW9oueahOWfuuexu+Wei1xyXG4gKiBDcmVhdGVkIGJ5IGxpZ2FuZyBvbiAyMDE0LzgvMjEuXHJcbiAqL1xyXG5cclxuZGVmaW5lKFsnLi9nZW9tZXRyeXR5cGUnXSwgZnVuY3Rpb24gKEdlb21ldHJ5VHlwZSkge1xyXG4gICAgdmFyIGdlb21ldHJ5ID0gZnVuY3Rpb24gKG9wdHMpIHtcclxuICAgICAgICB0aGlzLiR0eXBlID0gJ0dlb21ldHJ5LGh0dHA6Ly93d3cuR3MuY29tJztcclxuICAgICAgICB2YXIgb3B0c3MgPSBvcHRzIHx8IHt9O1xyXG4gICAgICAgIC8qKirnqbrpl7TmlbDmja7lj4LogIPvvIzlpoLopoHmn6XnnIvmm7TlpJrotYTmlpnvvIzor7flj4Lop4FlbnVtU3BhdGlhbFJlZmVyZW5jZeaemuS4vuOAgiovXHJcbiAgICAgICAgdGhpcy5zcGF0aWFsUmVmZXJlbmNlID0gb3B0c3Muc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqKua1rueCueaVsOexu+Wei+iuoeeul+eyvuW6pu+8jOS/neeVmTTkvY3lsI/mlbAqL1xyXG4gICAgZ2VvbWV0cnkudG9sZXJhdGUgPSAwLjAwMDAwMDAwMDAwMTtcclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDorr7nva7nqbrpl7TmlbDmja7lj4LogINcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc3Ig5paw55qE56m66Ze05pWw5o2u5Y+C6ICDXHJcbiAgICAgKi9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5zZXRTcGF0aWFsUmVmZXJlbmNlID0gZnVuY3Rpb24gKHNyKSB7XHJcbiAgICAgICAgdGhpcy5zcGF0aWFsUmVmZXJlbmNlID0gc3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKipcclxuICAgICAqIOiOt+WPluepuumXtOaVsOaNruWPguiAg1xyXG4gICAgICogQHJldHVybnMg6L+U5Zue5pW05pWw5b2i5byP6KGo56S655qE56m66Ze05pWw5o2u5Y+C6ICDXHJcbiAgICAgKi9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5nZXRTcGF0aWFsUmVmZXJlbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwYXRpYWxSZWZlcmVuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5Yeg5L2V5Zu+5b2i57G75Z6L77yM5aaC6KaB5p+l55yL5pu05aSa6LWE5paZ77yM6K+35Y+C6KeBR2VvbWV0cnlUeXBl5p6a5Li+44CCXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm55HZW9tZXRyeVR5cGXmnprkuL5cclxuICAgICAqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLmdldEdlb21ldHJ5VHlwZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gR2VvbWV0cnlUeXBlLkdlb21ldHJ5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKirnqbrpl7TmlbDmja7lj4LogIPlgLwqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLnNwYXRpYWxSZWZlcmVuY2UgPSAwO1xyXG5cclxuICAgIC8qKipcclxuICAgICAqIOavlOi+g+S4pOS4quWHoOS9leWbvuW9ouWvueixoeaYr+WQpuebuOWQjFxyXG4gICAgICogQHBhcmFtIEdlb21ldHJ5IG9iaiDmr5TovoPnmoTlh6DkvZXlm77lvaLlr7nosaFcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnnRydWXooajnpLrnm7jlkIzvvIzov5Tlm55mYWxzZeihqOekuuS4jeWQjFxyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDkvb/lh6DkvZXlm77lvaLmraPluLjljJbjgIHop4TojIPljJbjgIJcclxuICAgICAqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDnp7vliqjlh6DkvZXlm77lvaLlr7nosaFcclxuICAgICAqIEBwYXJhbSBQb2ludCBwb2ludCBHZW9tZXRyeeWvueixoeWBj+enu+mHj1xyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUub2Zmc2V0ID0gZnVuY3Rpb24gKHBvaW50KSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5YWL6ZqG5a+56LGhXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57kuIDkuKrmlrDnmoRHZW9tZXRyeeWvueixoVxyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IGdlb21ldHJ5KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5blvZPliY1HSVPlvaLnirbnmoTlpJbmjqXnn6nlvaJcclxuICAgICAqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLmVudmVsb3BlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBnZW9tZXRyeTtcclxufSk7XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2lzL2dlb21ldHJpZXMvZ2VvbWV0cnkuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBsaXVmZW5nIG9uIDIwMTcvMTEvMi5cclxuICovXHJcbmRlZmluZShbXCIuL2V4cG9ydFwiLFwiLi9tYXAvb2wvb2xtYXBcIl0sZnVuY3Rpb24oZ2lzLE9sTWFwKXtcclxuICAgIHdpbmRvdy5nMiA9IHdpbmRvdy5nMiB8fCB7fTtcclxuICAgIHZhciBnMiA9IHdpbmRvdy5nMjtcclxuICAgIGcyLm1hcHM9ZzIubWFwcyB8fCB7fTtcclxuICAgIGcyLm1hcHMuTWFwID0gT2xNYXA7XHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dpcy9leHBvcnQyZC5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuLyoqXHJcbiAqIEBjbGFzcyBPbE1hcDogT3BlbkxheWVy5Zyw5Zu+57G75Z6LXHJcbiAqIENyZWF0ZWQgYnkgbGlnYW5nIG9uIDIwMTQvOS8xNy5cclxuICovXHJcblxyXG5kZWZpbmUoWycuLi8uLi8uLi9nMi9sYW5nL2NsYXNzVXRpbCcsICcuLi9tYXAnXSwgZnVuY3Rpb24gKENsYXNzVXRpbCwgTWFwKSB7XHJcblxyXG4gICB2YXIgb2xtYXAgPSBmdW5jdGlvbihvcHRzKXtcclxuICAgICAgIHZhciBvcHRzcyA9IG9wdHMgfHx7fTtcclxuICAgICAgIE1hcC5jYWxsKHRoaXMsb3B0c3MpO1xyXG4gICB9XHJcbiAgICBDbGFzc1V0aWwuZXh0ZW5kMihvbG1hcCwgTWFwKTtcclxuICAgcmV0dXJuIG9sbWFwO1xyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9naXMvbWFwL29sL29sbWFwLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGl1ZmVuZyBvbiAyMDE3LzExLzIuXHJcbiAqL1xyXG5kZWZpbmUoW1wiLi9leHBvcnRcIixcIi4vbWFwL2NtL2NtZ2xvYmVcIl0sZnVuY3Rpb24oZ2lzLENNR2xvYmUpe1xyXG4gICAgd2luZG93LmcyID0gd2luZG93LmcyIHx8IHt9O1xyXG4gICAgdmFyIGcyID0gd2luZG93LmcyO1xyXG4gICAgZzIubWFwcz1nMi5tYXBzIHx8IHt9XHJcbiAgICBnMi5tYXBzLkdsb2JlPUNNR2xvYmU7XHJcblxyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9naXMvZXhwb3J0M2QuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBsaXVmZW5nIG9uIDIwMTcvMTEvMi5cclxuICovXHJcbmRlZmluZShbJy4uLy4uLy4uL2cyL2xhbmcvY2xhc3NVdGlsJywgJy4uL21hcCcsICcuLi9nbG9iZSddLCBmdW5jdGlvbiAoQ2xhc3NVdGlsLCBNYXAsR2xvYmUpIHtcclxuXHJcbiAgICB2YXIgZ2xvYmUgPSBmdW5jdGlvbihvcHRzKXtcclxuICAgICAgICB2YXIgb3B0c3MgPSBvcHRzIHx8IHt9O1xyXG4gICAgICAgIEdsb2JlLmNhbGwodGhpcyxvcHRzcyk7XHJcbiAgICAgICAgTWFwLmNhbGwodGhpcyxvcHRzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xhc3NVdGlsLmV4dGVuZDIoZ2xvYmUsR2xvYmUpO1xyXG4gICAgQ2xhc3NVdGlsLmV4dGVuZDIoZ2xvYmUsTWFwKTtcclxuICAgIHJldHVybiBnbG9iZTtcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2lzL21hcC9jbS9jbWdsb2JlLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGl1ZmVuZyBvbiAyMDE3LzExLzIuXHJcbiAqL1xyXG5kZWZpbmUoW1wiLi9nMi9leHBvcnRcIixcIi4vZ2lzL2V4cG9ydDJkXCIsXCIuL2dpcy9leHBvcnQzZFwiXSxmdW5jdGlvbigpe1xyXG5cclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHNnaXMuanMiXSwic291cmNlUm9vdCI6IiJ9