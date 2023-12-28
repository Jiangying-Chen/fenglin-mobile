// 攻略

import myAxios from '@/utils/myAxios.js'

//我的攻略分页
export function myStrategy(data) {
	return myAxios.requestYL({
		url: "sc/strategy/page",
		method: 'post',
		data,
	})
}

//我的攻略详情
export function myStrategyDetail(data) {
	return myAxios.requestYL({
		url: "sc/strategy/detail",
		method: 'post',
		data,
	})
}
//我的攻略删除
export function removeStrategy(data) {
	return myAxios.requestYL({
		url: "sc/strategy/remove",
		method: 'post',
		data,
	})
}