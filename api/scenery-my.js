// 我的

import myAxios from '@/utils/myAxios.js'

//我的收藏分页
export function myCollect(data) {
	return myAxios.requestYL({
		url: "sc/collect/myCollect",
		method: 'get',
		data,
	})
}
