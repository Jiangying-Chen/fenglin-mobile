import {
	cloneDeep
} from './index.js'
import store from '@/store/index.js'

const detail = store.state.ossDetail
let prefix = detail.resourceDomainName || ''; // 前缀


// 拼接域名
function prependPathToDomain(domain, path) {
	// 检查域名是否已经包含协议，如果没有，默认使用https
	const protocol = domain.startsWith('http://') ? 'http://' : 'https://';

	// 去除域名中的协议部分
	const domainWithoutProtocol = domain.replace(/^https?:\/\//, '');

	// 拆分域名为子域和主域
	const parts = domainWithoutProtocol.split('.');
	const mainDomain = parts.pop();
	const subDomains = parts.join('.');

	// 拼接协议、路径和域名
	const url = `${protocol}${path}.${subDomains}.${mainDomain}`;

	return url;
}

// 使用正则表达式来匹配是否包含HTML标记
const htmlTagsRegex = /<\/?[\w\s="/.'-]*>/;
//正则校验是否是问号后带"="
const equalRegex = /\\?.*=/;
//   判断数据是不是通过 encodeURIComponent 加密
const encodedHandle = (data) => {
	try {
		// 尝试解码数据
		const newData = decodeURIComponent(data);
		if (newData === data) {
			return {
				newStr: newData,
				decrypt: false
			};
		} else {
			return {
				newStr: newData,
				decrypt: true
			}; // 如果没有错误，数据是经过encodeURIComponent编码的
		}
	} catch (e) {
		return {
			newStr: data,
			decrypt: false
		}; // 如果解码引发错误，数据不是经过encodeURIComponent编码的
	}
};

// 判断key是否在数组中
const isStrInArray = (arr, str) => {
	let isBoolean = false;
	for (let index = 0; index < arr.length; index++) {
		if (str.indexOf(arr[index]) !== -1) {
			isBoolean = true;
		}
		if (isBoolean) return isBoolean;
	}

	return isBoolean;
};

// 处理资源拼接前缀
const processResSplicePrefix = (str) => {
	let newStr = '';
	if (detail?.isUpdateDomainName) {
		const b = str.split('/');
		let c = '';
		if (b[0]) {
			c = str.slice(b[0].length + 1, str.length);
		} else if (b[1]) {
			c = str.slice(b[1].length + 2, str.length);
		}
		newStr = prependPathToDomain(prefix, b[0] || b[1]) + c;
	} else {
		newStr = prefix + str;
	}
	return newStr;
};

// 去除域名中的协议部分
function removeProtocolFromDomain(str, glob = false) {
	let newStr = '';
	if (detail?.isUpdateDomainName) {
		const b = str.split('//');
		const c = b[1].split('.');
		if (!c[0]) return str;
		if (glob) {
			newStr = str.replace(new RegExp(prependPathToDomain(prefix, c[0]), 'g'), c[0] + '/');
		} else {
			newStr = str.replace(prependPathToDomain(prefix, c[0]), c[0] + '/');
		}
	} else {
		if (glob) {
			newStr = str.replace(new RegExp(prefix, 'g'), '');
		} else {
			newStr = str.replace(prefix, '');
		}
	}
	return newStr;
}

// 时候包含前缀
const hasPrefix = (str) => {
	const b = str.split('//');
	if (b[1]) {
		const c = b[1].split('.');
		return str.startsWith(prependPathToDomain(prefix, c[0]));
	} else {
		return str.startsWith(prefix);
	}
};

/**
 * @Description: 处返回数据
 * @author: 舒
 * @return {*}
 */
const resHandleFun = (data, arr) => {
	if (!prefix) return data;
	/* 处理对象 */
	const processingObject = (data) => {
		const newData = uni.$u.deepClone(data);

		// 循环对象
		for (const key in newData) {
			if (Array.isArray(newData[key])) {
				newData[key] = processingArray(newData[key], key);
			} else if (Object.prototype.toString.call(newData[key]) === '[object Object]') {
				newData[key] = processingObject(newData[key]);
			} else if (typeof newData[key] === 'string' && newData[key].split(',').length > 1 && !htmlTagsRegex
				.test(newData[key]) && isStrInArray(arr, key) && !equalRegex.test(newData[key])) {
				newData[key] = processingArray(newData[key].split(','), key).join(',');
			} else if (isStrInArray(arr, key)) {
				newData[key] = obtainClassifiedData(newData[key], key);
			}
		}
		return newData;
	};

	/* 处理数组 */
	const processingArray = (data, key) => {
		const newData = uni.$u.deepClone(data);
		for (let i = 0; i < newData.length; i++) {
			newData[i] = obtainClassifiedData(newData[i], key);
		}
		return newData;
	};

	// 处理富文本src字段
	const convertSrcToHttps = (inputString) => {
		if (!inputString) return inputString;

		// 使用正则表达式来匹配 src 属性
		const regexSrc = /src="([^"]*)"/g;
		const regexHref = /data-href="([^"]*)"/g;

		// 替换匹配的 src 属性
		const resultSrc = inputString.replace(regexSrc, (match, srcValue) => {
			// 如果 srcValue 是空字符串或已经以“http”或“https”开头，则不进行修改
			if (srcValue === '' || srcValue.startsWith('http://') || srcValue.startsWith('https://')) {
				return match;
			} else {
				// 否则添加 "https://" 前缀
				return `src="${processResSplicePrefix(srcValue)}"`;
			}
		});

		const resultHref = resultSrc.replace(regexHref, (match, srcValue) => {
			// 如果 srcValue 是空字符串或已经以“http”或“https”开头，则不进行修改
			if (srcValue === '' || srcValue.startsWith('http://') || srcValue.startsWith('https://')) {
				return match;
			} else {
				// 否则添加 "https://" 前缀
				return `data-href="${processResSplicePrefix(srcValue)}"`;
			}
		});
		return resultHref;
	};

	// 判断字符串时候包含http或者 https‘
	const hasHttpOrHttpsHandle = (str) => {
		if (!str.trim()) return str;
		let {
			newStr,
			decrypt
		} = encodedHandle(str);

		if (htmlTagsRegex.test(newStr)) {
			return decrypt ? encodeURIComponent(convertSrcToHttps(newStr)) : convertSrcToHttps(newStr);
		} else if (newStr.indexOf('http://') === -1 && newStr.indexOf('https://') === -1) {
			return decrypt ? encodeURIComponent(processResSplicePrefix(newStr)) : processResSplicePrefix(
				newStr);
		} else {
			return decrypt ? encodeURIComponent(newStr) : newStr;
		}
	};

	/* 判断数据类型并处理 */
	const obtainClassifiedData = (data, key = '___') => {
		if (Array.isArray(data)) {
			return processingArray(data, key);
		} else if (typeof data === 'function') {
			return data;
		} else if (Object.prototype.toString.call(data) === '[object Object]') {
			return processingObject(data);
		} else if (typeof data === 'string' && (isStrInArray(arr, key) || key === '___')) {
			return hasHttpOrHttpsHandle(data);
		} else {
			return data;
		}
	};

	return obtainClassifiedData(data);
};

