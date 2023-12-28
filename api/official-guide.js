import myAxios from '@/utils/myAxios.js'


//业务标签
export function businessLabelList(data) {
	return myAxios.requestYL({
		url: "sc/businessLabel/page",
		method: 'post',
		data,
	})
}

//攻略新增
export function strategySave(data) {
	return myAxios.requestYL({
		url: "sc/strategy/save",
		method: 'post',
		data,
	})
}

//攻略详情
export function scStrategyDetail(data) {
	return myAxios.requestYL({
		url: "sc/strategy/detail",
		method: 'post',
		data,
	})
}