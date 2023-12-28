//所有的接口
import myAxios from './myAxios.js'
import qs from 'qs';

// 从字典里面获取内容
export function dictionary(dictType) {
  return myAxios.request({
    //url: `/system/dict/data/noToken/type/${dictType}/1`,
	url: `buyer/system/dict/data/type/${dictType}/7`,
  })
}

//首页轮播图
export function swiper(current,limit,data){
	return myAxios.request({
		//url:`/routine/slideshow/noToken/query/${current}/${limit}`,
		url:`buyer/routine/slideshow/query/${current}/${limit}`,
		data,
	})
}
//获取菜单模块
export function getMune(current,limit,data) {
	return myAxios.request({
		//url: `/routine/function/noToken/query/${current}/${limit}`,
		url: `buyer/routine/function/query/${current}/${limit}`,
		data,
	})
}

//热门景点
export function spot(current,limit,data) {
	return myAxios.request({
		//url: `/routine/cultureshow/noToken/query/${current}/${limit}`,
		url: `buyer/routine/cultureshow/query/${current}/${limit}`,
		data,
	})
}
//推荐线路
export function line(current,limit,data) {
	return myAxios.request({
		//url: `/routine/linestrategy/noToken/query/${current}/${limit}`,
		url: `buyer/routine/linestrategy/query/${current}/${limit}`,
		data,
	})
}

//新闻资讯
export function activity(current,limit,data) {
	return myAxios.request({
		//url: `/activity/notice/noToken/query/${current}/${limit}`,
		url: `buyer/activity/notice/query/${current}/${limit}`,
		data,
	})
}


//根据id获取新闻资讯详情
export function activityDetailById(id) {
	return myAxios.request({
		//url: `/activity/notice/noToken/queryById?id=${id}`
		url: `buyer/activity/notice/queryById?id=${id}`
	})
}

//根据id获取推荐线路详情
export function lineDetailById(id) {
	return myAxios.request({
		//url: `/routine/linestrategy/noToken/queryByid?id=${id}`
		url: `buyer/routine/linestrategy/queryByid?id=${id}`
	})
}

//获取景区介绍
export function scenicIntroduce(data) {
	return myAxios.request({
		//url: `/system/area/noToken/select`,
		url: `buyer/system/area/select`,
		data
	})
}

//根据景点id获取景点详情
export function spotDetailById(id) {
	return myAxios.request({
		//url: `/routine/cultureshow/noToken/queryByid?id=${id}`
		url: `buyer/routine/cultureshow/queryByid?id=${id}`
	})
}

//根据景点名称获取线路列表
export function lineListBySpotName(data) {
	return myAxios.request({
		//url: `/routine/linestrategy/noToken/queryDetails`,
		url: `buyer/routine/linestrategy/queryDetails`,//
		data
	})
}

//首页搜索
export function searchTitle(data) {
	return myAxios.request({
		//url: `/search/noToken/selectByTitle`,
		url: `buyer/search/selectByTitle`,
		data
	})
}

//新增留言 评论
export function createMessage(data){
	return myAxios.request({
		//url:`/material/comment/noToken/create`,
		url:`buyer/material/comment/create`,
		method: 'POST',
		headers: {
			'content-type': "application/json"
		},
		data:JSON.stringify(data)
	})
}

//获取留言
export function messageList(data) {
	return myAxios.request({
		//url: `/material/comment/noToken/selectByParentId`,
		url: `buyer/material/comment/selectByParentId`,
		data
	})
}

//获取openid
export function openId(data){
	return myAxios.request({
		//url: `/front/auth/noToken/callBack`,
		url: `buyer/front/auth/callBack`,
		data
	})
}

//存储openid
export function storeOpenid(data){
	return myAxios.request({
		//url:`/front/auth/noToken/addWxUser`,
		url:`buyer/front/auth/addWxUser`,
		method: 'POST',
		headers: {
			'content-type': "application/json"
		},
		data:JSON.stringify(data)
	})
}

//获取openid用户信息
export function userInfoByOpenId(openid){
	return myAxios.request({
		//url: `/front/auth/noToken/login/${openid}`,
		url: `buyer/front/auth/login/${openid}`,
	})
}