/* ++++++++++++++++================+++++++++++++++++++++ */

/**
 * @Description: 处理请求数据
 * @author: 舒
 * @return {*}
 */
const reqHandleFun = (data, arr) => {
	if (!prefix) return data;
	/* 处理对象 */
	const processingObject = (data) => {
		const newData = uni.$u.deepClone(data);
		// 循环对象
		for (const key in newData) {
			if (Array.isArray(newData[key])) {
				newData[key] = processingArray(newData[key], key);
			} else if (Object.prototype.toString.call(newData[key]) === '[object Object]') {
				newData[key] = processingObject(newData[key]);
			} else if (typeof newData[key] === 'string' && newData[key].split(',').length > 1 && !htmlTagsRegex
				.test(newData[key]) && isStrInArray(arr, key)) {
				newData[key] = processingArray(newData[key].split(','), key).join(',');
			} else if (isStrInArray(arr, key)) {
				newData[key] = obtainClassifiedData(newData[key], key);
			}
		}
		return newData;
	};

	/* 处理数组 */
	const processingArray = (data, key) => {
		const newData = uni.$u.deepClone(data);
		for (let i = 0; i < newData.length; i++) {
			newData[i] = obtainClassifiedData(newData[i], key);
		}
		return newData;
	};

	// 处理富文本src字段
	const convertSrcToHttps = (inputString) => {
		if (!inputString) return inputString;
		// 使用正则表达式来匹配 src 属性
		const regexSrc = /src="([^"]*)"/g;
		const regexHref = /data-href="([^"]*)"/g;
		// 替换匹配的 src 属性
		const resultSrc = inputString.replace(regexSrc, (match, srcValue) => {
			if (hasPrefix(srcValue)) {
				return `src="${removeProtocolFromDomain(srcValue)}"`;
			} else {
				return match;
			}
		});
		const resultHref = resultSrc.replace(regexHref, (match, srcValue) => {
			if (hasPrefix(srcValue)) {
				return `data-href="${removeProtocolFromDomain(srcValue)}"`;
			} else {
				return match;
			}
		});
		// 返回替换后的字符串
		return resultHref;
	};
	// 判断字符串时候包含http或者 https
	const hasHttpOrHttpsHandle = (str) => {
		if (!str.trim()) return str;
		let {
			newStr,
			decrypt
		} = encodedHandle(str);

		if (htmlTagsRegex.test(newStr)) {
			return decrypt ? encodeURIComponent(convertSrcToHttps(newStr)) : convertSrcToHttps(newStr);
		} else if (newStr.indexOf('http://') !== -1 || newStr.indexOf('https://') !== -1) {
			return decrypt ? encodeURIComponent(removeProtocolFromDomain(newStr, true)) :
				removeProtocolFromDomain(newStr, true);
		} else {
			return decrypt ? encodeURIComponent(newStr) : newStr;
		}
	};

	/* 判断数据类型并处理 */
	const obtainClassifiedData = (data, key = '___') => {
		if (Array.isArray(data)) {
			return processingArray(data, key);
		} else if (typeof data === 'function') {
			return data;
		} else if (Object.prototype.toString.call(data) === '[object Object]') {
			return processingObject(data);
		} else if (typeof data === 'string' && (isStrInArray(arr, key) || key === '___')) {
			return hasHttpOrHttpsHandle(data);
		} else {
			return data;
		}
	};

	return obtainClassifiedData(data);
};

export {
	resHandleFun,
	reqHandleFun
};