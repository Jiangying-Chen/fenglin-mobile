import myAxios from '@/utils/myAxios.js'

//开屏装修
export function openScreenInfo(data) {
	return myAxios.requestYL({
		url: "sc/openPage/getOpenPage",
		method: 'get',
		data,
		filter:false
	})
}