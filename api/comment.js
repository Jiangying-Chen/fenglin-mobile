//评论
import myAxios from '@/utils/myAxios.js'

//获取列表
export function getCommentInfo(params) {
	return myAxios.requestYL({
		url: "sc/comment/page",
		method: 'get',
		params,
	})
}

//发布评论
export function submitComment(data) {
	return myAxios.requestYL({
		url: "sc/comment/postComment",
		method: 'post',
		data,
	})
}

//点赞
export function likeComment(data) {
	return myAxios.requestYL({
		url: "sc/behavior/like",
		method: 'post',
		data,
	})
}


//举报
export function unLikeComment(data) {
	return myAxios.requestYL({
		url: "sc/behavior/like",
		method: 'post',
		data,
	})
}
