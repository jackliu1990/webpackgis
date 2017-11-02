const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry:  {
      "tsgis2d":path.resolve(__dirname,"../../")+"/src/tsgis2d.js",
      "tsgis3d":path.resolve(__dirname,"../../")+"/src/tsgis3d.js",
      "tsgis":path.resolve(__dirname,"../../")+"/src/tsgis.js",
  },
  output: {
    path: path.resolve(__dirname,"../../") + "/dist",//打包后的文件存放的地方
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
      /* new webpack.optimize.UglifyJsPlugin({
           compress: {
               warnings: false
           }
       })*/
    ]
}