---
layout: post
title: HTML 严格模式与混杂模式
date:   2016-05-04 14:02:15 +0800
category: 前端
tags: [浏览器]
---

### 问题

前些天，在测试网站浏览器兼容时，遇到了个大坑。IE8测试没问题，跑360浏览器的兼容模式居然跑版了，在中国有那么多人在用360呀，真是苦恼了，又再一次测试了IE8，发现没问题，后来才发现<b>360的兼容模式居然切换到了ie7的浏览器模式</b>。

### 解决思路

只需在head里添加 `<meta http-equiv="X-UA-Compatible" content="IE=Edge" />` 。 

* IE=Edge 强制使用浏览器的最高版本模式进行渲染。注意：如果用户电脑上的IE版本是7，那么也只能以IE7的模式进行渲染。这个 meta 标签主要是避免用户安装了IE9，但浏览器却以IE7模式进行渲染的问题。

在控制台调试时，可以
有这个问题衍生出了更多的问题，什么是混杂模式，什么是文档模式，有哪些文档模式，下面我们一一细说。

## 一、为什么会有浏览器模式和文档模式？

浏览器模式和文档模式是历史遗留的问题，在浏览器大战时期，Netscape Navigator和IE对网页的实现方式差异较大，开发者要针对不同的浏览器开发不同的版本，实在闹腾。于是W3C制定HTML标准后，依照旧版本浏览器制作的页面很难使用，于是IE引入了比较折中的办法，一方面支持标准，一方面引入文档模式和浏览器模式让过去制作的页面依然能使用。 

IE5.5引入了文档模式的概念，而这个概念是通过使用文档类型(doctype)切换实现的。最初的两种文档模式是：混杂模式（quirks mode）和标准模式（standards mode）。<b>混杂模式会让IE的行为与IE5相同，而标准模式则让IE的行为更接近标准行为。</b>在IE引入文档模型的概念后，其他浏览器也纷纷效仿。在此之后，IE8又提出一种所谓的准标准模式（almost standards mode）。这种模式下的浏览器特性很多都是符合标准的，但也不尽然。
文档模式用于指定IE的页面排版引擎(Trident)的版本来渲染页面代码，对CSS hack有影响。切换文档模式不会更改用户代理字符串的版本号和从服务器重新下载网页。 

## 二、什么是浏览器模式？什么又是文档模式？他们有什么区别？

浏览器模式用于切换IE针对该网页的默认文档模式、对不同版本浏览器的条件注释解析，以及发送给网站服务器的用户代理(User-Agent)字符串的值。浏览器模式会影响服务器对客户端浏览器版本的判断，对条件注释有影响； 

文档模式用于指定IE的页面排版引擎(Trident)的版本来渲染页面代码，对CSS hack有影响。切换文档模式不会更改用户代理字符串的版本号和从服务器重新下载网页。 
总之，浏览器模式的切换会修改文档模式，会影响条件注释；而文档模式对页面渲染和CSS hack会有影响；

## 三、文档模式

主流的文档模式有三种：混杂模式(quirks mode)，标准模式(standards mode)，准标准模式(almost standards mode)。

### 混杂模式(quirks mode)

<b>让IE的行为与（包含非标准特性的）IE5相同。</b>混杂模式下，在IE中排版引擎会模拟网景4和IE5的行为，页面以一种比较宽松的向后兼容的方式显示。Internet Explorer6~8中，混杂模式有效地冻结在IE5.5，而在其他浏览器中混杂模式是对准标准模式的少量偏移； 
混杂模式中，浏览器违反了现代的Web格式规范。应尽量避免混杂模式的使用。

### 标准模式(standards mode)
<b>让IE的行为更接近标准行为。</b>标准模式下尽量执行HTML和CSS规范所指定的行为；不同的浏览器遵循不同的阶段，所以标准模式也不是一个单一目标。

### 准标准模式(almost standards mode) 

<b>这种模式下的浏览器特性有很多都是符合标准的，不标准的地方主要体现在处理图片间隙的时候（在表格中使用图片时问题最明显）。</b>准标准模式只包含很少的一部分怪异模式中的行为，最初的准标准模式只会影响表格中的图像，而后来各个浏览器又或多或少地进行了修改； 
对于标准模式和混杂模式的差异，最显著的是盒模型（box model）和表格单元格高度的处理。 
如果不考虑表格单元格的垂直尺寸处理差异，一般认为准标准模式和标准模式的行为近似。 
目前一些最新版本的浏览器已经放弃了准标准模式。


## 四、模式触发

浏览器根据DOCTYPE是否存在以及使用的DTD声明来选择要启动的文档模式。

<b>Doctype可声明三种DTD类型，分别表示严格版本、过渡版本以及基于框架的 HTML 文档。</b>

