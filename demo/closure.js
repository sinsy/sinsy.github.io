function f1(){
　var n=999;
　return function f2(){
　　return n;
　}
}
window.console.log(f1()())//999