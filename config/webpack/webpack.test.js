/**
 * Created by liufeng on 2017/11/2.
 */
const path = require('path');
const webpack = require('webpack');
const root = path.resolve(__dirname,"../../");//获取根目录
const disttsgis2d = root+"/dist/tsgis2d";
module.exports = {
    //多文件打包输出
    entry:  {
        "tsgis2d":root+"/app/scripts/tsgis/tsgis2d.js",
        "tsgis3d":root+"/app/scripts/tsgis/tsgis3d.js",
        "tsgis":root+"/app/scripts/tsgis/tsgis.js"
    },
    devtool: 'inline-source-map',//
    output: {
        path: root + "/dist/tsgis2d",//打包后的文件存放的地方
        filename: "[name].js",//打包后输出文件的文件名
        libraryTarget: "amd",//输出模块类型
    },
    resolve:{
        extensions:['.js'],
        //模块别名定义,用于后面直接引用模块
        alias:{

        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: root+"/dist/tsgis2d",
        historyApiFallback: true,
        inline:true
        //hot:true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
}