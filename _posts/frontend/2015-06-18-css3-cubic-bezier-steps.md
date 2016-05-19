---
layout: post
title: css3 transition-timing-function之 Cubic-bezier与Steps详解
date:   2015-06-18 11:02:15 +0800
category: 前端
tags: [css]
---
本章主要详细讲讲transition-timing-function中的cubic-bezier与steps,而上文所讲的linear，ease， ease-in，ease-out 和 ease-in-out都是基于cubic-bezier。

**语法**

```
div1 {transition-timing-function: step-start;}
div2 {transition-timing-function: cubic-bezier(0,0,1,1);}
```

## 一、Cubic-bezier()

Cubic-bezier()是三阶贝塞尔曲线，那什么是贝塞尔曲线呢？我们在绘图软件如ps和ai中会经常看到他的身影————“钢笔工具”，是应用于二维图形应用程序的数学曲线。贝赛尔线由线段与节点组成，节点是可拖动的支点，线段像可伸缩的皮筋。对于贝塞尔曲线有兴趣的朋友们可以通过[“贝塞尔曲线初探”](http://www.cnblogs.com/jay-dong/archive/2012/09/26/2704188.html)一文进行了解。我们继续讲Cubic-bezier()，三阶贝赛尔曲线由四个点 P0，P1， P2， P3组成，如下图，P0  和 P3是曲线的起点和终点，在css中这些点是固定的坐标比例（横坐标是时间比，纵坐标是输出范围比）。 P0 (0,0)代表初始时间和初始状态， P3(1,1)代表结束时间和结束状态。
![css3-cubic-bezier](http://7xtflp.com1.z0.glb.clouddn.com/css3-cubic-bezier.png "css3-cubic-bezier")
不是所有的三阶贝塞尔曲线都适合timing-function，例如曲线给定的横坐标有0或1个值。首先P0和P3必须是固定值，然后P1和P2的横坐标X值在[0,1],如果P1和P2的值。如果纵坐标Y值超过[0,1]会产生一个反弹的效果。当你定义了一个无效的cubic-bezier，css会忽略掉整个属性。看图对比正常的cubic-bizier与超出范围的cubic-bezier。

<iframe src="http://www.sinsy.top/hungry/learn/css3/transition/cubic_bezier.html" frameborder="0" width="100%"></iframe>

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style> 
div
{
width:100px;
height:50px;
background:rgb(51, 200, 100);
position: absolute;
left: 0;
color:white;
font-weight:bold;
font-size: 18px;
word-wrap: break-word;
transition:left 2s;
-moz-transition:left 2s; /* Firefox 4 */
-webkit-transition:left 2s; /* Safari and Chrome */
-o-transition:left 2s; /* Opera */
}

#div1 {transition-timing-function: cubic-bezier(0,0,1,1);}
#div2 {transition-timing-function: cubic-bezier(.38,1.45,.68,-1.33);}

/* Firefox 4: */
#div1 {-moz-transition-timing-function: cubic-bezier(0,0,1,1);}
#div2 {-moz-transition-timing-function: cubic-bezier(.38,1.45,.68,-1.33);}

/* Safari and Chrome: */
#div1 {-webkit-transition-timing-function: cubic-bezier(0,0,1,1);}
#div2 {-webkit-transition-timing-function: cubic-bezier(.38,1.45,.68,-1.33);}

/* Opera: */
#div1 {-o-transition-timing-function: cubic-bezier(0,0,1,1);}
#div2 {-o-transition-timing-function: cubic-bezier(.38,1.45,.68,-1.33);}

.btn{width: 100px;height: 50px;outline: none;border: none;font-size: 20px;color: white;margin-right: 10px;cursor: pointer;}
.pink{background: rgb(200, 100, 164);}
</style>
</head>
<body>
<div id="div1" style="top:20px">Y值在[0,1]范围内</div>
<div id="div2" style="top:80px">Y值超出[0,1]范围</div>
<script>
window.onload = function(){
    move();
}
function move(){
    if(div1.style.left == '400px'){
        div1.style.left = '0px'
        div2.style.left = '0px'
    }else{
        div1.style.left = '400px'
        div2.style.left = '400px'
    }
    setTimeout(move, 2500)
}
</script>
</body>
</html>
```

**语法**

```
cubic-bezier(x1, y1, x2, y2)
```

注：x1,y1,x2,y2分别为P1和P2的横坐标与纵坐标。

linear，ease， ease-in，ease-out 和 ease-in-out是transition-timing-function的默认值，现在来看看它们各自对应的贝塞尔曲线。

<table>
    <tr>
        <th>值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>linear</td>
        <td>规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。</td>
    </tr> 
    <tr>
        <td>ease</td>
        <td>规定慢速开始，然后变快，然后慢速结束的过渡效果（等于cubic-bezier(0.25,0.1,0.25,1)），默认值。</td>
    </tr>
    <tr>
        <td>ease-in</td>
        <td>规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。</td>
    </tr> 
    <tr>
        <td>ease-out</td>
        <td>规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。</td>
    </tr>       
    <tr>
        <td>ease-in-out</td>
        <td>规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。</td>
    </tr>
</table>

![css3-cubic-bezier2.png](http://7xtflp.com1.z0.glb.clouddn.com/css3-cubic-bezier2.png "css3-cubic-bezier2.png")
使用贝塞尔曲线，我们可以创建自定义的速度。但三阶贝塞尔曲线定义动画速度的缺点是不直观，我们不能立即看到物体如何移动。幸运的是，有一个工具，我们可以利用它来帮助我们设计并获取曲线，它由[Lea Verou](http://lea.verou.me/author/admin/)开发，工具[cubic-bezier.com](http://cubic-bezier.com/#.17,.67,.83,.67)。
![css3-cubic-bezier.com4.jpg](http://7xtflp.com1.z0.glb.clouddn.com/css3-cubic-bezier.com4.jpg "css3-cubic-bezier.com4.jpg")

## 二、Steps()
steps()定义了一个阶跃函数将输出值的域在等距的步骤。这类阶跃函数有时也被称为阶梯函数。

**语法**

```
steps(number_of_steps, direction)
```

<table>
    <tr>
        <th>值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>number_of_steps</td>
        <td>取正整数，代表等距离的步数，比如steps(2)，有两步，在规定的时间内完成两次相同距离的动作。</td>
    </tr>
    <tr>
        <td>direction</td>
        <td>是判断动作的左或右连续（默认值：end）。start：左连续，第一步发生在动画开始。end：右连续，最后一步发生在动画结束。</td>
    </tr>
</table>

![steps](http://7xtflp.com1.z0.glb.clouddn.com/css3-steps2.png "steps")

<iframe src="http://www.sinsy.top/hungry/learn/css3/transition/steps.html" frameborder="0" width="100%" height="250px"></iframe>

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
div
{
width:100px;
height:50px;
background:rgb(51, 200, 100);
position: absolute;
left: 0;
color:white;
font-weight:bold;
font-size: 18px;
word-wrap: break-word;
transition:left 2s;
}
#div1 {transition-timing-function: step-start;}
#div2 {transition-timing-function: step-end;}
#div3 {transition-timing-function: steps(4, end);}
#div4 {transition-timing-function: steps(4, start);}
.pink{background: rgb(200, 100, 164);}
</style>
</head>
<body>
<div id="div1" style="top:80px">step-start</div>
<div id="div2" style="top:140px">step-end</div>
<div id="div3" style="top:200px">steps(4,end)</div>
<div id="div4" style="top:260px">steps(4,start)</div>
<script>
    window.onload = function(){
        div1.style.left = '400px'
        div2.style.left = '400px'
        div3.style.left = '400px'
        div4.style.left = '400px'
    }
</script>
</body>
</html>
```

本章结束，在写这几篇博文时真心挖到了不少外国好网站，资料详细，内容齐全，除了语言是英语，难懂了点，但要想在前端走得更远，学会看外国技术文档是一项必修课。今后一定要努力学好英语，在语言上吃大亏了。

### 参考文档
* [Using CSS transitions](http://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions)
* [A Look Into: Cubic-bezier in CSS3 Transition](http://www.hongkiat.com/blog/css-cubic-bezier/)
* [LEA VEROU博客](http://lea.verou.me/)

### 代码下载
* [点击下载transition-timing-function.zip](http://www.sinsy.top/hungry/learn/css3/transition/transition-timing-function.zip)




