---
layout: post
title:  "Gulp常用资源"
date:   2016-04-29 14:30:15 +0800
categories: 资源 
tags: [gulp,postcss]
---
`注：如果npm install -g gulp，就改成sudo npm install -g gulp`

## 一、安装操作
* **全局安装** `npm install -g gulp`
* **局部安装** `npm install –-save-dev gulp` （项目目录下安装）
* **安装插件** `npm install —-save-dev <name>`
* **安装gulp4.0** 
    * 全局安装： `npm install gulpjs/gulp#4.0 -g`
    * 局部安装： `npm install gulpjs/gulp#4.0 --save-dev`
    * 参考资料： [gulp 4.0的变化](http://www.alloyteam.com/2015/07/update-your-gulp/)     [官方升级文档](https://github.com/gulpjs/gulp/blob/4.0/CHANGELOG.md)

## 二、Gulp插件

### 1.实时浏览

* [browser-sync](https://www.npmjs.com/package/browser-sync) 静态文件服务器，同时也支持浏览器自动刷新 

```
gulp.task(browsersync);
function browsersync() {
    gulp.watch("./src/public/preCss/*.css", gulp.series(
        css, browserSync.reload
        ));
    gulp.watch(['./src/*.jsp','./src/public/js/*.js'], browserSync.reload);
    browserSync({ 
      proxy: 'http://localhost:8080/zhibei2/web/src/'
    });
}
```

### 2.css处理
* [gulp-postcss](https://github.com/postcss/postcss) css预处理器
* [postcss插件](http://postcss.parts/)    
    - [postcss-simple-vars](https://github.com/postcss/postcss-simple-vars)： 变量
    - [autoprefixer](https://github.com/postcss/autoprefixer)： 为CSS补全浏览器前缀
    - [css-mqpacker](https://github.com/hail2u/node-css-mqpacker)： 归类media
    - [cssnano](http://cssnano.co/)： 压缩css
    - [postcss-nested](https://github.com/postcss/postcss-nested)： css嵌套
    - [postcss-mixins](https://github.com/postcss/postcss-mixins)：类
    - [postcss-px2rem](https://www.npmjs.com/package/px2rem)： px 转为 rem,web端rem兼容不好，但可以在手机端尝试rem单位结合淘宝flexible.js，参考文档：[使用Flexible实现手淘H5页面的终端适配](http://www.tuicool.com/articles/nmm6reE)
    - [postcss-import](https://github.com/postcss/postcss-import)： @import xxx.css导入样式
* [gulp-css-spriter](http://www.codes51.com/article/detail_117947.html)： css文件中的sprite图片合成

### 3.js处理






    