### 混杂模式触发
如果在文档开始处没有发现文档类型声明，则所有浏览器都会默认开启混杂模式。但采用混杂模式不是什么值得推荐的做法，因为不同浏览器在这种模式下的行为差异非常大，如果不使用某些hack技术，跨浏览器的行为根本就没有一致性可言。

### 标准模式触发

```
<!-- HTML 4.01 严格型 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"  "http://www.w3.org/TR/html4/strict.dtd"> 

<!-- XHTML 1.0 严格型 -->
<!DOCTYPE html PUBLIC  "-//W3C//DTD XHTML 1.0 Strict//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<!-- HTML 5.0 -->
<!DOCTYPE html>
```

### 准标准模式触发:

```
<!-- HTML 4.01 过渡型 -->
<!DOCTYPE HTML PUBLIC  "-//W3C//DTD HTML 4.01 Transitional//EN"  "http://www.w3.org/TR/html4/loose.dtd"> 

<!-- HTML 4.01 框架集型 -->
<!DOCTYPE HTML PUBLIC  "-//W3C//DTD HTML 4.01 Frameset//EN"  "http://www.w3.org/TR/html4/frameset.dtd"> 

<!-- XHTML 1.0 过渡型 -->
<!DOCTYPE html PUBLIC  "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 

<!-- XHTML 1.0 框架集型 -->
<!DOCTYPE html PUBLIC  "-//W3C//DTD XHTML 1.0 Frameset//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

## 五、模式检测
在JavaScript中可以通过 `document. compatMode` 来检测文档模式，而在IE6和IE7中是使用compatMode来确定文档模式的； 
IE6和IE7中的compatMode有两个可能的值“CSS1Compat”和“BackCompat ”，分别对应了IE6和IE7中的标准模式和怪异模式。 
小结：一般情况下是没必要进行文档模式检测的，对于样式兼容可以写CSS hack，对于JavaScript推荐特性检测，而不是检测浏览器本身。

## 六、IE的浏览器模式
IE8有4种模式：IE5.5怪异模式、IE7标准模式、IE8几乎标准模式、IE8标准模式； 
IE9有7种模式: IE5.5怪异模式、IE7标准模式、IE8几乎标准模式、IE8标准模式、IE9几乎标准模式、IE9标准模式、XML模式；

### 1.X-UA-Compatible影响浏览模式
在IE8及以后的的IE浏览器中，支持X-UA-Compatible头，可以通过在服务器端设置HTTP头，或者在页面中插入标签来实现指定较低版本的浏览器模式来渲染页面。譬如：

```
HTTP:  
Header set X-UA-Compatible "IE=8"  
Meta:  
 <meta http-equiv="X-UA-Compatible" content="IE=7"><!--以IE7模式渲染-->
```
备注：尽量不要在新开发的网页中使用这种技术，这种技术只应该作为新老网页更替过程中的过渡方案。由于目前新开发的网页都是尽量支持最新版本的浏览器的，所以这种技术也会慢慢被淘汰。

### 2.IE条件注释影响浏览器模式
用条件注释，可以实现不同的浏览器加载不同的CSS样式表或不同的内容。 
条件表达式的两种写法：

```
<!--[if expression]> 第一种方式：注释内容 <![endif]-->
<![if expression]> 第二种方式：注释内容 <![endif]>
```

其中，IE5会把第二种写法视为注释内容而忽略表达式，因此建议使用第一种写法。 
条件表达式的常见用法，譬如：

```
<!--[if IE]><p>IE浏览器</p><![endif]-->
<!--[if IE 7]><p>Internet Explorer 7</p><![endif]-->
<!--[if gte IE 7]><p>IE 7 或者更高版本.</p><![endif]-->
<!--[if (gte IE 5.5)&(lt IE 7)]><p>IE 5.5 或者 IE 6.</p><![endif]-->
<!--[if lt IE 5.5]><p>低于IE5.5</p><![endif]-->
<!--[if true]>您目前使用的浏览器支持条件注释<![endif]-->
```

## 七、总结
* 尽量避免触发混杂模式和准标准模式，推荐使用HTML5可向后兼容的标准模式doctype声明<!DOCTYPE html>；
* 在JS中，推荐使用能力检测，而不是浏览器检测；
* 尽量避免用在高版本浏览器下指定低版本的文档模式；
* 建议使用IE条件注释来解决特定IE版本中的样式缺陷问题，尽量避免在css中使用css hack。

## 参考资料

* [浏览器模式和文档模式 学习笔记](http://www.dengzhr.com/frontend/html/225)
* [浏览器模式](https://github.com/hoosin/lite/blob/master/knowledge/part1/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%A8%A1%E5%BC%8F/readme.md)
* [浏览器兼容模式 总结](http://blog.csdn.net/sunlovefly2012/article/details/20927237 )
* [说说IE浏览器的条件注释](http://www.benben.cc/blog/?p=115)