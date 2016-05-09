---
layout: post
title: css3 animation动画分析
date:   2015-06-23 11:02:15 +0800
category: 前端
tags: [css]
---
animation 属性是一个简写属性，用于设置六个动画属性：
<table>
    <tr>
        <th>属性</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>animation-name</td>
        <td>规定需要绑定到选择器的 keyframe 名称。</td>
    </tr>
    <tr>
        <td>animation-duration</td>
        <td>规定完成动画所花费的时间，以秒或毫秒计。</td>
    </tr>
    <tr>
        <td>animation-timing-function</td>
        <td>规定动画的速度曲线。可参考</td>
    </tr>
    <tr>
        <td>animation-delay</td>
        <td>规定在动画开始之前的延迟。</td>
    </tr>
    <tr>
        <td>animation-iteration-count</td>
        <td>规定动画应该播放的次数。</td>
    </tr>
    <tr>
        <td>animation-direction</td>
        <td>规定是否应该轮流反向播放动画。</td>
    </tr>
</table>

语法

```
animation: name duration timing-function delay iteration-count direction;
```


## 一、animation-name
为 @keyframes 动画规定一个名称：
<iframe src="https://www.sinsy.top/hungry/learn/css3/animation/animation-name.html" frameborder="0" width="100%" height="150px"></iframe>

