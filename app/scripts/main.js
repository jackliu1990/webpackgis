/**
 * Created by liufeng on 2017/11/2.
 */
require.config({
    baseUrl: './scripts',
    paths: {
        "tsgis2d":"../../dist/tsgis"
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
require(['tsgis2d'],
    function (tsgis2d) {
        console.log(g2);
    });