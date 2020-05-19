---
layout: post
title: call,apply,bind函数的应用
date: 2020-01-10 15:02:15 +0800
category: 前端
tags: [基础]
---


# call,apply,bind函数的应用
## 1.call， apply, bind函数存在的意义
A对象利用call,apply, bind调用其他对象的方法时，该方法所有的this会只想A对象，改变了该方法原有的this指向。

## 2.this指向
this永远指向最后调用他的对象，一起看看下面的简单例子
```
//"use strict";
var name = "windowsName";
function a() {
 var name = "Cherry";
 console.log(this.name);   // windowsName
 console.log("inner:" + this); // inner: Window
}
a();
console.log("outer:" + this)   // outer: Window
```
a()相当于window.a()。  
若采用严格模式，放开上面代码第一行"use strict" 结果会报错，因为全局对象就是 undefined，那么就会报错 Uncaught TypeError: Cannot read property 'name' of undefined。  
稍微修改下代码
```
var name = "windowsName";
var a = {
    name: "Cherry",
    fn : function () {
        console.log(this.name);  // Cherry
    }
}
a.fn();
window.a.fn();
```
a对象里面没有name的属性，所以是undefined。
```
var name = "windowsName";
var a = {
    //name: "Cherry",
    fn : function () {
        console.log(this.name);  // undefined
    }
}
window.a.fn();
```
再来一个变形，并不是打印出Cherry,因为a.fn只是做了一个赋值，并没有调用，f()实际还是windwo.fn()
```
var name = "windowsName";
var a = {
    name: "Cherry",
    fn : function () {
        console.log(this.name);  // windowsName
    }
}
f = a.fn;
f();
```

## 3.改变this指向
调用setTimeout的对象是window,window下面没有fun1
```
var name = "windowsName";
var a = {
  name : "Cherry",
  func1: function () {
   console.log(this.name)  
  },
  func2: function () {
   setTimeout( function () {
    this.func1()
   },100);
  }
};
a.func2()  // this.func1 is not a function
```
可以使用箭头函数避免这个坑，箭头函数的this指向函数定义时的this,而非执行时。箭头函数中没有this绑定,必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined”。
```
var name = "windowsName";
var a = {
  name : "Cherry",
  func1: function () {
   console.log(this.name)  
  },
  func2: function () {
   setTimeout( ()=> {
    this.func1()
   },100);
  }
};
a.func2()  // Cherry
```
或者在func2定义_this
```
var name = "windowsName";
var a = {
  name : "Cherry",
  func1: function () {
   console.log(this.name)  
  },
  func2: function () {
   var _this = this
   setTimeout( function () {
    _this.func1()
   },100);
  }
};
a.func2()  // Cherry
```

## 4.使用apply,call, bind 改变this指向
使用apply:
```
var name = "windowsName";
var a = {
  name : "Cherry",
  func1: function () {
   console.log(this.name)  
  },
  func2: function () {
   setTimeout( function () {
    this.func1()
   }.apply(a),100);
  }
};
a.func2()  //  Cherry
```
使用call:
```
var name = "windowsName";
var a = {
  name : "Cherry",
  func1: function () {
   console.log(this.name)  
  },
  func2: function () {
   setTimeout( function () {
    this.func1()
   }.call(a),100);
  }
};
a.func2()  //  Cherry
```
使用bind:
```
var name = "windowsName";
var a = {
  name : "Cherry",
  func1: function () {
   console.log(this.name)  
  },
  func2: function () {
   setTimeout( function () {
    this.func1()
   }.bind(a)(),100);
  }
};
a.func2()  //  Cherry
```

## 5.apply,call,bind区别
apply与call基本类似，只是传参不一样
```
//fun.apply(thisArg, [argsArray])
//fun.call(thisArg[, arg1[, arg2[, ...]]])
var a ={
  name : "Cherry",
  fn : function (a,b) {
   console.log(this.name, a + b)
  }
 }
var b = a.fn;
b.apply(a,[1,2])  //Cherry  3
b.call(a, 1, 2) //Cherry  3
```
<b>bind会创建一个新的函数，我们必须要手动去调用。</b>当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。
```
var a ={
  name : "Cherry",
  fn : function (a,b) {
   console.log( a + b)
  }
 }
 var b = a.fn;
 b.bind(a,1,2)  // ƒ(a,b) {console.log( a + b)}
 b.bind(a,1,2)() // 3
 b.bind(a)(1,2) // 3
```
## 6.面试题目
* 多重call题目
```
function fn(a,b){
    console.log(this);
    console.log(a);
    console.log(a+b);
}
fn()// window undefined NaN
fn.call(1); // Number{1} undefined NaN
fn.call(1,2,3); // Number{1} 2 5
fn.call.call(1,2,3) // fn.call.call is not a function

fn.call(fn); // fn undefined NaN
fn.call.call(fn); //window  undefined NaN
fn.call.call(fn,1,2,3); //Number{1} 2 5
fn.call.call.call(fn,1,2); // Number{1} 2 NaN
fn.call.call.call(fn,1,2,3);//Number{1} 2 5
fn.call.call.call.call(fn,1,2,3);//Number{1} 2 5
```
解析：
fn.call() 相当于fn(),this指向的是window  
fn.call(1) this指向了1，当fn.call.call(1)时报错，说明.call.call时相当于执行1()  
fn.call.call(fn)相当于执行fn.call(), 所以this指向了window   
fn.call.call(fn,1,2,3) 相当于fn.call(1,2,3)  
fn.call.call.call(fn)相当于 fn.call(1,2),后面无论有多少的call,都相当于执行了fn.call

* 手动实现call方法
```
Function.prototype.es6Call = function (context) {
    let content = context || window
    console.log('**************')
    console.log(content)
    console.log(this)
    content.fn = this
    let args = []
    for (let i = 0, len = arguments.length; i < len; i++) {
        args.push(arguments[i])
    }
    console.log(content)
    console.log('**************')

    return content.fn(...args)
}
function fn1() {
    console.log(1)
}
function fn2() {
    // console.log('f2', this)
    console.log(2)
}
fn1.es6Call(fn2)
fn1.es6Call.es6Call(fn2)
```
但是手写的call代码比不过原生的，不支持数字如fn1.es6Call(1),但是原生是支持的fn1.call(1), 也无法解决4个call并且带参数的情况 https://www.cnblogs.com/wen-k-s/p/11107230.html，手写call只能玩一玩，比不上原生代码。


