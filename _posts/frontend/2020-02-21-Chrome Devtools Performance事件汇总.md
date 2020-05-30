---
layout: post
title: Chrome Devtools Performance事件汇总
date: 2020-02-21
category: 前端
tags: [优化,工具, 浏览器]
---

# Performance中的事件汇总
## Loading事件
<table>
<td>事件</td><td>描述</td>
<tr><td>Parse HTML</td><td>浏览器执行HTML解析</td></tr>
<tr><td>Finish Loading</td><td>网络请求完毕事件</td></tr>
<tr><td>Receive Data</td><td>请求的响应数据到达事件，如果响应数据很大（拆包），可能会多次触发该事件</td></tr>
<tr><td>Receive Response</td><td>响应头报文到达时触发</td></tr>
<tr><td>Send Request</td><td>发送网络请求时触发</td></tr>
</table>

## Scripting事件
<table>
<td>事件</td><td>描述</td>
<tr><td>Animation Frame Fired</td><td>一个定义好的动画帧发生并开始回调处理时触发</td></tr>
<tr><td>Cancel Animation Frame</td><td>取消一个动画帧时触发</td></tr>
<tr><td>GC Event</td><td>垃圾回收时触发</td></tr>
<tr><td>DOMContentLoaded</td><td>当页面中的DOM内容加载并解析完毕时触发</td></tr>
<tr><td>Evaluate Script</td><td>A script was evaluated.</td></tr>
<tr><td>Event</td><td>js事件</td></tr>
<tr><td>Function Call</td><td>只有当浏览器进入到js引擎中时触发</td></tr>
<tr><td>Install Timer</td><td>创建计时器（调用setTimeout()和setInterval()）时触发</td></tr>
<tr><td>Request Animation Frame</td><td>A requestAnimationFrame() call scheduled a new frame</td></tr>
<tr><td>Remove Timer</td><td>当清除一个计时器时触发</td></tr>
<tr><td>Time</td><td>调用console.time()触发</td></tr>
<tr><td>Time End</td><td>调用console.timeEnd()触发</td></tr>
<tr><td>Timer Fired</td><td>定时器激活回调后触发</td></tr>
<tr><td>XHR Ready State Change</td><td>定时器激活回调后触发</td></tr>
<tr><td>XHR Load</td><td>当一个异步请求完成加载后触发</td></tr>
</table>

## Rendering事件
<table>
<td>事件</td><td>描述</td>
<tr><td>Invalidate layout</td><td>当DOM更改导致页面布局失效时触发</td></tr>
<tr><td>Layout</td><td>页面布局计算执行时触发</td></tr>
<tr><td>Recalculate style</td><td>Chrome重新计算元素样式时触发</td></tr>
<tr><td>Scroll</td><td>内嵌的视窗滚动时触发</td></tr>
</table>

## Painting事件
<table>
<td>事件</td><td>描述</td>
<tr><td>Composite Layers</td><td>Chrome的渲染引擎完成图片层合并时触发</td></tr>
<tr><td>Image Decode</td><td>一个图片资源完成解码后触发</td></tr>
<tr><td>Image Resize</td><td>一个图片被修改尺寸后触发</td></tr>
<tr><td>Paint</td><td>合并后的层被绘制到对应显示区域后触发</td></tr>
</table>