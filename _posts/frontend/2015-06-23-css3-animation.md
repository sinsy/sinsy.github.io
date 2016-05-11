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
        <td>规定完成动画所花费的时间，以秒或毫秒计。默认是 0。</td>
    </tr>
    <tr>
        <td>animation-timing-function</td>
        <td>规定动画的速度曲线。默认是 ease。</td>
    </tr>
    <tr>
        <td>animation-delay</td>
        <td>规定在动画开始之前的延迟。默认是 0。</td>
    </tr>
    <tr>
        <td>animation-iteration-count</td>
        <td>规定动画应该播放的次数。默认是 1。</td>
    </tr>
    <tr>
        <td>animation-direction</td>
        <td>规定是否应该轮流反向播放动画。默认是 "normal"。</td>
    </tr>
    <tr>
        <td>animation-play-state</td>
        <td>规定动画是否正在运行或暂停。默认是 "running"。</td>
    </tr>
    <tr>
        <td>animation-fill-mode</td>
        <td>规定对象动画时间之外的状态。</td>
    </tr>
</table>

语法

```
animation: name duration timing-function delay iteration-count direction;
```


## 一、animation-name

animation-name  规定需要绑定到选择器的 keyframe 名称。

`animation-name: keyframename|none;`
<iframe src="https://www.sinsy.top/hungry/learn/css3/animation/animation-name.html" frameborder="0" width="100%" height="150px"></iframe>

```
<!DOCTYPE html>
<html>
<head>
<style> 
body,button{font-size: 18px;}
div
{
width:100px;
height:100px;
background:red;
position:relative;

}

@keyframes mymove
{
from {left:0px;}
to {left:200px;}
}

@-webkit-keyframes mymove /* Safari and Chrome */
{
from {left:0px;}
to {left:200px;}
}
.move{
    animation-name:mymove;
    animation-duration:2s;

    /* Safari and Chrome */
    -webkit-animation-name:mymove;
    -webkit-animation-duration:2s;
}
</style>
</head>
<body>
<button id="start">重置</button>
<div></div>
<script>
    var arr = document.querySelectorAll('div');
    document.getElementById('start').onclick = function(){
        if(this.innerHTML == '开始'){
            for(var i=0,len=arr.length; i<len; i++){
                arr[i].classList.add('move');
      
            }
            this.innerHTML = '重置';
        }else{
            for(var i=0,len=arr.length; i<len; i++){
                arr[i].classList.remove('move');
            }
            this.innerHTML = '开始';
        }

    }
</script>

</body>
</html>
```

## 二、animation-duration

animation-duration  规定完成动画所花费的时间，以秒或毫秒计。默认是 0。

`animation-duration: time;`
<iframe src="https://www.sinsy.top/hungry/learn/css3/animation/animation-duration.html" frameborder="0" width="100%" height="350px"></iframe>

```
.d1{
    animation-duration:1s;
    -webkit-animation-duration:1s;
}
.move{
    animation-name:mymove;
    -webkit-animation-name:mymove;
}
```

## 三、 animation-timing-function

animation-timing-function   规定动画的速度曲线。默认是 ease。

`animation-timing-function: value;`
<table>
    <tr>
        <th>值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>linear</td>
        <td>动画从头到尾的速度是相同的。</td>
    </tr>
    <tr>
        <td>ease</td>
        <td><b>默认</b>。动画以低速开始，然后加快，在结束前变慢。</td>
    </tr>
    <tr>
        <td>ease-in</td>
        <td>动画以低速开始。</td>
    </tr>
    <tr>
        <td>ease-out</td>
        <td>动画以低速结束。</td>
    </tr>
    <tr>
        <td>ease-in-out</td>
        <td>动画以低速开始和结束。</td>
    </tr>
    <tr>
        <td>cubic-bezier(n,n,n,n)</td>
        <td>在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。</td>
    </tr>
</table>
<iframe src="https://www.sinsy.top/hungry/learn/css3/animation/animation-timing-function.html" frameborder="0" width="100%" height="410px"></iframe>

