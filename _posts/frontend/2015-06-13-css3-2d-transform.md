---
layout: post
title: css3变形 2D Transform分析
date:   2015-06-13
category: 前端
tags: [css]
---
这几天一直在集中火力研究css3动画，现在分享一下这几天的成果吧。 
首先先从2D入手，转换属性：
<table>
    <tr>
        <th>值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>transform</td>
        <td>向元素应用 2D 或 3D 转换。</td>
    </tr>
    <tr>
        <td>transform-origin</td>
        <td>允许你改变被转换元素的位置。</td>
    </tr>
</table>

### 2D transform方式

* translate(平移)
* rotate(旋转)
* scale(缩放)
* skew(倾斜)
* matrix(矩阵，本节不讲，押后详细分析)

现在来个永恒的话题——浏览器支持
![browser suport](http://7xtflp.com1.z0.glb.clouddn.com/css3-transform-browser-support.png "browser surport")    

```
/*Internet Explorer 10、Firefox 以及 Opera 支持 transform 属性。
Chrome 和 Safari 需要前缀 -webkit-。
注释：Internet Explorer 9 需要前缀 -ms-。*/

div {
transform: rotate(30deg); 
-ms-transform: rotate(30deg); /* IE 9 */ 
-webkit-transform: rotate(30deg); /* Safari and Chrome */ 
-o-transform: rotate(30deg); /* Opera */ 
-moz-transform: rotate(30deg); /* Firefox */ 
}
```

开始进入正题吧！！！！

## 一、translate
<table>
    <tr>
        <td>translate(x,y)</td>
        <td>定义 2D 转换，沿着 X 和 Y 轴移动元素。transform:translate(300px,300px);</td>
    </tr>
    <tr>
        <td>translateX(n)</td>
        <td>定义 2D 转换，沿着 X 轴移动元素。transform:translateX(300px);</td>
    </tr>
    <tr>
        <td>translateY(n)</td>
        <td>定义 2D 转换，沿着 Y 轴移动元素。transform:translateY(300px);</td>
    </tr>
</table>
<iframe src="http://www.sinsy.top/hungry/learn/css3/2d/translate.html" frameborder="0" width="100%" height="450px"></iframe>
点X、Y、XY、O的初始位置为(0,0)，所以平移后的情况可相对于“点O”的位置来观看，X向右平移去整数，X向左平移取负数，Y向下取整数，Y向上取负数。

```
<!DOCTYPE html>
<html>
<head>
    <title>translate</title>
    <meta charset="utf-8">
    <style>
    .bg_2d{
        width: 400px;height: 400px;background: url(../img/xy.png) no-repeat;background-size:400px auto;position: relative;
    }
    .two_d_p{font-size: 60px; position: absolute;top: 0;left: 0}
    #translate{
        transform:translate(200px,200px);
        -ms-transform:translate(200px,200px);
        -webkit-transform:translate(200px,200px);
        -o-transform:translate(200px,200px);
        -moz-transform:translate(200px,200px);}
    #translateX{
        transform:translateX(200px);
        -ms-transform:translateX(200px);
        -webkit-transform:translateX(200px);
        -o-transform:translateX(200px);
        -moz-transform:translateX(200px);}
    #translateY{
        transform:translateY(200px);
        -ms-transform:translateY(200px);
        -webkit-transform:translateY(200px);
        -o-transform:translateY(200px);
        -moz-transform:translateY(200px);}
    .fs16{font-size: 16px;vertical-align: middle;}
    </style>
</head>
<body>
    <div class="bg_2d">
     <div id="" class="two_d_p">O<span class="fs16">[原点]</span></div>
     <div id="translate" class="two_d_p">XY<span class="fs16">[x平移200px,y平移200px]</span></div>
     <div id="translateX" class="two_d_p">X<span class="fs16">[x平移200px]</span></div>
     <div id="translateY" class="two_d_p">Y<span class="fs16">[y平移200px]</span></div>
    </div>
</body>
</html>
```

## 二、rotate

<table>
    <tr>
        <td>rotate(angle)</td>
        <td>定义 2D 旋转，在参数中规定角度。transform:rotate(45deg);</td>
    </tr>
</table>
rotate 顺时针旋转为正数，逆时针旋转为负数，下图以45°、90°、135°、180°、225°、270°、315°来旋转，请看图片。
![css3-transform-rotate1](http://7xtflp.com1.z0.glb.clouddn.com/css3-transform-rotate1.png "css3-transform-rotate1")
现在要引入新的属性transform-origin， 它允许你改变被转换元素的位置，下图中的小黄点为transform-origin的位置，数值分别为默认值(50%,50%) (0%,0%) (50%,0%) (100%,0%) (0%, 100%) (50%,100%) (100%,100%)，它可以设置为整数或负数喔！
![css3-transform-rotate2](http://7xtflp.com1.z0.glb.clouddn.com/css3-transform-rotate2.png "css3-transform-rotate2")

给出上图的部分代码，若要下载整个文件可在文在结尾处点击链接。

```
<!DOCTYPE html>
<html>
<head>
    <title>rotate</title>
    <style>
    .content{
        width: 1200px;
        height: 300px;
        margin: 80px auto 0;
        position: relative;
    }
        .rotate_box{width: 100px;height: 100px;font-size: 25px;position: absolute;opacity: 0.8}
    .opacity1{opacity: 1}
    .rotate45{
        transform:rotate(45deg);
        -ms-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
    }
    .leftTop{
        transform-origin:0% 0%;
        -ms-transform-origin: 0% 0%;
        -webkit-transform-origin: 0% 0%;
        -moz-transform-origin: 0% 0%;
        -o-transform-origin:0% 0%;
    }
    .blue{background: #0099FF}
    .pink{background: #CC6699;}
    </style>
</head>
<body>
    <div class="content">
        <div class="rotate_box blue opacity1">马上玩</div>
        <div class="rotate_box pink rotate45 left200 leftTop">马上玩(0%，0%)</div>
    </div>
</body>
</html>
```

## 三、scale

<table>
    <tr>
        <td>scale(x,y)  </td>
        <td>定义 2D 缩放转换，改变元素的宽度和高度。transform: scale(2,2);</td>
    </tr>
    <tr>
        <td>scaleX(n)</td>
        <td>定义 2D 缩放转换，改变元素的宽度。transform: scaleX(2);</td>
    </tr>
    <tr>
        <td>scaleY(n)</td>
        <td>定义 2D 缩放转换，改变元素的高度。transform: scaleY(2);</td>
    </tr>
</table>

scale可以根据所给的值进行放大与缩小，绝对值小于1——缩小，绝对值大于1——放大。当值为负数是会颠倒，如第四个图。
![scale](http://7xtflp.com1.z0.glb.clouddn.com/css3-transform-scale.png "scale")

```
<!DOCTYPE html>
<html>
<head>
    <title>rotate</title>
    <style>
    .content{width: 1200px;height: 300px;margin: 80px auto 0;position: relative;
    }
    .scale_box{font-size: 20px; position: absolute;top: 0;left: 0;width: 100px;height: 100px}
    #scale2{transform: scale(0.8,0.8);}
    #scale3{transform: scale(-2,-2);}
    #scale{transform: scale(2,2);}
    #scaleX{transform: scaleX(2);}
    #scaleY{transform: scaleY(2);}
    .yellow{background: #FFCC66;}
    .left200{left:150px;}
    .left400{left: 350px;}
    .left600{left: 600px;}
    .left800{left: 830px;}
    .left1000{left: 1000px}
    </style>
</head>
<body>
    <div class="content">
        <div class="scale_box yellow">马上玩</div>
        <div id="scale2" class="scale_box yellow left200">马上玩scale(0.8,0.8)</div>
        <div id="scale" class="scale_box yellow left400">马上玩scale(2,2)</div>
        <div id="scale3" class="scale_box yellow left600">马上玩scale(-2,-2)</div>
        <div id="scaleX" class="scale_box yellow left800">马上玩scaleX(2)</div>
        <div id="scaleY" class="scale_box yellow left1000">马上玩scaleY(2)</div>
    </div>
</body>
</html>
```

## 四、skew

<table>
    <tr>
        <td>skew(x-angle,y-angle)</td>
        <td>定义 2D 倾斜转换，沿着 X 和 Y 轴。</td>
    </tr>
    <tr>
        <td>skewX(angle)</td>
        <td>定义 2D 倾斜转换，沿着 X 轴。</td>
    </tr>
    <tr>
        <td>skewY(angle)</td>
        <td>定义 2D 倾斜转换，沿着 Y 轴。</td>
    </tr>
</table>
skew根据所给的值对元素进行倾斜变换，数值在[-180°,180°]，当值为skewX(90deg)、skewY(90deg)、skew(45deg,45deg)时，消失不见。假设skewX(45deg)，玫红方框沿着X轴的方向走变成绿色的透明框。
![skew](http://7xtflp.com1.z0.glb.clouddn.com/css3-transform-skew.png "skew")

```
<!DOCTYPE html>
<html>
<head>
    <title>skew</title>
    <style>
    .content{width: 1200px;height: 300px;margin: 80px auto 0;position: relative;
    }
    .content>div{transform-origin:0% 0%;}
    .skew_box{font-size: 20px; position: absolute;top: 0;left: 0;width: 100px;height: 100px}
    #skew{transform:skew(40deg, 40deg);}
    #skew2{transform:skew(140deg, 140deg);}
    #skewX{transform:skewX(45deg);}
    #skewX2{transform:skewX(145deg);}
    #skewY{transform:skewY(45deg);}
    #skewY2{transform:skewY(145deg);}
    .green{background: #00CC99;opacity: 0.8}
    .pink{background: #CC6699;}
    .left200{left:180px;}
    .left450{left: 400px;}
    .left600{left: 600px;}
    .left800{left: 830px;}
    .left1000{left: 1000px}
    .top150{top: 280px;}
    </style>
</head>
<body>
    <div class="content">
            <div id="" class="skew_box pink">马上玩</div>
            <div id="" class="skew_box pink left200">马上玩</div>
            <div id="" class="skew_box pink left450">马上玩</div>
            <div id="" class="skew_box pink left600">马上玩</div>
            <div id="skewX" class="skew_box green left200">马上玩skewX(45deg)</div>
            <div id="skewY" class="skew_box green left450">马上玩skewY(45deg)</div>
            <div id="skew" class="skew_box green left600">马上玩</div>
 
            <div id="" class="skew_box pink top150">马上玩</div>
            <div id="" class="skew_box pink top150 left200">马上玩</div>
            <div id="" class="skew_box pink top150 left450">马上玩</div>
            <div id="" class="skew_box pink top150 left600">马上玩</div>
            <div id="skew2" class="skew_box green left600 top150">马上玩</div>
            <div id="skewX2" class="skew_box green left200 top150">马上玩skewY(145deg)</div>
            <div id="skewY2" class="skew_box green left450 top150">马上玩skewX(145deg)</div>
 
    </div>
</body>
</html>
```

## 五、多个属性

```
transform: rotate(45deg) scale(0.5) skew(30deg, 30deg) translate(100px, 100px);
```

## 六、资料

### 代码下载
[点击下载](https://www.sinsy.top/hungry/learn/css3/2d/transform2d.zip)