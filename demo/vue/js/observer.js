/**
 * Created by LiuJiabao on 2018/5/14
 */


function observe(data){
	console.log(data)
	if(!data || typeof data!=='object'){
		return
	}
	//取出所有属性遍历
	Object.keys(data).forEach(function (key) {
		defineReactive(data, key, data[key])
	})
}

function defineReactive(data, key, val){
	var dep = new Dep();
	observe(val)
	Object.defineProperty(data, key, {
		enumerable: true, //可枚举
		configurable: false, //不能再define
		get: function(){
			console.log(Dep.target)
			if (Dep.target) {
				dep.depend();
			}
			return val
		},
		set: function (newVal) {
			console.log('值变啦' + newVal)
			val = newVal
			dep.notify()
		}
	})
}

//消息订阅器
var uid = 0;
function Dep() {
	this.subs = []
	this.id = uid++
}
Dep.prototype = {
	addSub: function(sub) {
		this.subs.push(sub);
	},
	depend: function() {
		Dep.target.addDep(this);
	},
	notify: function() {
		this.subs.forEach(function(sub) {
			sub.update();
		});
		console.log(this.subs)
	}
};
