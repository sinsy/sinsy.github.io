---
layout: post
title: 移动端Fixed布局的解决方案
date:   2016-05-04 14:02:15 +0800
category: 前端
tags: [移动端]
---
## 参考文章：
* [Web移动端Fixed布局的解决方案](http://efe.baidu.com/blog/mobile-fixed-layout/)
* [Issues with position fixed & scrolling on iOS](https://remysharp.com/2012/05/24/issues-with-position-fixed-scrolling-on-ios) 

## 一、问题 

在移动端中，iOS 下经常会有 fixed 元素和输入框(input 元素)同时存在的情况。但是 fixed 元素在有<b>软键盘</b>唤起的情况下，会出现许多莫名其妙的问题。

```
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0">
    <meta charset="utf-8">
    <style>
        header, footer, main {
            display: block;
        }
        header, footer{
            background: red;
        }
        header {
            position: fixed;
            height: 50px;
            left: 0;
            right: 0;
            top: 0;
        }
        footer {
            position: fixed;
            height: 34px;
            left: 0;
            right: 0;
            bottom: 0;
        }
        main {
            margin-top: 50px;
            margin-bottom: 34px;
        }

    </style>
</head>
<body>
    <!-- fixed定位的头部 -->
    <header id="header">
        
    </header>
    
    <!-- 可以滚动的区域 -->
    <main id="main">
       
        <!-- 内容在这里... -->
        苹果手机软键盘弹起时会导致， fixed 属性失效了！
        ...
        ...
        ...
    </main>
    
    <!-- fixed定位的底部 -->
    <footer id="footer">
        <input type="text" placeholder="Footer..."/>
        <button class="submit">提交</button>
    </footer>
</body>
</html>
```

测试地址： <a href="/begining/mobile/iscroll/example/bug.html" target="_blank">bug.html</a>

如果底部输入框软键盘被唤起以后，再次滑动页面，就会看到如下图所示：
![fixed bug](http://7xtflp.com1.z0.glb.clouddn.com/mobile-iscroll-fixed.png "fixed bug") 

##  二、解决思路

整合上述两篇文章得出思路，在不使用iscroll.js插件的情况下，既然在 iOS 下由于软键盘唤出后，页面 fixed 元素会失效，导致跟随页面一起滚动，那么**假如页面不会过长出现滚动，那么即便 fixed 元素失效，也无法跟随页面滚动**，也就不会出现上面的问题了。
修改style样式:main绝对定位，`overflow-y: scroll;`进行内部滚动, `-webkit-overflow-scrolling: touch;`可以增加弹性。

```
<style>
    header, footer, main {
        display: block;
    }
    header, footer{
        background: red;
        z-index: 100;
    }
    header {
        position: fixed;
        height: 50px;
        left: 0;
        right: 0;
        top: 0;
    }

    footer {
        position: fixed;
        height: 34px;
        left: 0;
        right: 0;
        bottom: 0;
    }

    main {
        /* main绝对定位，进行内部滚动 */
        position: absolute;
        top: 50px;
        bottom: 34px;
        /* 使之可以滚动 */
        overflow-y: scroll;
        /* 增加该属性，可以增加弹性 */
        -webkit-overflow-scrolling: touch;
    }
</style>
```

测试地址： [solutionFixed.html](http://www.sinsy.top/hungry/learn/mobile/iscroll/example/solutionFixed.html)

### 其他细节处理
1. 在页面滚动到上下边缘的时候，如果继续拖拽会将整个 View 一起拖拽走，导致页面的“露底”。
对第一篇文章的js代码进行微小的修改：

```
<script>
// 防止内容区域滚到底后引起页面整体的滚动
var content = document.querySelector('#main');

var startY;

content.addEventListener('touchstart', function (e) {
    startY = e.touches[0].clientY;
});

content.addEventListener('touchmove', function (e) {
    // 高位表示向上滚动
    // 底位表示向下滚动
    // 1容许 0禁止
    var status = '11';
    var ele = this;

    var currentY = e.touches[0].clientY;

    if (ele.scrollTop === 0) {
        // 如果内容小于容器则同时禁止上下滚动
        status = ele.offsetHeight >= ele.scrollHeight ? '00' : '01';
    } else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
        // 已经滚到底部了只能向上滚动
        status = '10';
    }

    if (status != '11') {
        // 判断当前的滚动方向
        var direction = currentY - startY > 0 ? '10' : '01';
        // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
        if (!(parseInt(status, 2) & parseInt(direction, 2))) {
            stopEvent(e);
            
        }
    }
    e.stopPropagation();
});
function stopEvent(e){
    e.preventDefault();
    // console.log('Default prevented');
}
</script>
```

2. 最好将 header 和 footer 元素的 touchmove 事件禁止，以防止滚动在上面触发了部分浏览器全屏模式切换，而导致顶部地址栏和底部工具栏遮挡住 header 和 footer 元素。

```
<script>
header.addEventListener('touchmove', function(e){
     e.preventDefault();
});     
footer.addEventListener('touchmove', function(e){
     e.preventDefault();
});
</script>
```

细节完善后的测试地址： [solutionDetail.html](http://www.sinsy.top/hungry/learn/mobile/iscroll/example/solutionDetail.html)

## 三、插件化

* [github地址](http://github.com/sinsy/iscroll/)
* [代码下载地址](http://www.sinsy.top/hungry/learn/mobile/iscroll.zip)









