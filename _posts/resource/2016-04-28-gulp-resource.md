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
    browserSync({ 
      // proxy: 'http://localhost:8080/zhibei2/web/src/' //利用tomcat或其他服务器
      server: { //browsersync内置
        baseDir: "./src/"
      }
    });
    gulp.watch("./src/public/precss/*.css").on('change', gulp.series(
        css, browserSync.reload
        ));
    gulp.watch(['./src/*.jsp','./src/*.html','./src/public/js/*.js']).on('change', browserSync.reload);
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

```
gulp.task(css);
function css() {
    var processors = [
      cssImport,
      mixins,//Note, that you must set this plugin before postcss-simple-vars and postcss-nested.
      simplevars,
      nestedcss,
      // px2rem({remUnit: 64}),mobile
      autoprefixer,
      mqpacker,
    ];
    var processors2 = [
      cssnano({discardComments: {removeAll: true}})
    ]
    return gulp.src('./src/public/precss/*.css')
        .pipe(postcss(processors))
        .pipe(spriteCss({
          //生成的sprite的位置
          'spriteSheet': './src/public/img/sprite.png',
          //生成样式的文件图片引用路径
          'pathToSpriteSheetFromCSS': '../img/sprite.png'
        }))
        .pipe(postcss(processors2))
        .pipe(gulp.dest('./src/public/css'));
}
```

### 3.js处理
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) js压缩
* [gulp-concat](https://www.npmjs.com/package/gulp-concat) js文件合并
* [gulp-jshint](https://www.npmjs.com/package/gulp-jshint) js错误检查

### 4.html处理
* [gulp-processhtml](https://www.npmjs.com/package/gulp-processhtml) html处理
* [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin) html压缩

### 5.image处理
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) 图片压缩
* [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant) png图片压缩
* [gulp-cache](https://www.npmjs.com/package/gulp-cache) 图片缓存

### 6.版本控制
* [gulp-rev](https://www.npmjs.com/package/gulp-rev)
* [gulp-rev-collector](https://www.npmjs.com/package/gulp-rev-collector)

### 7.其余
* [gulp-notify](https://www.npmjs.com/package/gulp-notify)
* [del](https://www.npmjs.com/package/del)

## 三、资源
所有gulp插件集合一起：
[github地址](https://github.com/sinsy/gulpTest)






    

