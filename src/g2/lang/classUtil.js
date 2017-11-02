/**
 * @class classUtil: 定义类型工具，实现类型继承
 *  Created by ligang on 2014/8/13.
 *  @modify }{yellow 
 */

define(function () {

    var id = 10000;

    var util = function() {}

    util.extend = function(child, parent) {
        var F = function() {};
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
        child.uber = parent.prototype;
    }

    util.extend2 = function(child, parent) {
        var p = parent.prototype;
        var c = child.prototype;
        for ( var i in p) {
            c[i] = p[i];
        }
        c.uber = p;
    }

    util.isArray = function (obj) {
        return (!!obj && obj.constructor == Array);
    }

    util.newId = function () {
        return id++;
    }

    util.extendCopy= function(p) {
        var c = {};
        for ( var i in p ) {
            c[i] = p[i];
        }
        c.uber = p;
        return c;
    }

    util.deepCopy = deepCopy;

    util.objectPlus = function(o, stuff) {
        var n;
        function F() {};
        F.prototype = o;
        n = new F();
        n.uber = o;

        for ( var i in stuff) {
            n[i] = stuff[i];
        }

        return n;
    }

    util.extendMulti = function() {
        var n = {}, stuff, j = 0, len = arguments.length;
        for ( j = 0; j < len; j++) {
            stuff = arguments[j];
            for ( var i in stuff) {
                n[i] = stuff[i];
            }
        }
        return n;
    }

    function deepCopy(p, c) {
        var c = c || {};
        for ( var i in p ) {
            if ( typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                deepCopy(p[i], c[i]);
            }
            else {
                c[i] = p[i];
            }
        }
        return c;
    }

    return util;

});
