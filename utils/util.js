import {
	returnStatement
} from "@babel/types";
import {
	dictionary
} from '@/utils/http.js';

/**
 * 格式化日期格式 (用于兼容ios Date对象)
 */
export const formatDate = (time) => {
	// 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
	return time.replace(/\-/g, "/");
}
/**
 * 对象转URL
 * @param {object} obj
 */
export const urlEncode = (obj = {}) => {
	const result = []
	for (const key in obj) {
		const item = obj[key]
		if (!item) {
			continue
		}
		if (isArray(item)) {
			item.forEach(val => {
				result.push(key + '=' + val)
			})
		} else {
			result.push(key + '=' + item)
		}
	}
	return result.join('&')
}

/**
 * 遍历对象
 */
export const objForEach = (obj, callback) => {
	Object.keys(obj).forEach((key) => {
		callback(obj[key], key)
	});
}
/**
 * 是否在数组内
 */
export const inArray = (search, array) => {
	for (var i in array) {
		if (array[i] == search) return true
	}
	return false
}
/**
 * 判断是否为对象
 * @param {*} object
 */
export const isObject = (object) => {
	return Object.prototype.toString.call(object) === '[object Object]'
}


/**
 * 判断是否为空对象
 * @param {*} object 源对象
 */
export const isEmptyObject = (object) => {
	return Object.keys(object).length === 0
}


/**
 * 判断是否为数组
 * @param {*} array
 */
export const isArray = (array) => {
	return Object.prototype.toString.call(array) === '[object Array]'
}


/**
 * 判断是否为空
 * @param {*} object 源对象
 */
export const isEmpty = (value) => {
	if (isArray(value)) {
		return value.length === 0
	}
	if (isObject(value)) {
		return isEmptyObject(value)
	}
	return !value
}

/**
 * 对象深拷贝
 * @param {*} obj 源对象
 */
export const cloneObj = (obj) => {
	let newObj = isArray(obj) ? [] : {};
	if (typeof obj !== 'object') {
		return;
	}
	for (let i in obj) {
		newObj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
	}
	return newObj
}

/**
 * 数据转化  整理商品sku列表
 * @param {*} {res} 
 * @returns array
 */
export function skudataList(skuString) {
	if (!skuString) return
	let skuArr = [];
	let productAttr = [];
	skuArr = JSON.parse(skuString);
	skuArr.forEach(v => {
		let arr = {};
		arr.attrName = v.value;
		arr.attrValueArr = v.detail;
		arr.attrValue = [];
		v.detail.forEach(k => {
			let arrDetail = {};
			arrDetail.attr = k;
			arrDetail.check = false;
			arr.attrValue.push(arrDetail)
		})
		productAttr.push(arr)
	})

	return productAttr

}

/**
 * 数据转化  判断产品是否在可购日期内
 * @param {*} buyStartTime,buyEndTime
 * @returns object
 */
export function getIscanPurchase(buyStartTime, buyEndTime) {
	let iscanPurchaseParam = {
		isOut: false,
		isNot: false,
		buyStart: ''
	};
	if (buyStartTime != null && buyEndTime != null) {
		iscanPurchaseParam.buyStart = buyStartTime;
		let buyStart = new Date(formatDate(buyStartTime));
		let buyEnd = new Date(formatDate(buyEndTime));
		let nowTime = new Date();
		if (nowTime.getTime() > buyStart.getTime() && nowTime.getTime() < buyEnd.getTime()) {
			iscanPurchaseParam.isOut = false;
			iscanPurchaseParam.isNot = false;
		} else {
			if (nowTime.getTime() < buyStart.getTime()) {
				iscanPurchaseParam.isOut = true;
				iscanPurchaseParam.isNot = false;
			}
			if (nowTime.getTime() > buyEnd.getTime()) {
				iscanPurchaseParam.isOut = false;
				iscanPurchaseParam.isNot = true;
			}
		}
	} else {
		iscanPurchaseParam.isOut = false;
		iscanPurchaseParam.isNot = false;
	}

	return iscanPurchaseParam
}

/**
 * 判断产品停止购买时间与库存
 * @param {Array}
 * @returns object
 */
