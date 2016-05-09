---
layout: post
title: css3过渡 transition分析
date:   2015-06-16 16:02:15 +0800
category: 前端
tags: [css]
---

transition 属性是一个简写属性，用于设置四个过渡属性。
<table>
	<tr>
		<th>值</th>
		<th>描述</th>
	</tr>
	<tr>
		<td>transition-property</td>
		<td>规定设置过渡效果的 CSS 属性的名称。</td>
	</tr>
	<tr>
		<td>transition-duration</td>
		<td>规定完成过渡效果需要多少秒或毫秒。</td>
	</tr>
	<tr>
		<td>transition-timing-function</td>
		<td>规定速度效果的速度曲线。</td>
	</tr>
	<tr>
		<td>transition-delay</td>
		<td>定义过渡效果何时开始。</td>
	</tr>
</table>

**语法**

```
transition: property duration timing-function delay;
```

**浏览器支持**

Internet Explorer 10、Firefox、Opera 和 Chrome 支持 transition 属性。Safari 支持替代的 -webkit-transition 属性。
注释：Internet Explorer 9 以及更早版本的浏览器不支持 transition 属性。

## 一、动画例子

### 1.单个动画属性的例子

<iframe src="https://www.sinsy.top/hungry/learn/css3/transition/property_single.html" frameborder="0" width="100%"></iframe>

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
div{
width:100px;
height:100px;
background:blue;
transition:width 2s;
-moz-transition:width 2s; /* Firefox 4 */
-webkit-transition:width 2s; /* Safari and Chrome */
-o-transition:width 2s; /* Opera */
}
div:hover{
width:300px;
}
</style>
</head>
<body>
<div></div>
<p>请把鼠标指针移动到蓝色的 div 元素上，就可以看到过渡效果。</p>
<p><b>注释：</b>本例在 Internet Explorer 中无效。</p>
</body>
</html>

```

### 2.多个动画属性的例子

<iframe src="https://www.sinsy.top/hungry/learn/css3/transition/property_multiple.html" frameborder="0" width="100%" height="200px"></iframe>

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
.box {
    border-style: solid;
    border-width: 1px;
    display: block;
    width: 100px;
    height: 100px;
    background-color: #0000FF;
    -webkit-transition:width 2s, height 2s, background-color 2s, -webkit-transform 2s;
    transition:width 2s, height 2s, background-color 2s, transform 2s;
}
.box:hover {
    background-color: #FFCCCC;
    width:200px;
    height:200px;
    -webkit-transform:rotate(180deg);
    transform:rotate(180deg);
}
</style>
</head>
<body>
 
    <p>蓝色的div包含了 transition属性 : width, height, background-color, transform. 移动到该div,就可以看到该效果</p>
    <div class="box"></div>
 
</body>
</html>
```
看过以上两个例子，相信大家对transition应该有了一定的了解，现在我们再来看看四个过渡属性的详细用法。

## 二、过渡属性详解

### 1. transition-property
transition-property 属性规定应用过渡效果的 CSS 属性的名称。（当指定的 CSS 属性改变时，过渡效果将开始）。点击查看[可以设置过渡效果的 CSS 属性列表](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)。

`
提示：过渡效果通常在用户将鼠标指针浮动到元素上时发生。
注释：请始终设置 transition-duration 属性，否则时长为 0，就不会产生过渡效果。
`

**语法**

```
transition-property: none|all|property;
```

```
<!DOCTYPE html>
<html>
<head>
<style>
div
{
width:100px;
height:100px;
background:blue;
transition-property: width;
transition-duration: 2s;
-moz-transition-property: width; /* Firefox 4 */
-moz-transition-duration: 2s; /* Firefox 4 */
-webkit-transition-property: width; /* Safari and Chrome */
-webkit-transition-duration: 2s; /* Safari and Chrome */
-o-transition-property: width; /* Opera */
-o-transition-duration: 2s; /* Opera */
}
div:hover
{
width:300px;
}
</style>
</head>
<body>
<div></div>
<p>请把鼠标指针移动到蓝色的 div 元素上，就可以看到过渡效果。</p>
<p><b>注释：</b>本例在 Internet Explorer 中无效。</p>
</body>
</html>
```

### 2.transition-duration
transition-duration 属性规定完成过渡效果需要花费的时间（以秒或毫秒计）。

**语法**

```
transition-duration: time;
```

