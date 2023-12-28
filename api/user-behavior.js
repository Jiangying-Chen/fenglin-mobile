//用户行为
import myAxios from '@/utils/myAxios.js'

//收藏
export function collect(data) {
	return myAxios.requestYL({
		url: "sc/behavior/collect",
		method: 'post',
		data,
	})
}