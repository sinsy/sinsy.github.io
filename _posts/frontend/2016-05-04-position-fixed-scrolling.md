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
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
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
            height: 2000px
        }

    </style>
</head>
<body>
    <!-- fixed定位的头部 -->
    <header>
        
    </header>
    
    <!-- 可以滚动的区域 -->
    <main>
        <div class="content">
        <!-- 内容在这里... -->
        苹果手机软键盘弹起时会导致， fixed 属性失效了！
        </div>
        
    </main>
    
    <!-- fixed定位的底部 -->
    <footer>
        <input type="text" placeholder="Footer..."/>
        <button class="submit">提交</button>
    </footer>
</body>
</html>
```

测试地址： [](link)

如果底部输入框软键盘被唤起以后，再次滑动页面，就会看到如下图所示：
![fixed bug](http://7xtflp.com1.z0.glb.clouddn.com/mobile-iscroll-fixed.png "fixed bug") 

##  二、解决思路

整合上述两篇文章得出思路，在不使用iscroll.js插件的情况下，既然在 iOS 下由于软键盘唤出后，页面 fixed 元素会失效，导致跟随页面一起滚动，那么**假如页面不会过长出现滚动，那么即便 fixed 元素失效，也无法跟随页面滚动**，也就不会出现上面的问题了。


