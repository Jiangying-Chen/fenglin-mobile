import myAxios from '@/utils/myAxios.js'


//公告列表
export function noticeList(data) {
	return myAxios.requestYL({
		url: "sc/announcement/page",
		method: 'post',
		data,
	})
}

//公告详情
export function noticeDetail(data) {
	return myAxios.requestYL({
		url: "sc/announcement/detail",
		method: 'get',
		data,
	})
}