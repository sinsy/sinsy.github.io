---
layout: post
title: Chrome Devtools Performance教程
date: 2020-02-20
category: 前端
tags: [优化,工具, 浏览器]
---

# Chrome Devtools Performance教程
## 作用
分析网页在浏览器的运行效率，进而对页面进行优化

## 打开Devtools控制台
1. 使用chrom的无痕模式（该模式可以保证chrom在相对干净的环境运行，比如安装了过多的chrom插件，会影响性能分析）
2. 输入代码地址 https://sinsy.github.io/Challenge/demo/chromeDevtools/
3. 按下Command+Opiton+I（Mac）或者Control+shift+I (Windows, Linux) 来打开Devtools控制台，或者直接右键鼠标-点击“检查”。  
![avatar](../images/chrome_01.png)

## 模拟移动端设备
移动设备的CPU一般比台式机和电脑的低，更有利于我们观察性能。
1. 在DevTools，选中performance的标签
2. 确保 Screenshots checkbox 被选中
3. 点击 Capture Settings（⚙️）按钮，DevTools会展示很多设置，来模拟各种状况
4. 选择CPU 4 x slowdown  
![avatar](../images/chrome_02.png)

## 设置代码
1. 点击 Add 10 按钮，直 到你能明显看到小蓝块的移动速度变慢，在性能比较好的机器上大概需要点击20下。
2. 点击 Optimize按钮，此时你会看到小蓝块的移动速度变快了。
3. 点击 un-optimize 按钮，小蓝块又会变成之前的模样。

## 记录运行时性能表现
1. 点击 圆点 或 ctrl+e 开始录制
![avatar](../images/chrome_03.png)
2. 等待几分钟
3. 点击Stop按钮，停止录制，等待数据处理，生成性能报告

## 分析报告
![avatar](../images/chrome_04.png)
### 1. FPS图表
FPS(frames per second:每秒帧数)用来分析动画的性能，一般人眼一秒看到的不超过30帧，所以动画必须超过30fps以上，如果动画保持在60FPS，体验起来就会更好了。  
观察报告中FPS模块，如果出现一条长长的红条，则说明帧数很低，会导致非常差的用户体验，如果绿色长条越高，则说明fps越高，用户体验越好。  
![avatar](../images/chrome_05.png)

### 2. CPU图表
在FPS图标下面就是CPU图表。CPU图表的各个颜色和Summary面板的颜色一致（如果Summary面板看不到可以点击第二个红框中Main旁边的小三角）。CPU记录了Scripting(脚本)，Rendering(渲染)，Painting(绘制)等在该时间段内的所花费的时间。如果某个模块占用了大量时间，很可能是解决性能瓶颈的关键点。  
![avatar](../images/chrome_06.png)

### 3. Srubbing截图
鼠标移到FPS，CPU，NET的图表上面，会出现这个时间点的截图，左右移动鼠标可以重先当时的屏幕录像。可以用来分析动画的各个细节。  
![avatar](../images/chrome_07.png)

### 4. Frames图表
鼠标移动到Frames图表的绿色条状上，Devtools会展示这个帧的FPS，下图代表的是该帧在68.2ms为16fps，都在60以下，还没有达到60FPS的标准。  
![avatar](../images/chrome_08.png)  
在实际应用中，可能不会那么容易察觉到性能问题，可以使用一个小工具来分析。  
小工具：FPS meter(显示实时FPS面板)    
![avatar](../images/chrome_09.png)  
1. 按下 Command+Shift+P（Mac）或者 Control+Shift+P(Windows, Linux) 打开命令菜单
2. 在Redering面板中勾选FPS meter，Redering面板在more tools菜单里面。

## 定位性能瓶颈
1. Summary面板查看，发现在rendering的时间花了很多，此时要做的就是减少rendering的时间
![avatar](../images/chrome_06.png)
2. 点开Main图表，Devtools展示了主线程的运行状况。x轴代表时间，每一个长条代表一个event，长条越长代表话费的时间越长。Y轴代表了调用栈（call stack），在栈里上面的event调用了下面的event。  
![avatar](../images/chrome_10.png)
3. 在Main图表中可以通过双击，拖动，滚动来放大缩小或移动报告范围，可以从各个时间来分析性能。
4. 在事件长条的右上角出现了红色小三角，说明该存在问题，需要特别注意。
5. 双击红色小三角或单击event长条，在Summary面板可以看到详细信息。点击 Reveal 会跳到调用该事件的长条。点击app.js:95会调到出现问题的代码。  
![avatar](../images/chrome_11.png)
6. 黄色的事件条下面有很多被调用的紫色长条，滚动放大这些长条，发现他们每个都带有小三角，点击其中一个，查看Summary面板的关于这个事件详细信息，发现了Forced reflow这个警告。  
![avatar](../images/chrome_12.png)
7. 点击app.js:71，进去代码查看。左边会显示代码执行的时间。
![avatar](../images/chrome_13.png)  

## 总结
该代码存在太多的读取offsetTop属性，每次读取offsetTop，浏览器都会去强制刷新，触发Layout（重排），可以对offset进行缓存或采用其他方法获取top定位来实现优化。  
代码优化部分：  
```
var pos = parseInt(m.style.top.slice(0, m.style.top.indexOf('px')));
m.classList.contains('down') ? pos += distance : pos -= distance;
if (pos < 0) pos = 0;
if (pos > maxHeight) pos = maxHeight;
m.style.top = pos + 'px';
if (pos === 0) {
  m.classList.remove('up');
  m.classList.add('down');
}
if (pos === maxHeight) {
  m.classList.remove('down');
  m.classList.add('up');
}
```