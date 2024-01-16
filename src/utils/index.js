/*
 * @Date: 2023-11-10 15:10:26
 * @LastEditors: @yujie
 * @LastEditTime: 2023-11-13 16:02:59
 * @Description: 
 */
function debounce(func, delay = 300, immediate = true){
	let timer = null;
	return function anonymouse(...params){
		clearTimeout(timer);
		let now = immediate && !timer;
		timer = setTimeout(() => {
			timer = null;
			!immediate ? func.call(this, ...params) : null;
		},delay);
		now ? func.call(this, ...params) : null;
	}
}
function isNotNull(value) {
	return value !== '' && value !== null && value !== undefined
}

export {
    debounce,
	isNotNull
}