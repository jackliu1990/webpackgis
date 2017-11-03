/**
 * Created by liufeng on 2017/11/2.
 */
require.config({
    baseUrl: './scripts',
    shim: {
        underscore: {
            exports: '_'
        }
    }
});
/**
 *   app
 */
require(['./tsgis/tsgis2d'],
    function (tsgis2d) {
        console.log(g2);
    });