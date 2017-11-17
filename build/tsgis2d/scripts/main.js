/**
 * Created by liufeng on 2017/11/2.
 */
require.config({
    baseUrl: './scripts',
    paths: {
    },
    shim: {
        underscore: {
            exports: '_'
        }
    }
});
/**
 *   app
 */
require(['./tsgis/tsgis'],
    function (tsgis) {
     require([],function () {
         console.log(g2);
     })
    });