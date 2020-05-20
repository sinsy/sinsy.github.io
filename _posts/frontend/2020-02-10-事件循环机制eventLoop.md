---
layout: post
title: 事件循环机制
date: 2020-02-10
category: 前端
tags: [基础]
---
# 事件循环机制EventLoop
## 1. 浏览器的多线程   
https://www.cnblogs.com/gg-qq/p/11125652.html   
浏览器每开一个tab页都是新开了一个进程，一个进程可以由一个或多个线程组成。设想浏览器如果是单进程，某个tab页崩溃了就影响了整个浏览器，这样的体验是很差的。
* 浏览器内核是多线程,由以下常驻线程组成：
  * GUI渲染线程：渲染HTML元素，解析HTML，CSS，构建DOM和RenderObject树，布局和绘制等。界面重绘repaint和由于某种操作引发回流（重排reflow）时，该线程会执行。
  理解重绘和重排 : https://github.com/sinsy/Challenge/blob/master/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E7%95%8C%E9%9D%A2%E9%87%8D%E7%BB%98%E9%87%8D%E6%8E%92.md
  * Javascript引擎线程：<b color="red"><font color='red'> 与GUI渲染线程互斥 </font></b>,当Javascript引擎线程执行时，GUI线程会被挂起，保存到一个队列中等到引擎空闲时立即执行。如果js执行的时间过长，就会造成页面的渲染不连贯。
  * 事件触发线程：当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待js引擎的处理，这些事件可以是定时任务，ajax异步请求，鼠标点击等
  * 定时器线程：setInterval与setTimeout所在线程，浏览器定时计数器并不是由JavaScript引擎计数的, 因为JavaScript引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确。
  * 异步http请求线程：在XMLHttpRequest在连接后是通过浏览器新开一个线程请求。将检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件，将这个回调再放入事件队列中，再由JavaScript引擎执行。

## 2. 为什么javascript是单线程？
如果javascript不是单线程，有两个任务process1 和 process2, process1 要编辑某个dom元素,process2要删除该元素，编辑与删除两个互相矛盾的命令，又或者process1要隐藏某个元素，process2要显示某个元素，这两者也是互为矛盾的指令。浏览器应该要怎么处理呢？
所以javascript必须是单线程，但是单线程的确定就是容易阻塞，所以就采用了eventloop事件循环来协调事件，用户交互，脚本，UI渲染和网络处理等行为。

## 3. EventLoop题目测试
参考文章：https://www.cnblogs.com/zyl-Tara/p/10416886.html，里面有更多的变式题目，看完整篇文章可以来做做。  
先做一道题目：
```
//请写出输出内容
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');


/*
输出结果：

script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```

## 4. 执行栈与任务队列
基本概念：
* js 分为同步任务和异步任务
* 主线程上执行同步任务，形成一个执行栈
* 事件触发线程管理这一个任务队列，只要异步任务（setTimeout,setInterval,xhr）有了运行结果，就在任务队列放置一个事件
*  一旦执行栈中的所有同步任务执行完毕（此时JS引擎空闲），系统就会读取任务队列，将可运行的异步任务添加到可执行栈中，开始执行。  
一个EventLoop中可以有一个或多个的任务队列（task queue），一个任务队列便是一系列有序任务的（task）的集合，就像setTimeout，setInterval和xhr放到了一个任务队列（宏任务），而promise和Object.observe放到了一个队列（微任务）；    
每个任务都有一个任务源（task source）,源自同一个任务源的 task 必须放到同一个任务队列，从不同源来的则被添加到不同队列。setTimout/Promise等便是任务源，而进入队列的便是他们内部具体的要执行的任务。  
![img](../images/eventloop_01.png)  

## 5. 宏任务macro task
宏任务(macro task)，每次执行栈里面执行的代码就是一个宏任务，（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。
浏览器为了能够使得JS内部(macro)task与DOM任务能够有序的执行，会在每次宏任务执行结束后，在下一个宏任务执行前，渲染一次页面，流程如下：
```
(macro)task->渲染->(macro)task->...
```
宏任务主要有：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)

## 6.微任务micro task 
微任务(micro task),在当前task执行完后立即执行的任务，即在渲染和下一个macro task之前。 
微任务主要有：Promise.then、MutaionObserver、process.nextTick(Node.js 环境)
## 7. 运行机制
在事件循环中，每进行一次循环操作称为 tick：
* 执行一个宏任务（栈中没有就从事件队列中获取）
* 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
* 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
* 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
* 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）  
每一次 tick 的任务处理模型如图：
![img](../images/eventloop_02.png)

## 8. Promise和async中的立即执行
Promise中的异步体现在then和catch中，所以写在promise中的代码会被当作同步任务立即执行，而在async/await中，就比较混淆了，我每次看到这个语法都会认为await之后的代码也是立即执行的，但实际上await是让出一个线程的标志，async await 本身就是 promise+generator的语法糖，所以await之后的代码就进入了microtask。
```
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
```
等价于
```
async function async1() {
    console.log('async1 start');
    //Promise.resolve/reject 是将现有对象转换为Promise
    Promise.resolve(async2()).then(() => {
      console.log('async1 end');
    })
}
```
查看promise和Generator的用法：https://www.jianshu.com/p/e2239f563d61

## 9. 实战中的async await用法
在实战中我们可能会遇到这种情况，接口A和接口B以及事件C，B接口需要用到A接口的数据，所以必须等A接口调用才能开始调用，事件C必须等待B接口的数据，不采用async await的话就会有许多的then出现，环环嵌套，代码会变得很难维护，如以下代码
```
function C(){
  console.log('C：获取到B的数据了')
}
new Promise(function(resolve, reject){
  console.log('A：开始调用A接口，获取A数据')
  resolve(true)
}).then(res=>{
  if(res){
    new Promise(function(resolve, reject){
      console.log('B：获取A成功，开始调用B接口')
      resolve(true)
    }).then(res=>{
      if(res){
        C()
      }
    })
  }
})
```

优化上面的代码,思路也会变得更加清晰
```
async function C(){
  const AB = await getAB()
  if(AB){
    console.log('C：获取到B的数据了')
  }
}
async function getAB(){
  const A = await new Promise(function(resolve, reject){
    console.log('A：开始调用A接口，获取A数据')
    resolve(true)
  })
  if(A){
    const B = await new Promise(function(resolve, reject){
      console.log('B：获取A成功，开始调用B接口')
      resolve(true)
    })
    return B
  }else{
    return false
  }
}
C()
```
## 10. setInterval为什么计时不准确
setInterval是宏任务，他会在主线程空闲下来的时候执行，如果主线程一直没得空闲，数出来的时间间隔就会差异比较大了。可以采用setTimeout代替setInterval，setTimeout是在计数函数执行完又重新触发计数函数，会相对的准确。
```
var startTime = new Date().getTime(); 
var count = 0;
setInterval(function(){ 
  var i = 0; 
  while(i++ < 100000000); 
}, 0);
   
setInterval(function(){ 
  count++; 
  console.log(new Date().getTime() - (startTime + count * 1000)); 
}, 1000);
```