<iframe src="https://www.sinsy.top/hungry/learn/css3/transition/duration_animate.html" frameborder="0" width="100%" height="450px"></iframe>

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body{font-size: 20px;}
div{
width:100px;
height:100px;
background:rgb(51, 200, 100);
transition-property:width;
-moz-transition-property: width; /* Firefox 4 */
-webkit-transition-property:width; /* Safari 和 Chrome */
-o-transition-property:width; /* Opera */
 
}
.div1{
transition-duration: 1s;
-moz-transition-duration: 1s; /* Firefox 4 */
-webkit-transition-duration: 1s; /* Safari 和 Chrome */
-o-transition-duration: 1s; /* Opera */
}
.div1:hover{
    width: 400px;
}
</style>
</head>
<body>
<p>transition-duration:1s</p>
<div class="div1" id="div1">1s</div>
<p>请把鼠标指针移动到蓝色的 div 元素上，就可以看到过渡效果。</p>
</body>
</html>

```

### 3.transition-timing-function

transition-timing-function 属性规定过渡效果的速度曲线。该属性允许过渡效果随着时间来改变其速度。

**语法**

```
transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n)|steps(number_of_steps, direction);
```
在这里我们只是讲讲用法和运动曲线的差异，不深入探讨，想要跟深入了解各个运动曲线的可以狠狠点击链接[css3 transition-timing-function之 Cubic-bezier与Steps详解](http://www.sinsy.top/2015-06-18-css3-cubic-bezier-steps/)

<iframe src="https://www.sinsy.top/hungry/learn/css3/transition/timing_function.html" frameborder="0" width="100%" height="450px"></iframe>

```
<!DOCTYPE html>
<html>
<head>
<style>
div
{
width:100px;
height:50px;
margin-bottom: 10px;
background:rgb(51, 200, 100);
color:white;
font-weight:bold;
font-size: 18px;
word-wrap: break-word;
transition:width 2s;
-moz-transition:width 2s; /* Firefox 4 */
-webkit-transition:width 2s; /* Safari and Chrome */
-o-transition:width 2s; /* Opera */
}
#div1 {transition-timing-function: linear;}
#div2 {transition-timing-function: ease;}
#div3 {transition-timing-function: ease-in;}
#div4 {transition-timing-function: ease-out;}
#div5 {transition-timing-function: ease-in-out;}
#div6 {transition-timing-function: step-end;}
#div7 {transition-timing-function: steps(4,end);}
div:hover
{
width:400px;
}
</style>
</head>
<body>
<div id="div1" style="top:100px">linear</div>
<div id="div2" style="top:150px">ease</div>
<div id="div3" style="top:200px">ease-in</div>
<div id="div4" style="top:250px">ease-out</div>
<div id="div5" style="top:300px">ease-in-out</div>
<div id="div6" style="top:400px">steps-end</div>
<div id="div7" style="top:450px">steps(4,end)</div>
<p>请把鼠标指针移动到绿色的 div 元素上，就可以看到过渡效果。</p>
<p><b>注释：</b>本例在 Internet Explorer 中无效。</p>
<button class="btn pink" id="start">开始</button>
<button class="btn" id="stop_btn">停止</button>
</body>
</html>
```

### 4.transition-delay
transition-delay 属性规定过渡效果何时开始（以秒或毫秒计）。

**语法**

```
transition-delay: time;
```
<iframe src="https://www.sinsy.top/hungry/learn/css3/transition/delay_animate.html" frameborder="0" width="100%" height="450px"></iframe>

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body{font-size: 20px;}
div{
width:100px;
height:100px;
background:rgb(51, 200, 100);
transition-property:width;
-moz-transition-property: width; /* Firefox 4 */
-webkit-transition-property:width; /* Safari 和 Chrome */
-o-transition-property:width; /* Opera */
 
}
.div1{
transition-delay: 2s;
-moz-transition-delay: 2s; /* Firefox 4 */
-webkit-transition-delay: 2s; /* Safari 和 Chrome */
-o-transition-delay: 2s; /* Opera */
}
.div1:hover{
width: 200px;
}
</style>
</head>
<body>
<p>transition-delay:2s</p>
<div class="div1" id="div1">2s</div>
<p>请把鼠标指针移动到蓝色的 div 元素上，就可以看到过渡效果。</p>
<p>注释：过渡效果会在开始前等待两秒钟。</p>
</body>
</html>
```

本章完结，注意：由于要减少篇幅，有些浏览器前缀在代码里直接省去，自己动手写时一定要补全哦。

## 三、资料

### 1.参考文档
[Using CSS transitions](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions)

### 2.代码下载
[点击下载](https://www.sinsy.top/hungry/learn/css3/transition/transition-analyse.zip)
