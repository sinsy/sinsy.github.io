/**
 * Created by LiuJiabao on 2018/5/15
 */
// const promise = new Promise(function(resolve, reject){
// 	if(true){
// 		resolve(value)
// 	}else{
// 		reject(error)
// 	}
// })
// promise.then(function(value) {
// 	// success
// }, function(error) {
// 	// failure
// });

function timeout(ms){
	console.log('我来了')
	return new Promise((resolve, reject)=>{
		setTimeout(resolve, ms, 'done')
	})
}
timeout(1000).then((value) => {
	console.log(value)
})

/**
 * 图片异步加载
 * @param url
 * @returns {Promise}
 */
function loadImageAsync(url){
	return new Promise(function(resolve, reject){
		const image = new Image()
		image.onload = function () {
			resolve(image)
		}
		image.onerror = function(){
			reject(new  Error('Could not load image at '+url))
		}
		image.src = url
	})
}
loadImageAsync('https://cn.vuejs.org/images/data.png')

/**
 * ajax promise例子
 * @param url
 * @returns {Promise}
 */
function ajax(url){
	return new Promise(function(resolve, reject){
		let xhr = new XMLHttpRequest()
		xhr.open('GET', url )
		xhr.onreadystatechange = function(){
			if(this.readyState !== 4){
				console.log(this.readyState)
				return
			}
			if(this.status==200){
				resolve(this.response)
			}else{
				reject(new Error(this.statusText))
			}
		}
		xhr.send()
	})
}

ajax('http://123.56.101.174:10080/ledapi/if/media/list?keyword=&ad_platform=&province_id=&city_id=&page_size=10&page=1').then(function(res){
	console.log(res)
}, function (error) {
	console.error('出错了', error)
})