export function getStopbuytime(skuListJson, productAttr) {
	if (!skuListJson) return
	let date = new Date();
	let skuListJsonParam = {
		proValue: [],
		timeArr: [],
		timetoday: time(date.getHours()) + ":" + time(date.getMinutes()) + ":" + time(date.getSeconds()),
		productAttr
	}

	for (let i in skuListJson) {
		for (let key in skuListJson[i]) {
			skuListJsonParam.proValue[key] = skuListJson[i][key]
			if (skuListJson[i][key].buyEndTime !== '') {
				let time = skuListJson[i][key].buyEndTime
				skuListJsonParam.timeArr.push(time)
				if (time && skuListJsonParam.timetoday > time) {
					productAttr[0].attrValue[i].disabled = true
				} else {
					productAttr[0].attrValue[i].disabled = false;
				}
			}
		}
	}
	console.log(skuListJsonParam, '=======skuListJsonParam')
	return skuListJsonParam
}


/**
 * 判断产品业态类型
 * @param {string}
 * @returns boole
 */
export function getTypeList() {
	let typeList = []
	dictionary("product_yetai").then(res => {
		if (res.code == 200) {
			let typeList = res.data.map(v => ({
				type: v.dictLabel,
				val: v.dictValue,
			}))
			// typeList.forEach(m => {
			// 	if (goodsType == m.val) {
			// 		m.isShow = true;
			// 	}
			// })

			return typeList
		}
	})
}

// 过滤数据类型
export function getfilterName(val) {
	let typeList = getTypeList()
	return (val) => {
		if (val && typeList.length) {
			return typeList.filter(v => v.val == val)[0].type
		} else {
			return ''
		}
	}

}

// 产品详情数据转化
export function getruleDetails(ruleDetails) {
	let detailData = [];
	if (ruleDetails) {
		let arr = ruleDetails.node.match(/src=/g);
		let node = ruleDetails.node
		if (arr != null) {
			arr.forEach(v => {
				node = node.replace('src=\"', 'src=\\\"');
			})
		}
		let regex = new RegExp('<img', 'gi');
		node = node.replace(regex, "<img style='width: 100%;'");
		detailData = JSON.parse(node);
		return detailData
	} else {
		return detailData
	}
}



export function getToday() {
	let now = new Date();
	let year = now.getFullYear(); //获取完整的年份(4位,1970-????)
	let month = now.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	let day = now.getDate(); //获取当前日(1-31)
	let day1 = now.getDate() + 1;
	month = (month > 9) ? month : ("0" + month);
	day = (day < 10) ? ("0" + day) : day;
	day1 = (day1 < 10) ? ("0" + day1) : day1;
	return {
		date: year + "-" + month + "-" + day,
		afterdate: year + "-" + month + "-" + day1
	}
}


/**
 * 判断时间不足10自动补0
 * @param {time}
 * @returns 
 */
export function time(s) {
	return s < 10 ? '0' + s : s;
}


/**
 * 数组交集
 * @param {Array} 数组1
 * @param {Array} 数组2
 * @return {Array}
 */
export const arrayIntersect = (array1, array2) => {
	return array1.filter(val => array2.indexOf(val) > -1)
}

/**
 * 手机号中间四位数变成*,脱敏
 * @param tel
 *@returns {string}
 */
export function telFormat(tel) {
	if (!tel) return tel;
	tel = String(tel);
	return tel.slice(0, 3) + "****" + tel.slice(7)
}

/**
 * 姓名脱敏
 *substr()函数：
 *格式：（string,start_position,[length]）
 *start_position为正时，从前面第几个开始，截取多少个字符串，start_position为负时，从尾部开始算起
 * @param name
 *@returns {string}
 */
export function getName(name) {
	let newStr = '';
	if (name.length === 2) {
		newStr = name.substr(0, 1) + '*'
	} else if (name.length > 2) {
		let char = '';
		for (let i = 0, len = name.length - 2; i < len; i++) {
			char += '*'
		}
		newStr = name.substr(0, 1) + char + name.substr(-1, 1)
	} else {
		newStr = name
	}
	return newStr
}

/**
 * 身份证号脱敏
 *@param identityCard
 *@returns {string} 
 */
export function getIdCard(str, frontLen = 3, endLen = 4) {
	let len = str.length - frontLen - endLen;
	let start = '';
	for (var i = 0; i < len; i++) {
		start += '*';
	}
	// 最后的返回值由三部分组成
	return str.substring(0, frontLen) + start + str.substring(str.length - endLen);

}