/**
 * 函数柯里化
 */

/**
 * 写一个方法，使用下面语法时都可正常工作
 * console.log(sum(2,3)) 
 * console.log(sum(2)(3)) 
 */
function add (x,y){
    return (x+y)
}
function curry(fn, curryArgs){
    return function(){
        let args = [].slice.call(arguments);
        if(curryArgs!==undefined){
            args = [...args, ...curryArgs]

        }
        // 递归调用 fn.length 代表fn所传的参数长度, 利用传参判断函数需要的参数是否跳出递归
        if (args.length < fn.length) {
            return curry(fn, args);
        }

        return fn.apply(null, args)
    }
}
sumTotal = curry(add)
console.log(222, sumTotal(1,2))
console.log(222, sumTotal(1)(2))

/**
 * 函数柯里化用途
 */


