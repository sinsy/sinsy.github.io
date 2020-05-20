---
layout: post
title: css3变形 3 transform-style和backface-visibility详解
date:   2015-06-15
category: 前端
tags: [css]
---

终于完成了上篇[css3变形 3D Transform分析](http://www.sinsy.top/2015-06-15-css3-3d-transform/)了，趁着知识热热的，脑子满满的赶紧写完transform-style和backface-visibility两个属性。

## 一、transform-style
transform-style 属性规定如何在 3D 空间中呈现被嵌套的元素。

`注释：该属性必须与 transform 属性一同使用。`

他主要有两个属性值：flat和preserve-3d。

transform-style属性的使用语法非常简单：

```
transform-style: flat | preserve-3d
```

其中flat值为默认值，表示所有子元素在2D平面呈现。preserve-3d表示所有子元素在3D空间中呈现。

也就是说，如果对一个元素设置了transform-style的值为flat，则该元素的所有子元素都将被平展到该元素的2D平面中进行呈现。沿着X轴或Y轴方向旋转该元素将导致位于正或负Z轴位置的子元素显示在该元素的平面上，而不是它的前面或者后面。如果对一个元素设置了transform-style的值为preserve-3d，它表示不执行平展操作，他的所有子元素位于3D空间中。

transform-style属性需要设置在父元素中，并且高于任何嵌套的变形元素。最后，我们运用一个例子，来加深一下对transform-style属性的印象：

<iframe src="http://www.sinsy.top/hungry/learn/css3/3d/transform-style.html" frameborder="0" width="100%" height="500px"></iframe>

## 二、 backface-visibility
backface-visibility 属性定义当元素不面向屏幕时是否可见。

如果在旋转元素不希望看到其背面时，该属性很有用。默认值为visible（可见）。

```
backface-visibility: visible;
backface-visibility: hidden;
```

<iframe src="http://www.sinsy.top/hungry/learn/css3/3d/backface-visibility.html" frameborder="0" width="100%" height="500px"></iframe>

```
<!DOCTYPE html>
<html>
<head>
    <title>Backface visible</title>
    <meta charset="UTF-8">  
    <style>
/**
 * Backface visible
 */

.container {
    width: 500px;
    height: 200px;
    margin: 75px 0 0 75px;
    border: none;
    position: relative;
}

.cube {
    width: 200px;
    height: 200px;
    perspective: 300px;
    transform-style: preserve-3d;
    perspective-origin: 150% 150%;
    backface-visibility: visible;
    -moz-perspective: 300px;
    -moz-transform-style: preserve-3d;
    -moz-perspective-origin: 150% 150%;
    -moz-backface-visibility: visible;
    -webkit-perspective: 300px;
    -webkit-transform-style: preserve-3d;
    -webkit-perspective-origin: 150% 150%;
    -webkit-backface-visibility: visible
}

.front, .back, .top, .right, .left, .bottom{
    display: block;
    position: absolute;
    width: 100px;
    height: 100px;
    border: none;
    line-height: 100px;
    font-family: arial, sans-serif;
    font-size: 60px;
    color: white;
    text-align: center;
}
.front {

    background: rgba( 0, 0, 0, 0.3 );
    transform: translateZ( 50px );
    -moz-transform: translateZ( 50px );
    -webkit-transform: translateZ( 50px );
}

.back {
    background: rgba( 0, 255, 0, 1 );
    color: black;
    transform: rotateY( 180deg ) translateX( 50px );
    -moz-transform: rotateY( 180deg )  translateZ( 50px );
    -webkit-transform: rotateY( 180deg )  translateZ( 50px );
}

.right {
    background: rgba( 196, 0, 0, 0.7 );
    transform: rotateY( 90deg ) translateZ( 50px );
    -moz-transform: rotateY( 90deg ) translateZ( 50px );
    -webkit-transform: rotateY( 90deg ) translateZ( 50px );
}

.left {
    background: rgba( 0, 0, 196, 0.7 );
    transform: rotateY( -90deg ) translateZ( 50px );
    -moz-transform: rotateY( -90deg ) translateZ( 50px );
    -webkit-transform: rotateY( -90deg ) translateZ( 50px );
}

.top {
     background: rgba( 196, 196, 0, 0.7 );
     transform: rotateX( 90deg ) translateZ( 50px );
     -moz-transform: rotateX( 90deg ) translateZ( 50px );
     -webkit-transform: rotateX( 90deg ) translateZ( 50px );

}

.bottom {
    background: rgba( 196, 0, 196, 0.7);
    transform: rotateX( -90deg ) translateZ( 50px );
    -moz-transform: rotateX( -90deg ) translateZ( 50px );
    -webkit-transform: rotateX( -90deg ) translateZ( 50px );
}
.backface_hidden{
    backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-backface-visibility: hidden
}
.p1{position: absolute;right: 0;top: 0px;font-size: 25px;color: blue}
.p2{position: absolute;right: 0;top: 200px;font-size: 25px}
    </style>
</head>
<body>
<div class="container">
    <div class="cube">
        <div class="front">1</div>
        <div class="back">2</div>
        <div class="right">3</div>
        <div class="left">4</div>
        <div class="top">5</div>
        <div class="bottom">6</div>
    </div>
    <p class="p1">backface-visibility: visible;</br>visible为默认值</p> 
    <div class="cube">
        <div class="front">1</div>
        <div class="back backface_hidden">2</div>
        <div class="right ">3</div>
        <div class="left backface_hidden">4</div>
        <div class="top backface_hidden">5</div>
        <div class="bottom">6</div>
    </div>
    <p class="p2">backface-visibility: hidden;</br>面2，4，5的设置值为hidden</p>    
</div>
</body>
</html>
```

## 三、资料

### 代码下载 [点击下载](http://www.sinsy.top/hungry/learn/css3/3d/backface&style.zip)
