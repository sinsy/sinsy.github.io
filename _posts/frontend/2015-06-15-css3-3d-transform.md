---
layout: post
title: css3变形 3D Transform分析
date:   2015-06-15
category: 前端
tags: [css]
---
继续上一篇2D转换，我们来分析3D转换，突然发现要自己组织语言来写博客真的是一件困难的事，第一篇博客就花费了我两天的时间了，语言表达能力还是欠缺了点，发完牢骚进入主题吧。3D(XYZ)在2D(XY)的基础上又增加了一条Z轴，虽说只是增加了一条线，但复杂度可是大大的提升了。
![3d](http://7xtflp.com1.z0.glb.clouddn.com/css3-transform-3d-axes.png "3d")

### 3D所有的转换属性：
<table>
    <tr>
        <th>属性</th>
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
    <tr>
        <td>transform-style</td>
        <td>规定被嵌套元素如何在 3D 空间中显示。</td>
    </tr>
    <tr>
        <td>perspective</td>
        <td>规定 3D 元素的透视效果。</td>
    </tr>
    <tr>
        <td>perspective-origin</td>
        <td>规定 3D 元素的底部位置。</td>
    </tr>
    <tr>
        <td>backface-visibility</td>
        <td>定义元素在不面对屏幕时是否可见。</td>
    </tr>
</table>

### 3D transform方式：
* translate(平移)
* rotate(旋转)
* scale(缩放)
* matrix(矩阵，本节不讲，押后详细分析)
* perspective(透视)

## 一、translate

<table>
    <tr>
        <td>translate3d(x,y,z)</td>
        <td>定义 3D 转化。transform:translate3d(300px, 300px, 0px);</td>
    </tr>
    <tr>
        <td>translateX(x)</td>
        <td>定义 3D 转化，仅使用用于 X 轴的值。transform:translateX(300px);</td>
    </tr>
    <tr>
        <td>translateY(y)</td>
        <td>定义 3D 转化，仅使用用于 Y 轴的值。transform:translateY(300px);</td>
    </tr>
    <tr>
        <td>translateZ(z)</td>
        <td>定义 3D 转化，仅使用用于 Z 轴的值。transform:translateZ(300px);</td>
    </tr>
</table>

translateX与translateY的用法跟在2D的相似，translateZ稍有不同，一定要先设置perspective属性才能看见效果，现在先引入perspective(透视)这一概念。

perspective 属性定义 <b>3D 元素距视图的距离</b>，以像素计。该属性允许您改变 3D 元素查看 3D 元素的视图。当为元素定义 perspective 属性时，<b>其子元素会获得透视效果</b>，而不是元素本身。

![3d](http://7xtflp.com1.z0.glb.clouddn.com/css3-transform-translate3d1.png "3d")

```
<!DOCTYPE html>
<html>
<head>
    <title>translate3d</title>
    <style>
    .content{width: 400px;height: 400px;margin: 120px auto 0;position: relative;word-wrap:break-word;border: 1px solid red;
    }
    .content div{font-size: 20px; position: absolute;top: 0;left: 0;width: 100px;height: 100px;background: #FFCC66;color: white;border:1px solid black;}
    .content{perspective: 1500px;/*perspective-origin:300px 300px;*/}
    #translate3d{transform:translate3d(300px, 300px, 0px);}
    #translate3d2{transform:translate3d(300px, 300px, 300px);}
    #translate3dX{transform:translateX(300px);}
    #translate3dY{transform:translateY(300px);}
    #translate3dZ{transform:translateZ(300px);}
    #translate3d1{transform:translate3d(0,0,0px);}
    </style>
 
</head>
<body>
    <div class="content">
        <div id="translate3d1">马上玩</div>
        <div id="translate3d">马上玩translate3d(300px, 300px, 0px)</div>
        <div id="translate3d2">马上玩translate3d(300px, 300px, 300px)</div>
        <div id="translate3dX">马上玩translateX(300px)</div>
        <div id="translate3dY">马上玩translateY(300px)</div>
        <div id="translate3dZ">马上玩translateZ(300px)</div>
    </div>
</body>
</html>
```

现在来看看perspective值改变时，translateZ的位置变换状况：
![3d2](http://7xtflp.com1.z0.glb.clouddn.com/css3-transform-translate3d2.png "3d2")

上图中的perspective值分别为1500px、800px、500px，即镜头距离元素表面的位置分别是1500px、800px、500px。距离越小，看到的图像就越大。

设perspective值为1500px，perspective-origin值不同时，tranlateZ的位置变换情况：

![3d3](http://7xtflp.com1.z0.glb.clouddn.com/css3-transform-translate3d3.png "3d3")

可以看到当perspective-origin不同时，最上面的方框位置也会不同，我们可以通过画线的方式来更好的理解perspective-origin。

```
div
{
perspective:1500px;
perspective-origin: -50px -50px;
-webkit-perspective:1500px; /* Safari 和 Chrome */
-webkit-perspective-origin: -50px -50px;    /* Safari 和 Chrome */
}
```

`
浏览器支持：目前浏览器都不支持 perspective，perspective-origin 属性。Chrome 和 Safari 支持替代的 -webkit-perspective，-webkit-perspecitve-origin 属性。
perspective还有另一种写法transform: perspective(200px) translateZ(300px);但一定要写在第一个，否则没效果。
`

## 二、rotate

<table>
    <tr>
        <td>rotate3d(x,y,z,angle)</td>
        <td>定义 3D 旋转。</td>
    </tr>
    <tr>
        <td>rotateX(angle)</td>
        <td>定义沿 X 轴的 3D 旋转。</td>
    </tr>
    <tr>
        <td>rotateY(angle)</td>
        <td>定义沿 Y 轴的 3D 旋转。</td>
    </tr>
    <tr>
        <td>rotateZ(angle)</td>
        <td>定义沿 Z 轴的 3D 旋转。</td>
    </tr>
</table>
这个跟2D平面的rotate可是真心不同啊，你要用3D的思维去看待它，先看看他们在一个立方体的三条边上摆什么姿势。

<iframe src="http://www.sinsy.top/hungry/learn/css3/3d/rotate3D_animate.html" frameborder="0" width="100%" height="450px"></iframe>

看了上图应该可以比较清晰的瞧出三者的差异了吧，现在详细的讲讲他们的用法，继续涨姿势吧。

<iframe src="http://www.sinsy.top/hungry/learn/css3/3d/rotate3D_easy.html" frameborder="0" width="100%" height="300px"></iframe>

1、2图为rotateX(45deg)  rotateX( 135deg)，3、4图为rotateY(45deg)  rotateY(135deg)，5、6图为rotateZ(45deg)  rotateZ(135deg)

```
<!DOCTYPE html>
<html>
<head>
    <title>rotate3D_easy</title>
    <style>
    .content{
        width: 1200px;
        height: 300px;
        margin: 80px auto 0;
        position: relative;
    }
    .rotateX45{
        transform:rotateX(45deg);
    }
    .rotateX135{
        transform:rotateX(135deg);
    }
    .rotateY45{
        transform:rotateY(45deg);
    }
    .rotateY135{
        transform:rotateY(135deg);
    }
    .rotateZ45{
        transform:rotateZ(45deg);
    }
    .rotateZ135{
        transform:rotateZ(135deg);
    }
    .rotate_box{width: 100px;height: 100px;font-size: 25px;position: absolute;word-wrap:break-word;}
    .yellow{background: #FFCC66;}
    .border{border:1px solid  #0099FF}
    .left200{left:150px;}
    .left400{left: 350px;}
    .left600{left: 500px;}
    .left800{left: 700px;}
    .left1000{left: 850px;}
    </style>
</head>
<body>
    <div class="content content1">
        <div class="rotate_box border opacity1"></div>
        <div class="rotate_box rotateX45 yellow">rotateX(45deg)</div>
 
        <div class="rotate_box border left200 opacity1"></div>
        <div class="rotate_box yellow rotateX135 left200">rotateX(135deg)</div>
 
        <div class="rotate_box border left200 opacity1 left400"></div>
        <div class="rotate_box yellow rotateY45 left400">rotateY(45deg)</div>
 
        <div class="rotate_box border left200 opacity1 left600"></div>
        <div class="rotate_box yellow rotateY135 left600">rotateY(135deg)</div>
 
        <div class="rotate_box border left200 opacity1 left800"></div>
        <div class="rotate_box yellow rotateZ45 left800">rotateZ(45deg)</div>
 
        <div class="rotate_box border left200 opacity1 left1000">马上玩</div>
        <div class="rotate_box yellow rotateZ135 left1000">rotateZ(135deg)</div>
    </div>
 
</body>
</html>
```

上面讲解了rotateX，rotateY，rotateZ的用法，而rotate3d是三者的缩写，在这里就不详细介绍了有兴趣了解的朋友们可以点击以下链[http://www.sinsy.top/hungry/learn/css3/3d/rotate3D_combine.html](http://www.sinsy.top/hungry/learn/css3/3d/rotate3D_combine.html)

## 三、scale

<table>
    <tr>
        <td>scale3d(x,y,z)</td>
        <td>定义 3D 缩放转换。</td>
    </tr>
    <tr>
        <td>scaleX(x)</td>
        <td>定义 3D 缩放转换，通过给定一个 X 轴的值。</td>
    </tr>
    <tr>
        <td>scaleY(y)</td>
        <td>定义 3D 缩放转换，通过给定一个 Y 轴的值。</td>
    </tr>
    <tr>
        <td>scaleZ(z)</td>
        <td>定义 3D 缩放转换，通过给定一个 Z 轴的值。</td>
    </tr>
</table>

<iframe src="http://www.sinsy.top/hungry/learn/css3/3d/scale3d.html" frameborder="0" width="100%" height="400px"></iframe>

scaleX与scaleY可以跟2D平面的差不多，但是scaleZ需要定义perspective和rotate才可以显示出来。

```
<!DOCTYPE html>
<html>
<head>
    <title>scale3D</title>
    <meta charset="utf8">
    <style>
    .content{width: 1200px;height: 300px;margin: 80px auto 0;position: relative;
    }
    .content{perspective: 800px;}
    .scale_box{font-size: 20px; position: absolute;top: 0;left: 0;width: 100px;height: 100px;}
    #scale3dX{transform:scaleX(2);}
    #scale3dX1{transform:scaleX(0.6);}
    #scale3dY{transform:scaleY(2);}
    #scale3dY1{transform:scaleY(0.6);}
    #scale3dZ_first{transform:scaleZ(1) rotateY(40deg);}/*scaleZ单独使用无效果，须加上rotate和perspective*/
    #scale3dZ{transform:scaleZ(4) rotateY(40deg);}/*scaleZ单独使用无效果，须加上rotate和perspective*/
    #scale3d{transform:scale3d(2,2,2) rotateY(40deg);}
    .yellow{background: #FFCC66;}
    .left200{left:200px;}
    .left400{left: 400px;}
    .left550{left: 550px;}
    .left700{left: 700px;}
    .left900{left: 900px}
    .top170{top: 170px}
    </style>
</head>
<body>
    <div class="content">
        <div class="scale_box yellow">马上玩</div>
        <div id="scale3dX" class="scale_box yellow left200">马上玩scaleX(2)</div>
        <div id="scale3dX1" class="scale_box yellow left400">马上玩scaleX(0.6)</div>
 
        <div id="scale3dY" class="scale_box yellow left550">马上玩scaleY(2)</div>
        <div id="scale3dY1" class="scale_box yellow left700">马上玩scaleY(0.6)</div>
        <div id="scale3d" class="scale_box yellow left900">马上玩scale3d(2,2,2)</div>
 
        <div id="scale3dZ_first" class="scale_box yellow top170">马上玩scaleZ(2)</div>
        <div id="scale3dZ" class="scale_box yellow left200 top170">马上玩scaleZ(2)</div>
    </div>
</body>
</html>
```

## 四、资料

### 代码下载
[点击下载](http://www.sinsy.top/hungry/learn/css3/3d/transform3d.zip)


