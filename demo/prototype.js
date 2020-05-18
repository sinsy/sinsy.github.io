function fruits() { }

fruits.prototype = {
    color: "red",
    say: function () {
        console.log("My color is " + this.color);
    }
};
var apple = new fruits;
console.dir(fruits)
console.dir(apple)
console.dir({})
/**
 * fruits的__proto__是f()
 * apple的__proto__是Object,跟 {}的一样
 */
/**
 * new一个对象的过程：
 * 1.先创建空对象{}
 * 2.构建新对象的原型链
 * 3.执行原型链__proto__上的构造函数constructor()，并让this指向创建的对象
 * 4.返回创建的对象
 */
function student(name) {
    this.name = name
}
student.prototype.say = function () {
    console.log('my name is：' + this.name + 'class:' + this.class)
}
student.prototype.class = '一年一班'
let b = {}
b.__proto__ = student.prototype
b.__proto__.constructor.call(b, '小李')
console.log(b)
a = new student('小李')
console.log(a)

