import store from '../store'
import {
	baseUrlYL,
	apiPathYL,
} from '@/config/index.js';
import {
	resHandleFun,
	reqHandleFun
} from './axios-filter.js';
import axios_filterArray from './axios_filter-array.js';

function request(options) {
	let baseUrl = "https://yysc.hm-myy.cn/buyer/";
	return handleRequest(options, baseUrl, 'api-zs')
}

function requestYL(options) {
	let baseUrl = baseUrlYL + apiPathYL;
	return handleRequest(options, baseUrl, 'api-yl')
}

function handleRequest(options, baseUrl, name) {
	let isLogin = store.state.login;
	let token = store.state.token;
	let tokenYL = store.state.tokenYL;
	let nickname = store.state.nickname;
	let phone = store.state.phone;
	let domainid = store.state.domainid;


	if (tokenYL != '' && token != '') {
		options.header = {
			...options.header,
			accessToken: token,
			'Blade-Auth': 'bearer ' + tokenYL,
			domainid: domainid
		}
	} else if(tokenYL) {
		options.header = {
			...options.header,
			'Blade-Auth': tokenYL,
			domainid: domainid
		}	
	} else {
		options.header = {
			...options.header,
			domainid: domainid
		}
	}
	options.data = ossFilterReq(options)
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url,
			data: options.data || {},
			method: options.method || 'GET',
			header: options.header || {},
			success: (res) => {
				if (res.statusCode === 200) {
					//请求成功
					if (name === 'api-yl') {
						const newRes = ossFilterRes(res, options)
						resolve(newRes.data);

					} else {
						resolve(res.data);
					}

				} else if (res.statusCode === 401) {
					uni.showToast({
						icon: 'none',
						title: "未登录或登录状态已超时",
						duration: 1500
					});
					reject(res.data);
				} else if (res.statusCode === 405) {
					uni.showToast({
						icon: 'none',
						title: "请求方法错误",
						duration: 1500
					});
					reject(res.data);
				} else if (res.statusCode === 403) {
					store.commit("SET_TOKEN", '');
					let jump = uni.getStorageSync('jump');
					if (!jump) {
						uni.navigateTo({
							url: '/pages/login/index',
						});
						uni.setStorageSync('jump', 'true')
					}
					return reject();
				} else if (res.statusCode === 400) {
					if (res.data.code == 403) {
						let jump = uni.getStorageSync('jump');
						store.commit("SET_TOKEN", '');
						if (!jump) {
							console.log(jump, '40limian')
							uni.navigateTo({
								url: '/pages/login/index',
							});
							uni.setStorageSync('jump', 'true')
						}
						return reject();
					} else {
						uni.showToast({
							icon: 'none',
							title: `${res.data.message}`
						});
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: `${res.data.message}`,
						duration: 1500
					});
				}
			},
			fail: (err) => {
				console.log("err:", err)
				uni.showToast({
					icon: 'none',
					title: '网络请求失败，请重新尝试',
					duration: 1500
				});
				reject(err);
			}
		})
	})
}


function ossFilterReq(options) {
	options.filter === false ? (options.filter = false) : Array.isArray(options
		.filter) ? (options.filter = options.filter) : (options.filter =
		true);

	if ((options.method === 'post' || options.method === 'POST') && options
		.filter) {
		options.data = Array.isArray(options.filter) ? reqHandleFun(options
			.data, options.filter) : reqHandleFun(options.data,
			axios_filterArray);
	}

	return options.data
}


function ossFilterRes(newRes, options) {
	// eslint-disable-next-line no-self-assign
	options.filter === false ? (options.filter = false) : Array.isArray(options
		.filter) ? (options.filter = options.filter) : (options.filter =
		true);

	if (options.filter && newRes.header['Content-Type'].includes(
			'application/json') > -1) {
		newRes.data = Array.isArray(options.filter) ? resHandleFun(data,
			options.filter) : resHandleFun(newRes.data, axios_filterArray);
	}

	return newRes
}

export default {
	request,
	requestYL
}