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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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
/* 7 */,
/* 8 */,
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function () {}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })
/******/ ])});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWE3OGRkYWJiZjE4MGMyOTA3ZGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2cyL2xhbmcvY2xhc3NVdGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9naXMvbWFwL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2lzL2dlb21ldHJpZXMvZ2VvbWV0cnl0eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9naXMvbWFwL2dsb2JlLmpzIiwid2VicGFjazovLy8uL3NyYy9naXMvZXhwb3J0LmpzIiwid2VicGFjazovLy8uL3NyYy9nMi9leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dpcy9nZW9tZXRyaWVzL2dlb21ldHJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9naXMvZXhwb3J0M2QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dpcy9tYXAvY20vY21nbG9iZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHNnaXMzZC5qcyJdLCJuYW1lcyI6WyJpZCIsInV0aWwiLCJleHRlbmQiLCJjaGlsZCIsInBhcmVudCIsIkYiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsInViZXIiLCJleHRlbmQyIiwicCIsImMiLCJpIiwiaXNBcnJheSIsIm9iaiIsIkFycmF5IiwibmV3SWQiLCJleHRlbmRDb3B5IiwiZGVlcENvcHkiLCJvYmplY3RQbHVzIiwibyIsInN0dWZmIiwibiIsImV4dGVuZE11bHRpIiwiaiIsImxlbiIsImFyZ3VtZW50cyIsImxlbmd0aCIsImNyZWF0ZUV2ZW50cyIsImV2ZW50cyIsImNsaWNrIiwibW91c2Vtb3ZlIiwibW91c2VvdXQiLCJtb3VzZWRvd24iLCJtb3VzZXVwIiwiZGJsY2xpY2siLCJleHRlbnRjaGFuZ2VkIiwicmVzaXplIiwibWFwIiwibGF5ZXJzIiwidG9vbCIsImN1cnNvciIsImluaXQiLCJvcHRzIiwiYWRkTGF5ZXIiLCJsYXllciIsInB1c2giLCJnZXRFeHRlbnQiLCJyZW1vdmVMYXllciIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsInNldEN1cnNvciIsImdldFZpZXdTaXplIiwiZ2V0TGF5ZXJDb3VudCIsImdldExheWVyIiwiZ2V0TGF5ZXJzIiwiZ2V0Wm9vbUxldmVsIiwiZ2V0UmVzb2x1dGlvbiIsImdldE9yaWdpbiIsImZpbmRMYXllciIsIm5hbWUiLCJvbiIsImZ1bmMiLCJ1biIsImV2ZW50IiwiZnVsbEV4dGVuZCIsInpvb21PdXQiLCJ6b29tSW4iLCJwYW4iLCJnZW9tZXRyeSIsInNldENlbnRlciIsImNlbnRlciIsImdldFBpeGVsRnJvbUNvb3JkaW5hdGUiLCJjb29yZGluYXRlIiwiZ2V0Q29vcmRpbmF0ZUZyb21QaXhlbCIsInBpeGVsIiwiZXhwb3J0Iiwic3RvcERyYWdQYW4iLCJyZXN1bWVEcmFncGFuIiwic3RvcERiQ2xpY2siLCJyZXN1bWVEYkNsaWNrIiwiYWRkQ29udHJvbCIsImN0bCIsImN1cnJlbnRUb29sIiwiZGVhY3RpdmF0ZSIsIm9uTW91c2VDbGljayIsImJ1dHRvbiIsInNoaWZ0Iiwic2NyZWVuWCIsInNjcmVlblkiLCJtYXBYIiwibWFwWSIsImhhbmRsZSIsIm9uTW91c2VPdmVyIiwiZSIsIm9uTW91c2VEb3duIiwib25Nb3VzZVVwIiwib25Nb3VzZU1vdmUiLCJvbkV4dGVudENoYW5nZWQiLCJsZWZ0IiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJvbkRibGNsaWNrIiwib25SZXNpemUiLCJ3aWR0aCIsImhlaWdodCIsIm9uRm9jdXMiLCJyZW1vdmVJbnRlcmFjdGlvbnMiLCJyZXN1bWVJbnRlcmFjdGlvbnMiLCJHZW9tZXRyeSIsIlBvaW50IiwiQ3VydmUiLCJTZWdtZW50IiwiRW52ZWxvcGUiLCJMaW5lIiwiUmVjdGFuZ2xlIiwiU3F1YXJlIiwiQ2lyY2xlIiwiRWxsaXBzZSIsIlBhdGgiLCJSaW5nIiwiUG9seUN1cnZlIiwiUG9seWxpbmUiLCJQb2x5Z29uIiwiTXVsdGlQb2ludCIsIk11bHRpUG9seWdvbiIsImdsb2JlIiwiR2VvbWV0cnlUeXBlIiwiTWFwIiwiR2xvYmUiLCJ3aW5kb3ciLCJnMiIsImdlb20iLCJtYXBzIiwiSU1hcCIsIklHbG9iZSIsIkdsb2JlZGRkNTVsaXVmZW5nIiwiQ2xhc3NVdGlsIiwibGFuZyIsImE1NTUiLCIkdHlwZSIsIm9wdHNzIiwic3BhdGlhbFJlZmVyZW5jZSIsInRvbGVyYXRlIiwic2V0U3BhdGlhbFJlZmVyZW5jZSIsInNyIiwiZ2V0U3BhdGlhbFJlZmVyZW5jZSIsImdldEdlb21ldHJ5VHlwZSIsImVxdWFscyIsIm5vcm1hbGl6ZSIsIm9mZnNldCIsInBvaW50IiwiY29weSIsImVudmVsb3BlIiwiZ2lzIiwiQ01HbG9iZSIsImNhbGwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFNQSxrQ0FBTyxZQUFZOztBQUVmLFFBQUlBLEtBQUssS0FBVDs7QUFFQSxRQUFJQyxPQUFPLFNBQVBBLElBQU8sR0FBVyxDQUFFLENBQXhCOztBQUVBQSxTQUFLQyxNQUFMLEdBQWMsVUFBU0MsS0FBVCxFQUFnQkMsTUFBaEIsRUFBd0I7QUFDbEMsWUFBSUMsSUFBSSxTQUFKQSxDQUFJLEdBQVcsQ0FBRSxDQUFyQjtBQUNBQSxVQUFFQyxTQUFGLEdBQWNGLE9BQU9FLFNBQXJCO0FBQ0FILGNBQU1HLFNBQU4sR0FBa0IsSUFBSUQsQ0FBSixFQUFsQjtB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SCxLQUFsQixFQUF3QkcsS0FBeEI7QUFDQVEsY0FBVWxJLE9BQVYsQ0FBa0J1SCxLQUFsQixFQUF3QkUsR0FBeEI7QUFDQSxXQUFPRixLQUFQO0FBQ0gsQ0FYRDtBQUFBLHFHOzs7Ozs7Ozs7O0FDSEE7OztBQUdBLGlDQUFPLENBQUMsc0JBQUQsRUFBZSxzQkFBZixDQUFQLGtDQUF3QyxZQUFVLENBRWpELENBRkQ7QUFBQSxxRyIsImZpbGUiOiJ0c2dpczNkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWE3OGRkYWJiZjE4MGMyOTA3ZGUiLCIvKipcclxuICogQGNsYXNzIGNsYXNzVXRpbDog5a6a5LmJ57G75Z6L5bel5YW377yM5a6e546w57G75Z6L57un5om/XHJcbiAqICBDcmVhdGVkIGJ5IGxpZ2FuZyBvbiAyMDE0LzgvMTMuXHJcbiAqICBAbW9kaWZ5IH17eWVsbG93IFxyXG4gKi9cclxuXHJcbmRlZmluZShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGlkID0gMTAwMDA7XHJcblxyXG4gICAgdmFyIHV0aWwgPSBmdW5jdGlvbigpIHt9XHJcblxyXG4gICAgdXRpbC5leHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7XHJcbiAgICAgICAgdmFyIEYgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgICAgIEYucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcclxuICAgICAgICBjaGlsZC5wcm90b3R5cGUgPSBuZXcgRigpO1xyXG4gICAgICAgIGNoaWxkLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNoaWxkO1xyXG4gICAgICAgIGNoaWxkLnViZXIgPSBwYXJlbnQucHJvdG90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHV0aWwuZXh0ZW5kMiA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHtcclxuICAgICAgICB2YXIgcCA9IHBhcmVudC5wcm90b3R5cGU7XHJcbiAgICAgICAgdmFyIGMgPSBjaGlsZC5wcm90b3R5cGU7XHJcbiAgICAgICAgZm9yICggdmFyIGkgaW4gcCkge1xyXG4gICAgICAgICAgICBjW2ldID0gcFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYy51YmVyID0gcDtcclxuICAgIH1cclxuXHJcbiAgICB1dGlsLmlzQXJyYXkgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuICghIW9iaiAmJiBvYmouY29uc3RydWN0b3IgPT0gQXJyYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHV0aWwubmV3SWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGlkKys7XHJcbiAgICB9XHJcblxyXG4gICAgdXRpbC5leHRlbmRDb3B5PSBmdW5jdGlvbihwKSB7XHJcbiAgICAgICAgdmFyIGMgPSB7fTtcclxuICAgICAgICBmb3IgKCB2YXIgaSBpbiBwICkge1xyXG4gICAgICAgICAgICBjW2ldID0gcFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYy51YmVyID0gcDtcclxuICAgICAgICByZXR1cm4gYztcclxuICAgIH1cclxuXHJcbiAgICB1dGlsLmRlZXBDb3B5ID0gZGVlcENvcHk7XHJcblxyXG4gICAgdXRpbC5vYmplY3RQbHVzID0gZnVuY3Rpb24obywgc3R1ZmYpIHtcclxuICAgICAgICB2YXIgbjtcclxuICAgICAgICBmdW5jdGlvbiBGKCkge307XHJcbiAgICAgICAgRi5wcm90b3R5cGUgPSBvO1xyXG4gICAgICAgIG4gPSBuZXcgRigpO1xyXG4gICAgICAgIG4udWJlciA9IG87XHJcblxyXG4gICAgICAgIGZvciAoIHZhciBpIGluIHN0dWZmKSB7XHJcbiAgICAgICAgICAgIG5baV0gPSBzdHVmZltpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuO1xyXG4gICAgfVxyXG5cclxuICAgIHV0aWwuZXh0ZW5kTXVsdGkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgbiA9IHt9LCBzdHVmZiwgaiA9IDAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCBsZW47IGorKykge1xyXG4gICAgICAgICAgICBzdHVmZiA9IGFyZ3VtZW50c1tqXTtcclxuICAgICAgICAgICAgZm9yICggdmFyIGkgaW4gc3R1ZmYpIHtcclxuICAgICAgICAgICAgICAgIG5baV0gPSBzdHVmZltpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWVwQ29weShwLCBjKSB7XHJcbiAgICAgICAgdmFyIGMgPSBjIHx8IHt9O1xyXG4gICAgICAgIGZvciAoIHZhciBpIGluIHAgKSB7XHJcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHBbaV0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBjW2ldID0gKHBbaV0uY29uc3RydWN0b3IgPT09IEFycmF5KSA/IFtdIDoge307XHJcbiAgICAgICAgICAgICAgICBkZWVwQ29weShwW2ldLCBjW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNbaV0gPSBwW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1dGlsO1xyXG5cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nMi9sYW5nL2NsYXNzVXRpbC5qcyIsIi8qKlxyXG4gKiBAY2xhc3MgTWFwOiDlnLDlm77nsbvlnovvvIzln7rnsbtcclxuICogQ3JlYXRlZCBieSBsaWdhbmcgb24gMjAxNC85LzE2LlxyXG4gKi9cclxuXHJcbmRlZmluZShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLyoqKipcclxuICAgICAqIOWumuS5ieWcsOWbvuimgeWkhOeQhueahOS6i+S7tuWIl+ihqFxyXG4gICAgICogQHJldHVybnMg6L+U5Zue5LqL5Lu25YiX6KGoXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUV2ZW50cygpIHtcclxuICAgICAgICB2YXIgZXZlbnRzID0ge307XHJcbiAgICAgICAgZXZlbnRzLmNsaWNrID0gW107XHJcbiAgICAgICAgZXZlbnRzLm1vdXNlbW92ZSA9IFtdO1xyXG4gICAgICAgIGV2ZW50cy5tb3VzZW91dCA9IFtdO1xyXG4gICAgICAgIGV2ZW50cy5tb3VzZWRvd24gPSBbXTtcclxuICAgICAgICBldmVudHMubW91c2V1cCA9IFtdO1xyXG4gICAgICAgIGV2ZW50cy5kYmxjbGljayA9IFtdO1xyXG4gICAgICAgIGV2ZW50cy5leHRlbnRjaGFuZ2VkID0gW107XHJcbiAgICAgICAgZXZlbnRzLnJlc2l6ZSA9IFtdO1xyXG4gICAgICAgIHJldHVybiBldmVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1hcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmxheWVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMudG9vbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jdXJzb3IgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzID0gY3JlYXRlRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyovISoqKirlrprkuYnlnLDlm77lm77lsYLliJfooagqIS9cclxuICAgIG1hcC5wcm90b3R5cGUubGF5ZXJzID0gW107XHJcblxyXG4gICAgLyEqKioq5a6a5LmJ5Zyw5Zu+5bel5YW35a+56LGhKiEvXHJcbiAgICBtYXAucHJvdG90eXBlLnRvb2wgPSBudWxsO1xyXG5cclxuICAgIC8hKioqKuWumuS5ieWcsOWbvum8oOagh+eahOWbvuaghyohL1xyXG4gICAgbWFwLnByb3RvdHlwZS5jdXJzb3IgPSBudWxsO1xyXG5cclxuICAgIC8hKioq5a6a5LmJ5Zyw5Zu+5LqL5Lu25YiX6KGoKiEvXHJcbiAgICBtYXAucHJvdG90eXBlLmV2ZW50cyA9IGNyZWF0ZUV2ZW50cygpOyovXHJcbiAgICAvKioqXHJcbiAgICAgKiDlrprkuYnluKblj4LmlbDnmoTlnLDlm77liJ3lp4vljJZcclxuICAgICAqIEBwYXJhbSBBbm9ueW1vdXMgb3B0cyDljIXlkKvliJ3lp4vljJblj4LmlbDnmoTlpI3mnYLlr7nosaFcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdHMpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlrprkuYnmt7vliqDlm77lsYLmlrnms5VcclxuICAgICAqIEBwYXJhbSBsYXllciDmt7vliqDnmoTlm77lsYJcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5hZGRMYXllciA9IGZ1bmN0aW9uIChsYXllcikge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzLnB1c2gobGF5ZXIpO1xyXG4gICAgfVxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5Y+v6KeG6IyD6L2sXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0RXh0ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG4gICAgLyoqKlxyXG4gICAgICog5Yig6Zmk5Zu+5bGCXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIg6KaB5Yig6Zmk55qE5Zu+5bGCXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUucmVtb3ZlTGF5ZXIgPSBmdW5jdGlvbiAobGF5ZXIpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmxheWVycy5pbmRleE9mKGxheWVyKTtcclxuICAgICAgICBpZihpbmRleD4wKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqKlxyXG4gICAgICog6K6+572u6byg5qCH5qC35byPXHJcbiAgICAgKiBAcGFyYW0gY3Vyc29yIOm8oOagh+agt+W8j1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnNldEN1cnNvciA9IGZ1bmN0aW9uIChjdXJzb3IpIHtcclxuXHJcbiAgICB9XHJcbiAgICAvKioqXHJcbiAgICAgKiDov5Tlm57lnLDlm77nqpflj6PlsLrlr7ggcHjljZXkvY1cclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRWaWV3U2l6ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICB9XHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5blm77lsYLmlbDph49cclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuWbvuWxguaVsOmHj1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldExheWVyQ291bnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5bmjIflrprntKLlvJXkvY3nva7nmoTlm77lsYJcclxuICAgICAqIEBwYXJhbSBpbmRleCDntKLlvJVcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuWbvuWxglxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldExheWVyID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJzW2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5bmiYDmnInlm77lsYJcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuWbvuWxguaVsOe7hFxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldExheWVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5Zyw5Zu+57yp5pS+57qn5YirXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0Wm9vbUxldmVsID0gZnVuY3Rpb24oKXt9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5YiG6L6o546HXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0UmVzb2x1dGlvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5Z2Q5qCH5Y6f54K5XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0T3JpZ2luID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5p+l5om+5Zu+5bGCXHJcbiAgICAgKiBAcGFyYW0gU3RyaW5nIG5hbWUg5Zu+5bGC5ZCN56ewXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5maW5kTGF5ZXIgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGxheWVyID0gdGhpcy5sYXllcnNbaV07XHJcbiAgICAgICAgICAgIGlmIChsYXllci5uYW1lID09IG5hbWUgfHwgbGF5ZXIuaWQgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxheWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOebkeWQrOaMh+WumuWQjeensOeahOm8oOagh+S6i+S7tuW5tuiuvue9ruWFs+iBlOeahOS6i+S7tuWkhOeQhuaWueazlVxyXG4gICAgICogQHBhcmFtIFN0cmluZyBuYW1lIOS6i+S7tuWQjeensFxyXG4gICAgICogQHBhcmFtIEZ1bmN0aW9uIGZ1bmMg5aSE55CG5pa55rOV5ZCN56ewXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAobmFtZSwgZnVuYykge1xyXG4gICAgICAgIGlmIChuYW1lIGluIHRoaXMuZXZlbnRzKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudHMgPSB0aGlzLmV2ZW50c1tuYW1lXTtcclxuICAgICAgICAgICAgZXZlbnRzLnB1c2goZnVuYyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWPlua2iOebkeWQrOaMh+WumuWQjeensOeahOm8oOagh+S6i+S7tuW5tuWPlua2iOS6i+S7tuWkhOeQhuaWueazleeahOWFs+iBlFxyXG4gICAgICogQHBhcmFtIFN0cmluZyBuYW1lIOS6i+S7tuWQjeensFxyXG4gICAgICogQHBhcmFtIEZ1bmN0aW9uIGZ1bmMg5aSE55CG5pa55rOV5ZCN56ewXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUudW4gPSBmdW5jdGlvbiAobmFtZSwgZnVuYykge1xyXG4gICAgICAgIGlmIChuYW1lIGluICB0aGlzLmV2ZW50cykge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5ldmVudHNbbmFtZV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBldmVudHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHZhciBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50ID09PSBmdW5jKXtcclxuICAgICAgICAgICAgICAgICAgICBldmVudHMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGxlbi0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWcsOWbvue8qeaUvuWIsOepuumXtOaVsOaNruWumuS5ieeahOWFqOWbvuiMg+WbtFxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmZ1bGxFeHRlbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5Zyw5Zu+57yp5bCPXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuem9vbU91dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlnLDlm77mlL7lpKdcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS56b29tSW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5bmz56e75Yeg5L2V5Zu+5b2i5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gZ2VvbWV0cnlcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5wYW4gPSBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDorr7lrprmjIflrprnmoTlnZDmoIfngrnkuLrlnLDlm77kuK3lv4PngrlcclxuICAgICAqIEBwYXJhbSBQb2ludCBjZW50ZXIg5Zyw55CG5Z2Q5qCH54K5XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuc2V0Q2VudGVyID0gZnVuY3Rpb24gKGNlbnRlcikge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluaMh+WumueahOWcsOeQhuWdkOagh+eCueaYvuekuuWcqOWxj+W5leS4iueahOS9jee9rlxyXG4gICAgICogQHBhcmFtIFBvaW50IGNvb3JkaW5hdGUg5Zyw55CG5Z2Q5qCH54K5XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0UGl4ZWxGcm9tQ29vcmRpbmF0ZSA9IGZ1bmN0aW9uIChjb29yZGluYXRlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5bGP5bmV5LiK5oyH5a6a5YOP57Sg54K55a+55bqU55qE5Zyw55CG5Z2Q5qCH54K5XHJcbiAgICAgKiBAcGFyYW0gUG9pbnQgcGl4ZWwg5bGP5bmV5YOP57Sg54K55Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0Q29vcmRpbmF0ZUZyb21QaXhlbCA9IGZ1bmN0aW9uIChwaXhlbCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWvvOWHulxyXG4gICAgICogQHBhcmFtIG5hbWUg5a+85Ye65ZCN56ewXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZXhwb3J0ID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlgZznm67mi5bmi71cclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5zdG9wRHJhZ1BhbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7p+e7reaLluaLvVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnJlc3VtZURyYWdwYW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5YGc5q2i5Y+M5Ye7XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuc3RvcERiQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog57un57ut5Y+M5Ye7XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUucmVzdW1lRGJDbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICog5re75Yqg5Zyw5Zu+55u45YWz5o6n5Lu2XHJcbiAgICAqIEBwYXJhbSBvbC5jb250cm9sLkNvbnRyb2xcclxuICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuYWRkQ29udHJvbCA9IGZ1bmN0aW9uIChjdGwpIHtcclxuICAgIH1cclxuICAgIC8qKipcclxuICAgICAqIOW9k+WJjeato+WcqOS9v+eUqOeahOWcsOWbvuW3peWFt1xyXG4gICAgICogQHBhcmFtIFRvb2xCYXNlIHRvb2xcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5jdXJyZW50VG9vbCA9IGZ1bmN0aW9uICh0b29sKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudG9vbCAhPSB0b29sKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRvb2wgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b29sLmRlYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRvb2wgPSB0b29sO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50b29sICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3Vyc29yID0gdGhpcy50b29sLmN1cnNvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDpvKDmoIfljZXlh7vkuovku7ZcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgYnV0dG9uIOaMieS4i+eahOm8oOagh+aMiemUrlxyXG4gICAgICogQHBhcmFtIE51bWJlciBzaGlmdCDmmK/lkKblkIzml7bmjInkuIvnmoTplK7nm5jkuIrnmoRzaGlmdOmUrlxyXG4gICAgICogQHBhcmFtIE51bWJlciBzY3JlZW5YIOS6i+S7tuWPkeeUn+aXtum8oOagh+WcqOWxj+W5leS4iueahFjlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2NyZWVuWSDkuovku7blj5HnlJ/ml7bpvKDmoIflnKjlsY/luZXkuIrnmoRZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIG1hcFgg6byg5qCH5Zyo5Zyw5Zu+5LiK55qEWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBtYXBZIOm8oOagh+WcqOWcsOWbvuS4iueahFnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgaGFuZGxlIOivpeS6i+S7tuaYr+WQpuW3sue7j+S4jemcgOimgeWGjeWkhOeQhlxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uTW91c2VDbGljayA9IGZ1bmN0aW9uIChidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpIHtcclxuICAgICAgICBpZiAoISF0aGlzLnRvb2wpIHtcclxuICAgICAgICAgICAgdGhpcy50b29sLm9uTW91c2VDbGljayhidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqKlxyXG4gICAgICog6byg5qCH5oKs5YGc5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gRXZlbnQgZSDkuovku7blr7nosaFcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbk1vdXNlT3ZlciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudG9vbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbC5vbk1vdXNlT3ZlcihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6byg5qCH5oyJ6ZSu5oyJ5LiL5pe255qE5LqL5Lu25aSE55CG5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGJ1dHRvbiDmjInkuIvnmoTpvKDmoIfmjInplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2hpZnQg5piv5ZCm5ZCM5pe25oyJ5LiL55qE6ZSu55uY5LiK55qEc2hpZnTplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2NyZWVuWCDkuovku7blj5HnlJ/ml7bpvKDmoIflnKjlsY/luZXkuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblkg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBtYXBYIOm8oOagh+WcqOWcsOWbvuS4iueahFjlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWSDpvKDmoIflnKjlnLDlm77kuIrnmoRZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGhhbmRsZSDor6Xkuovku7bmmK/lkKblt7Lnu4/kuI3pnIDopoHlho3lpITnkIZcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbk1vdXNlRG93biA9IGZ1bmN0aW9uIChidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpIHtcclxuICAgICAgICBpZiAoISF0aGlzLnRvb2wpIHtcclxuICAgICAgICAgICAgdGhpcy50b29sLm9uTW91c2VEb3duKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZXZlbnRzLm1vdXNlZG93bi5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSB0aGlzLmV2ZW50cy5tb3VzZWRvd25baV07XHJcbiAgICAgICAgICAgIGV2ZW50KGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqXHJcbiAgICAgKiDpvKDmoIfmjInplK7mjInkuIvlkI7miqzotbfnmoTkuovku7bnmoTlpITnkIbmlrnms5VcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgYnV0dG9uIOaMieS4i+eahOm8oOagh+aMiemUrlxyXG4gICAgICogQHBhcmFtIE51bWJlciBzaGlmdCDmmK/lkKblkIzml7bmjInkuIvnmoTplK7nm5jkuIrnmoRzaGlmdOmUrlxyXG4gICAgICogQHBhcmFtIE51bWJlciBzY3JlZW5YIOS6i+S7tuWPkeeUn+aXtum8oOagh+WcqOWxj+W5leS4iueahFjlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2NyZWVuWSDkuovku7blj5HnlJ/ml7bpvKDmoIflnKjlsY/luZXkuIrnmoRZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIG1hcFgg6byg5qCH5Zyo5Zyw5Zu+5LiK55qEWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBtYXBZIOm8oOagh+WcqOWcsOWbvuS4iueahFnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgaGFuZGxlIOivpeS6i+S7tuaYr+WQpuW3sue7j+S4jemcgOimgeWGjeWkhOeQhlxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uTW91c2VVcCA9IGZ1bmN0aW9uIChidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpIHtcclxuICAgICAgICBpZiAoISF0aGlzLnRvb2wpIHtcclxuICAgICAgICAgICAgdGhpcy50b29sLm9uTW91c2VVcChidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV2ZW50cy5tb3VzZXVwLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IHRoaXMuZXZlbnRzLm1vdXNldXBbaV07XHJcbiAgICAgICAgICAgIGV2ZW50KGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOm8oOagh+enu+WKqOS6i+S7tuWkhOeQhuaWueazlVxyXG4gICAgICogQHBhcmFtIE51bWJlciBidXR0b24g5oyJ5LiL55qE6byg5qCH5oyJ6ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNoaWZ0IOaYr+WQpuWQjOaXtuaMieS4i+eahOmUruebmOS4iueahHNoaWZ06ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblgg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBzY3JlZW5ZIOS6i+S7tuWPkeeUn+aXtum8oOagh+WcqOWxj+W5leS4iueahFnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWCDpvKDmoIflnKjlnLDlm77kuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIG1hcFkg6byg5qCH5Zyo5Zyw5Zu+5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBoYW5kbGUg6K+l5LqL5Lu25piv5ZCm5bey57uP5LiN6ZyA6KaB5YaN5aSE55CGXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25Nb3VzZU1vdmUgPSBmdW5jdGlvbiAoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKSB7XHJcbiAgICAgICAgaWYgKCEhdGhpcy50b29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbC5vbk1vdXNlTW92ZSA/IHRoaXMudG9vbC5vbk1vdXNlTW92ZShidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpIDogbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ldmVudHMubW91c2Vtb3ZlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IHRoaXMuZXZlbnRzLm1vdXNlbW92ZVtpXTtcclxuICAgICAgICAgICAgZXZlbnQoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5Zyw5Zu+5Y+v6KeG6IyD5Zu05pS55Y+Y5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGxlZnQg5bem5LiK6KeSWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciB0b3Ag5bem5LiK6KeSWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciByaWdodCDlj7PkuIvop5JY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGJvdHRvbSDlj7PkuIvop5JZ5Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25FeHRlbnRDaGFuZ2VkID0gZnVuY3Rpb24gKGxlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbSkge1xyXG4gICAgICAgIGlmICghIXRoaXMudG9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2wub25FeHRlbnRDaGFuZ2VkID8gdGhpcy50b29sLm9uRXh0ZW50Q2hhbmdlZChsZWZ0LCB0b3AsIHJpZ2h0LCBib3R0b20pIDogbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ldmVudHMuZXh0ZW50Y2hhbmdlZC5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSB0aGlzLmV2ZW50cy5leHRlbnRjaGFuZ2VkW2ldO1xyXG4gICAgICAgICAgICBldmVudChsZWZ0LCB0b3AsIHJpZ2h0LCBib3R0b20pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDpvKDmoIflj4zlh7vkuovku7ZcclxuICAgICAqIEBwYXJhbSBFdmVudCBlIOS6i+S7tuWvueixoVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uRGJsY2xpY2sgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvb2wgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2wub25EYmxjbGljayhlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5rWP6KeI5Zmo56qX5Y+j5aSn5bCP5pS55Y+Y5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHdpZHRoIOaWsOeahOeql+WPo+WuveW6plxyXG4gICAgICogQHBhcmFtIE51bWJlciBoZWlnaHQg5paw55qE56qX5Y+j6auY5bqmXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25SZXNpemUgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWcsOWbvuiOt+W+l+eEpueCueeahOS6i+S7tlxyXG4gICAgICogQHBhcmFtIEV2ZW50IGUg5LqL5Lu25a+56LGhXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25Gb2N1cyA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB9XHJcbiAgICAvKioqXHJcbiAgICAgKiDnp7vpmaTlnLDlm77nm7jlhbPnmoTkuqTkupJcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5yZW1vdmVJbnRlcmFjdGlvbnMgPSBmdW5jdGlvbigpe31cclxuICAgIC8qKipcclxuICAgICAqIOmHjee9ruWcsOWbvuebuOWFs+eahOS6pOS6klxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnJlc3VtZUludGVyYWN0aW9ucyA9IGZ1bmN0aW9uKCl7fVxyXG4gICAgXHJcbiAgICByZXR1cm4gbWFwO1xyXG5cclxufSlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dpcy9tYXAvbWFwLmpzIiwiLyoqXHJcbiAqIEBjbGFzcyBHZW9tZXRyeVR5cGU6IOWHoOS9leWbvuW9ouexu+Wei+aemuS4vlxyXG4gKiBDcmVhdGVkIGJ5IGxpZ2FuZyBvbiAyMDE0LzkvMTUuXHJcbiAqL1xyXG5cclxuZGVmaW5lKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIC8qKirkuI3mjIflrprlhbfkvZPlvaLnirbnsbvliKvnmoTlm77lvaIqL1xyXG4gICAgICAgIEdlb21ldHJ5OiAwLFxyXG4gICAgICAgIC8qKirngrnnirblm77lvaIqL1xyXG4gICAgICAgIFBvaW50OiAxLFxyXG4gICAgICAgIC8qKirlnIblvKfnirblm77lvaIqL1xyXG4gICAgICAgIEN1cnZlOiAyLFxyXG4gICAgICAgIC8qKirmrrXnirblm77lvaIqL1xyXG4gICAgICAgIFNlZ21lbnQ6IDMsXHJcbiAgICAgICAgLyoqKuefqeW9oiovXHJcbiAgICAgICAgRW52ZWxvcGU6IDQsXHJcbiAgICAgICAgLyoqKue6v+W9oiovXHJcbiAgICAgICAgTGluZTogNSxcclxuICAgICAgICAvKioq5pa55b2iKi9cclxuICAgICAgICBSZWN0YW5nbGU6IDYsXHJcbiAgICAgICAgLyoqKuato+aWueW9oiovXHJcbiAgICAgICAgU3F1YXJlOiA3LFxyXG4gICAgICAgIC8qKirlnIblvaIqL1xyXG4gICAgICAgIENpcmNsZTogOCxcclxuICAgICAgICAvKioq5qSt5ZyG5b2iKi9cclxuICAgICAgICBFbGxpcHNlOiA5LFxyXG4gICAgICAgIC8qKirlpJrkuKrngrnooajnpLrnmoTot6/lvoQqL1xyXG4gICAgICAgIFBhdGg6IDEwLFxyXG4gICAgICAgIC8qKirnlLHkuIDns7vliJfnmoTngrnmnoTmiJDnmoTnjq/nirbpl63lkIjlm77lvaIqL1xyXG4gICAgICAgIFJpbmc6IDExLFxyXG4gICAgICAgIC8qKirlpJrlnIblvKflm77lvaIqL1xyXG4gICAgICAgIFBvbHlDdXJ2ZTogMTIsXHJcbiAgICAgICAgLyoqKuS4gOS4quaIluWkmuS4qui3r+W+hOeKtuWbvuW9ouihqOekuueahOepuumXtOWHoOS9leWbvuW9oiovXHJcbiAgICAgICAgUG9seWxpbmU6IDEzLFxyXG4gICAgICAgIC8qKirkuIDkuKrmiJbogIXlpJrkuKrnjq/nirblm77lvaLooajnpLrnmoTnqbrpl7Tlh6DkvZXlm77lvaIqL1xyXG4gICAgICAgIFBvbHlnb246IDE0LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWkmueCuVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIE11bHRpUG9pbnQ6IDE1LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWkmumdolxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIE11bHRpUG9seWdvbjogMTZcclxuICAgIH1cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9naXMvZ2VvbWV0cmllcy9nZW9tZXRyeXR5cGUuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBsaXVmZW5nIG9uIDIwMTcvMTEvMi5cclxuICovXHJcbmRlZmluZShbXSxmdW5jdGlvbigpe1xyXG4gICAgdmFyIGdsb2JlID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2xvYmU7XHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dpcy9tYXAvZ2xvYmUuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBsaXVmZW5nIG9uIDIwMTcvMTEvMi5cclxuICovXHJcblxyXG5kZWZpbmUoWycuL2dlb21ldHJpZXMvZ2VvbWV0cnl0eXBlJywnLi9nZW9tZXRyaWVzL2dlb21ldHJ5JyxcIi4vbWFwL21hcFwiLFwiLi9tYXAvZ2xvYmVcIl0sIGZ1bmN0aW9uIChHZW9tZXRyeVR5cGUsR2VvbWV0cnksTWFwLEdsb2JlKSB7XHJcbiAgICB3aW5kb3cuZzIgPSB3aW5kb3cuZzIgfHwge307XHJcbiAgICB2YXIgZzIgPSB3aW5kb3cuZzI7XHJcbiAgICBnMi5nZW9tID0gZzIuZ2VvbSB8fHt9O1xyXG4gICAgZzIubWFwcyA9ZzIubWFwcyB8fCB7fTtcclxuICAgIGcyLmdlb20uR2VvbWV0cnlUeXBlPUdlb21ldHJ5VHlwZTtcclxuICAgIGcyLmdlb20uR2VvbWV0cnkgPUdlb21ldHJ5O1xyXG4gICAgZzIubWFwcy5JTWFwPU1hcDtcclxuICAgIGcyLm1hcHMuSUdsb2JlID0gR2xvYmU7XHJcbiAgICBnMi5tYXBzLkdsb2JlZGRkNTVsaXVmZW5nID0gR2xvYmU7XHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dpcy9leHBvcnQuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBsaXVmZW5nIG9uIDIwMTcvMTEvMi5cclxuICovXHJcbmRlZmluZShbJy4vbGFuZy9jbGFzc1V0aWwnXSwgZnVuY3Rpb24gKENsYXNzVXRpbCkge1xyXG4gICAgd2luZG93LmcyID0gd2luZG93LmcyIHx8IHt9O1xyXG4gICAgdmFyIGcyID0gd2luZG93LmcyO1xyXG4gICAgZzIubGFuZz1nMi5sYW5nIHx8IHt9O1xyXG4gICAgZzIubGFuZy5DbGFzc1V0aWwgPSBDbGFzc1V0aWw7XHJcbiAgICBnMi5sYW5nLmE1NTU9IENsYXNzVXRpbDtcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZzIvZXhwb3J0LmpzIiwiLyoqXHJcbiAqIEBjbGFzcyBHZW9tZXRyeTog5omA5pyJ56m66Ze05Yeg5L2V5Zu+5b2i55qE5Z+657G75Z6LXHJcbiAqIENyZWF0ZWQgYnkgbGlnYW5nIG9uIDIwMTQvOC8yMS5cclxuICovXHJcblxyXG5kZWZpbmUoWycuL2dlb21ldHJ5dHlwZSddLCBmdW5jdGlvbiAoR2VvbWV0cnlUeXBlKSB7XHJcbiAgICB2YXIgZ2VvbWV0cnkgPSBmdW5jdGlvbiAob3B0cykge1xyXG4gICAgICAgIHRoaXMuJHR5cGUgPSAnR2VvbWV0cnksaHR0cDovL3d3dy5Hcy5jb20nO1xyXG4gICAgICAgIHZhciBvcHRzcyA9IG9wdHMgfHwge307XHJcbiAgICAgICAgLyoqKuepuumXtOaVsOaNruWPguiAg++8jOWmguimgeafpeeci+abtOWkmui1hOaWme+8jOivt+WPguingWVudW1TcGF0aWFsUmVmZXJlbmNl5p6a5Li+44CCKi9cclxuICAgICAgICB0aGlzLnNwYXRpYWxSZWZlcmVuY2UgPSBvcHRzcy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKioq5rWu54K55pWw57G75Z6L6K6h566X57K+5bqm77yM5L+d55WZNOS9jeWwj+aVsCovXHJcbiAgICBnZW9tZXRyeS50b2xlcmF0ZSA9IDAuMDAwMDAwMDAwMDAxO1xyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiuvue9ruepuumXtOaVsOaNruWPguiAg1xyXG4gICAgICogQHBhcmFtIE51bWJlciBzciDmlrDnmoTnqbrpl7TmlbDmja7lj4LogINcclxuICAgICAqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLnNldFNwYXRpYWxSZWZlcmVuY2UgPSBmdW5jdGlvbiAoc3IpIHtcclxuICAgICAgICB0aGlzLnNwYXRpYWxSZWZlcmVuY2UgPSBzcjtcclxuICAgIH1cclxuXHJcbiAgICAvKioqKlxyXG4gICAgICog6I635Y+W56m66Ze05pWw5o2u5Y+C6ICDXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57mlbTmlbDlvaLlvI/ooajnpLrnmoTnqbrpl7TmlbDmja7lj4LogINcclxuICAgICAqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLmdldFNwYXRpYWxSZWZlcmVuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5blh6DkvZXlm77lvaLnsbvlnovvvIzlpoLopoHmn6XnnIvmm7TlpJrotYTmlpnvvIzor7flj4Lop4FHZW9tZXRyeVR5cGXmnprkuL7jgIJcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnkdlb21ldHJ5VHlwZeaemuS4vlxyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUuZ2V0R2VvbWV0cnlUeXBlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBHZW9tZXRyeVR5cGUuR2VvbWV0cnk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKuepuumXtOaVsOaNruWPguiAg+WAvCovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUuc3BhdGlhbFJlZmVyZW5jZSA9IDA7XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5q+U6L6D5Lik5Liq5Yeg5L2V5Zu+5b2i5a+56LGh5piv5ZCm55u45ZCMXHJcbiAgICAgKiBAcGFyYW0gR2VvbWV0cnkgb2JqIOavlOi+g+eahOWHoOS9leWbvuW9ouWvueixoVxyXG4gICAgICogQHJldHVybnMg6L+U5ZuedHJ1ZeihqOekuuebuOWQjO+8jOi/lOWbnmZhbHNl6KGo56S65LiN5ZCMXHJcbiAgICAgKi9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOS9v+WHoOS9leWbvuW9ouato+W4uOWMluOAgeinhOiMg+WMluOAglxyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUubm9ybWFsaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOenu+WKqOWHoOS9leWbvuW9ouWvueixoVxyXG4gICAgICogQHBhcmFtIFBvaW50IHBvaW50IEdlb21ldHJ55a+56LGh5YGP56e76YePXHJcbiAgICAgKi9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5vZmZzZXQgPSBmdW5jdGlvbiAocG9pbnQpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlhYvpmoblr7nosaFcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuS4gOS4quaWsOeahEdlb21ldHJ55a+56LGhXHJcbiAgICAgKi9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgZ2VvbWV0cnkodGhpcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluW9k+WJjUdJU+W9oueKtueahOWkluaOpeefqeW9olxyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUuZW52ZWxvcGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xyXG59KTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9naXMvZ2VvbWV0cmllcy9nZW9tZXRyeS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuZGVmaW5lKFtcIi4vZXhwb3J0XCIsXCIuL21hcC9jbS9jbWdsb2JlXCJdLGZ1bmN0aW9uKGdpcyxDTUdsb2JlKXtcclxuICAgIHdpbmRvdy5nMiA9IHdpbmRvdy5nMiB8fCB7fTtcclxuICAgIHZhciBnMiA9IHdpbmRvdy5nMjtcclxuICAgIGcyLm1hcHM9ZzIubWFwcyB8fCB7fVxyXG4gICAgZzIubWFwcy5HbG9iZT1DTUdsb2JlO1xyXG5cclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2lzL2V4cG9ydDNkLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGl1ZmVuZyBvbiAyMDE3LzExLzIuXHJcbiAqL1xyXG5kZWZpbmUoWycuLi8uLi8uLi9nMi9sYW5nL2NsYXNzVXRpbCcsICcuLi9tYXAnLCAnLi4vZ2xvYmUnXSwgZnVuY3Rpb24gKENsYXNzVXRpbCwgTWFwLEdsb2JlKSB7XHJcblxyXG4gICAgdmFyIGdsb2JlID0gZnVuY3Rpb24ob3B0cyl7XHJcbiAgICAgICAgdmFyIG9wdHNzID0gb3B0cyB8fCB7fTtcclxuICAgICAgICBHbG9iZS5jYWxsKHRoaXMsb3B0c3MpO1xyXG4gICAgICAgIE1hcC5jYWxsKHRoaXMsb3B0c3MpO1xyXG4gICAgfVxyXG5cclxuICAgIENsYXNzVXRpbC5leHRlbmQyKGdsb2JlLEdsb2JlKTtcclxuICAgIENsYXNzVXRpbC5leHRlbmQyKGdsb2JlLE1hcCk7XHJcbiAgICByZXR1cm4gZ2xvYmU7XHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dpcy9tYXAvY20vY21nbG9iZS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuZGVmaW5lKFtcIi4vZzIvZXhwb3J0XCIsXCIuL2dpcy9leHBvcnQzZFwiXSxmdW5jdGlvbigpe1xyXG5cclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHNnaXMzZC5qcyJdLCJzb3VyY2VSb290IjoiIn0=