```
#div1 {animation-timing-function:linear;}
#div2 {animation-timing-function:ease;}
#div3 {animation-timing-function:ease-in;}
#div4 {animation-timing-function:ease-out;}
#div5 {animation-timing-function:ease-in-out;}
#div6 {animation-timing-function: cubic-bezier(.38,1.45,.68,-1.33);}
/* Safari and Chrome: */
#div1 {-webkit-animation-timing-function:linear;}
#div2 {-webkit-animation-timing-function:ease;}
#div3 {-webkit-animation-timing-function:ease-in;}
#div4 {-webkit-animation-timing-function:ease-out;}
#div5 {-webkit-animation-timing-function:ease-in-out;}
#div6 {-webkit-animation-timing-function:cubic-bezier(.38,1.45,.68,-1.33);}
```

cubic-bezier曲线可以参考：[css3 transition-timing-function之 Cubic-bezier与Steps详解](http://www.sinsy.top/2015-06-18-css3-cubic-bezier-steps/)

## 四、animation-delay    

animation-delay 规定在动画开始之前的延迟。默认是 0。

`animation-delay: time;`
<iframe src="https://www.sinsy.top/hungry/learn/css3/animation/animation-delay.html" frameborder="0" width="100%" height="250px"></iframe>

```
.d1{
    animation-delay:1s;
    -webkit-animation-delay:1s;
}
.d2{
    animation-delay:2s;
    -webkit-animation-delay:2s;
}

.move{
    animation-name:mymove;
    -webkit-animation-name:mymove;
    animation-duration:2s;
    -webkit-animation-duration:2s;
}
```

## 五、animation-iteration-count

animation-iteration-count   规定动画应该播放的次数。默认是 1。

`animation-iteration-count: n|infinite;`
<table>
    <tr>
        <th>值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>n</td>
        <td>定义动画播放次数的数值。</td>
    </tr>
    <tr>
        <td>infinite</td>
        <td>规定动画应该无限次播放。</td>
    </tr>
</table>
<iframe src="https://www.sinsy.top/hungry/learn/css3/animation/animation-iteration-count.html" frameborder="0" width="100%" height="220px"></iframe>

```
#div1 {animation-iteration-count:1;}
#div2 {animation-iteration-count:2;}
#div3 {animation-iteration-count: infinite;}
/* Safari and Chrome: */
#div1 {-webkit-animation-iteration-count:1;}
#div2 {-webkit-animation-iteration-count:2;}
#div3 {animation-iteration-count: infinite;}
```

## 六、animation-direction

animation-direction 规定是否应该轮流反向播放动画。默认是 "normal"。

`animation-direction: normal|alternate;`
<table>
    <tr>
        <th>值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>normal</td>
        <td>默认值。动画应该正常播放。</td>
    </tr>
    <tr>
        <td>alternate</td>
        <td>动画应该轮流反向播放。</td>
    </tr>
</table>

<iframe src="https://www.sinsy.top/hungry/learn/css3/animation/animation-direction.html" frameborder="0" width="100%" height="200px"></iframe>

```
#div1 {animation-direction:normal;}
#div2 {animation-direction:alternate;}
/* Safari and Chrome: */
#div1 {-webkit-animation-direction:normal;}
#div2 {-webkit-animation-direction:alternate;}
```

## 七、animation-play-state

animation-play-state    规定动画是否正在运行或暂停。默认是 "running"。

`animation-play-state: paused|running;`
<table>
    <tr>
        <th>值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>paused</td>
        <td>规定动画已暂停。</td>
    </tr>
    <tr>
        <td>running</td>
        <td>规定动画正在播放。</td>
    </tr>
</table>
<iframe src="https://www.sinsy.top/hungry/learn/css3/animation/animation-play-state.html" frameborder="0" width="100%" height="150px"></iframe>

## 八、animation-fill-mode

animation-fill-mode 属性规定动画在播放之前或之后，其动画效果是否可见。

`animation-fill-mode : none | forwards | backwards | both;`
<table>
    <tr>
        <th>值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>none</td>
        <td>不改变默认行为。<b>默认值</b></td>
    </tr>
    <tr>
        <td>forwards</td>
        <td>当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。</td>
    </tr>
    <tr>
        <td>backwards</td>
        <td>在 <b>animation-delay</b> 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。</td>
    </tr>
    <tr>
        <td>both</td>
        <td>向前和向后填充模式都被应用。</td>
    </tr>
</table>
<iframe src="https://www.sinsy.top/hungry/learn/css3/animation/animation-fill-mode.html" frameborder="0" width="100%" height="340px"></iframe>

## 九、资料

1.代码下载
[点击下载](https://www.sinsy.top/hungry/learn/css3/animation/animation.zip)
