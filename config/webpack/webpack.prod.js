/**
 * Created by liufeng on 2017/11/2.
 */
const path = require('path');
const webpack = require('webpack');
const root = path.resolve(__dirname,"../../");//获取根目录
module.exports = {
    entry:  {
        "tsgis2d":root+"/src/tsgis2d.js",
        "tsgis3d":root+"/src/tsgis3d.js",
        "tsgis":root+"/src/tsgis.js",
    },
    output: {
        path: root+ "/dist",//打包后的文件存放的地方
        filename: "[name].js",//打包后输出文件的文件名
        libraryTarget: 'amd'
    },
    /*resolve:{
     //模块别名
     alias:__dirname+"/src/tsgis2d",
     //模块目录
     modules:[
     path.resolve('./src/')
     ],
     extensions:['.js']
     },*/
    plugins: [
         new webpack.optimize.UglifyJsPlugin({
         compress: {
         warnings: false
         }
         })
    ]
}