//根据openid修改用户信息
export function userInfoEditByOpenId(data){
	return myAxios.request({
		url: `buyer/front/auth/upWxUser`,
		method: 'POST',
		headers: {
			'content-type': "application/json"
		},
		data:JSON.stringify(data)
	})
}

///微地图获取类型
export function coordinateType(data) {
	return myAxios.request({
		url: `buyer/guide/coordinateType/noToken/query/1/20`,
		data
	})
}

//获取720全局列表
export function fullView(current,limit,data) {
	return myAxios.request({
		url: `buyer/panorama/query/${current}/${limit}`,
		data,
	})
}


//首页获取景区
export function scenic(data) {
	return myAxios.request({
		url: `buyer/system/area/select`,
		data,
	})
}

//根据景区id获取景点
export function spotByScenicId(scenicId) {
	return myAxios.request({
		url:`buyer/routine/cultureshow/queryByScenicAreaId?scenicAreaId=${scenicId}`
	})
}

//精彩集列表
export function hightLighList(current,limit,data) {
	return myAxios.request({
		url:`buyer/high/light/index/${current}/${limit}`,
		data,
	})
}

//精彩集 新增修改
export function highLightUpdate(data){
	return myAxios.request({
		url: `buyer/high/light/create`,
		method: 'POST',
		headers: {
			'content-type': "application/json"
		},
		data:JSON.stringify(data)
	})
}

//精彩集根据id查详情
export function highLightDetail(data){
	return myAxios.request({
		url: `buyer/high/light/detail`,
		data:data
	})
}

//精彩集新增收藏
export function collectAdd(data){
	return myAxios.request({
		url: `buyer/collect/create`,
		method: 'POST',
		headers: {
			'content-type': "application/json"
		},
		data:JSON.stringify(data)
	})
}

//精彩集删除收藏
export function collectDelete(id,userId,model){
	return myAxios.request({
		url: `buyer/collect/delete/${id}/${userId}/${model}`,
		method:'DELETE'
	})
}

//收藏列表
export function stroeUpList(userId) {
	return myAxios.request({
		url:`buyer/collect/select/${userId}`,
	})
}

//社区官方列表
export function OfficialCommunityList(current,limit) {
	return myAxios.request({
		url:`buyer/routine/linestrategy/query/${current}/${limit}`,
		// data,
	})
}
//社区游客发布的列表
export function touristCommunityList(current,limit,data) {
	return myAxios.request({
		url:`buyer/high/light/index/${current}/${limit}`,
		data,
	})
}

//官方发布攻略根据id查详情 
export function OfficialCommunityDetail(data){
	return myAxios.request({
		url: `buyer/routine/linestrategy/queryByid`,
		data:data
	})
}
//用户查看我的攻略笔记
export function myNotesList(pageNum,pageSize,data){
	return myAxios.request({
		url: `buyer/high/light/note/${pageNum}/${pageSize}`,
		data:data
	})
}

//根据menberid修改用户信息
export function userInfoEditByMenberId(memberId,data){
	return myAxios.request({
		url: `buyer/member/center/update-nickName/${memberId}`,
		method: 'POST',
		header: {
		    'Content-Type': 'application/x-www-form-urlencoded'
		},
		data:data
	})
}
//获取会员地址
export function userAddressByMenberId(data){
	return myAxios.request({
		url: `buyer/member/address`,
		data,
	})
}
//新增会员地址
export function userAddressCreate(data){
	return myAxios.request({
		url: `buyer/member/address`,
		method: 'POST',
		header: {
		    'Content-Type': 'application/x-www-form-urlencoded'
		},
		data:data
	})
}
//修改会员地址
export function userAddressUpdate(data){
	return myAxios.request({
		url: `buyer/member/address`,
		method: 'PUT',
		header: {
		    'Content-Type': 'application/x-www-form-urlencoded'
		},
		data:data
	})
}


// 获取地址
export function pickerAddress(){
	return myAxios.request({
		url: `buyer/passport/connect/miniProgram/getJS`,
	})
}
