/**
 * Created by liufeng on 2017/11/3.
 */
var gulp = require("gulp");
var runSequence = require('run-sequence');

//引入自定义gulp任务
require('./config/gulp/gulp-clean');

var _callback = null;

//默认构建任务
gulp.task('default',function(callback){
    _callback = callback;
    return runSequence(
      'clean',
      "webpack-build",
      runTaskCallBack
    );
})

//开发时构建任务
gulp.task('dev',function(callback){
    _callback = callback;
    return runSequence(
        'clean'
    );
})

//发布时构建任务
gulp.task('dist',function(callback){
    _callback = callback;
    return runSequence(
        'clean-dist'
    )
})

function runTaskCallBack(error){
    if(error){
        console.log(error.message);
        return process.exit(1);
    }else {
        console.log("BUILD TASK FINISHED SUCCESSFULLY");
    }
    if(_callback){
        _callback(error);
    }
}