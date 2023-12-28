//所有的接口
import myAxios from './myAxios.js'

/*
 * 小程序登陆
 * */
export function wxappAuth(data, uuid) {
	return myAxios.request({
		url: "buyer/passport/connect/miniProgram/auto-login",
		method: 'get',
		header: {
			uuid: uuid
		},
		data: {
			...data
		}
	})
}

export function getEventDetail(id) {
	return myAxios.request({
		url: "buyer/promotion/eventGoods/" + id,
		method: 'get'
	})
}
// 弹窗广告
export function getAdvertising(current, limit, data) {
	return myAxios.request({
		url: "buyer/Advertising/query/" + current + "/" + limit,
		method: 'get',
		data: data
	})
}

// 获取手机号
export function wxphoneAuth(data) {
	return myAxios.request({
		url: "buyer/passport/connect/miniProgram/auto-login/getPhone",
		method: 'post',
		data: {
			...data
		}
	})
}
// 保存姓名
export function wxUserAuth(data) {
	return myAxios.request({
		url: "wxapp/wxMaUserInfo ",
		method: 'post',
		data: {
			...data
		}
	})
}
/**
 * 小程序授权
 */
export function wxappGetUserInfo(data) {
	return myAxios.request({
		url: "wxapp/loginAuth",
		method: 'post',
		data: data
	})
}
//获取首页banner
export function getHomeData() {
	return myAxios.request({
		url: "getCanvas?terminal=3",
		method: 'get',
		data: {
			login: false
		}
	})
}

export function getInfo() {
	return myAxios.request({
		url: "index",
		method: 'get',
		data: {
			login: false
		}
	})
}

export function getCategory() {
	return myAxios.request({
		url: "category",
		method: 'get'
	})
}
// 获取商品列表
export function getProduct(data) {
	return myAxios.request({
		url: "buyer/goods/goods",
		method: 'get',
		data: data
	})
}
// 获取商品详情
export function getProductDetail(id) {
	return myAxios.request({
		url: "buyer/goods/goods/get/" + id,
		method: 'get',
	})
}
// 兑换优惠券兑换
export function getCouponchangeDetail(id, num) {
	return myAxios.request({
		url: `buyer/point/coupon/change/${id}?num=` + num,
		method: 'post',
	})
}
// 添加购物车
export function postCartAdd(data) {
	return myAxios.request({
		url: "buyer/trade/carts",
		method: 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: data
	})
}

// 获取购物车
export function getCartList() {
	return myAxios.request({
		url: "buyer/trade/carts/all",
		method: 'get'
	})
}

// 修改购物车
export function changeCartList(data, playDate) {
	let oUrl = ''
	if (data.skuId == '' || data.skuId == null || data.skuId == undefined) {
		oUrl = "buyer/trade/carts/sku/checked"
	} else {
		oUrl = "buyer/trade/carts/sku/checked/" + data.skuId + "?playDate=" + playDate
	}
	return myAxios.request({
		url: oUrl,
		method: 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: data

	})
}

/*
 * 购物车 修改商品数量
 * */
export function changeCartNum(data) {
	return myAxios.request({
		url: "buyer/trade/carts/sku/num/" + data.skuId,
		method: 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: data
	})
}
// 删除购物车
export function postCartDel(id, date) {
	return myAxios.request({
		url: "buyer/trade/carts/sku/remove",
		method: 'DELETE',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {
			skuIds: id,
			playDate: date
		}
	})
}
// 获取订单
export function createOrder(ways) {
	// debugger;
	return myAxios.request({
		url: "buyer/trade/carts/checked",
		method: 'get',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {
			way: ways
		}
	})
}

// 获取订单详情
export function getOrderDetail(sn) {
	return myAxios.request({
		url: "buyer/order/order/" + sn,
		method: 'get'
	})
}


// 计算订单金额
export function postOrderComputed(key, data) {
	return myAxios.request({
		url: "order/computed/" + key,
		method: 'post',
		data: data
	})
}

// 添加联系人
export function linkName(data) {
	return myAxios.request({
		url: "linkman",
		method: 'post',
		data: data
	})
}

// 获取联系人
export function getLinkname(id) {
	return myAxios.request({
		url: "linkman/info/" + id,
		method: 'get'
	})
}

// 获取游客列表
export function getRealName(id) {
	return myAxios.request({
		url: "buyer/realName/realName/info/" + id,
		method: 'get'
	})
}

// 添加游客
export function addRealname(data) {
	return myAxios.request({
		url: "buyer/realName/realName/save",
		method: 'post',
		data: data
	})
}

// 修改游客
export function updateRealname(data) {
	return myAxios.request({
		url: "buyer/realName/realName/update",
		method: 'put',
		data: data
	})
}

// 修改游客
export function delRealname(id) {
	return myAxios.request({
		url: "buyer/realName/realName/delete/" + id,
		method: 'delete'
	})
}

// 生成订单
export function postOrder(data) {
	return myAxios.request({
		url: "buyer/trade/carts/create/trade",
		method: 'post',
		data: data
	})
}
// 取货类型
export function putAddress(data) {
	return myAxios.request({
		url: "buyer/trade/carts/shippingMethod",
		method: 'put',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: data
	})
}

// 订单列表
export function getOrderList(data) {
	return myAxios.request({
		url: "buyer/order/order",
		method: 'get',
		data: data
	})
}
// 是否收藏
export function isCollectionFunc(id) {
	return myAxios.request({
		url: "buyer/member/collection/isCollection/GOODS/" + id,
		method: 'get'
	})
}
// 添加收藏
export function addCollection(id) {
	return myAxios.request({
		url: "buyer/member/collection/add/GOODS/" + id,
		method: 'post'
	})
}
// 删除收藏
export function delCollection(id) {
	return myAxios.request({
		url: "buyer/member/collection/delete/GOODS/" + id,
		method: 'delete'
	})
}
// 获取收藏列表
export function getCollectionList() {
	return myAxios.request({
		url: "buyer/member/collection/GOODS",
		method: 'get'
	})
}

// 优惠券列表
export function getCouponsUser(data) {
	return myAxios.request({
		url: "buyer/promotion/coupon/getCoupons",
		method: 'get',
		data: data
	})
}

// 优惠券兑换列表
export function getCoupon(data) {
	return myAxios.request({
		url: "buyer/promotion/coupon",
		method: 'get',
		data: data
	})
}
/*
 * 点击领取优惠券
 * */
export function getCouponReceive(id) {
	return myAxios.request({
		url: "buyer/promotion/coupon/receive/" + id,
		method: 'get',
	})
}

export function useCoupon(data) {
	return myAxios.request({
		url: "buyer/trade/carts/select/coupon",
		method: 'get',
		data: data
	})
}
// 订单支付
export function payOrder(data) {
	return myAxios.request({
		url: "buyer/payment/cashier/pay/NHPAY/JSAPI",
		method: 'get',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: data
	})
}

// 订单确认
export function orderConfirm(id) {
	return myAxios.request({
		url: "order/orderConfirm/" + id,
		method: 'get'
	})
}

// 订单退款
export function backOrder(data) {
	return myAxios.request({
		url: "order/refund",
		method: 'post',
		data: data
	})
}
export function backCardOrder(id, data) {
	return myAxios.request({
		url: "buyer/order/afterSale/save/" + id,
		method: 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: data
	})
}

// 订单退款
export function orderCancle(sn) {
	return myAxios.request({
		url: "buyer/order/order/" + sn + "/cancel",
		method: 'post'
	})
}
// 退款列表
export function getAfterList(data) {
	return myAxios.request({
		url: "buyer/order/afterSale/page",
		method: 'get',
		data: data
	})
}
// 退款详情
export function getAfterInfo(sn) {
	return myAxios.request({
		url: "buyer/order/afterSale/get/" + sn,
		method: 'get',
	})
}
// 获取incode二维码
export function getInCode(incode) {
	return myAxios.request({
		url: "buyer/distribution/distribution/poster/distribution?inCode=" + incode,
		method: 'get'
	})
}
// 获取会员码
export function getInfoByCode(incode) {
	return myAxios.request({
		url: "buyer/member/center/getMember/" + incode,
		method: 'get'
	})
}
// 获取活动列表
export function getIndexActiveList(data) {
	return myAxios.request({
		url: "buyer/routine/slideshow/query/1/10",
		method: 'get',
		data: data
	})
}
export function getIndexView(id) {
	return myAxios.request({
		url: "buyer/routine/slideshow/queryById",
		method: 'get',
		data: {
			id: id
		}
	})
}
// 活动列表
export function getIndexNoticList(type) {
	return myAxios.request({
		url: "buyer/activity/notice/query/1/10",
		method: 'get',
		data: {
			isAsc: 'asc',
			orderByColumn: 'ranking',
			enabled: true,
			type: type
		}
	})
}

export function getIndexPromotionList(type) {
	return myAxios.request({
		url: "buyer/activity/promotion/query/1/10",
		method: 'get',
		data: {
			isAsc: 'asc',
			orderByColumn: 'rank',
			enabled: true,
			type: type
		}
	})
}
// 单规格商品获取购买库存
export function getBuyDay(skuId, startDate, endDate) {
	return myAxios.request({
		url: "buyer/goods/goods/getStock/" + skuId + "?startDate=" + startDate + "&endDate=" + endDate,
		method: 'get'
	})
}
// 活动详情
export function getActiveView(id) {
	return myAxios.request({
		url: "buyer/activity/promotion/queryById",
		method: 'get',
		data: {
			id: id
		}
	})
}
export function getNoticView(id) {
	return myAxios.request({
		url: "buyer/activity/notice/queryById",
		method: 'get',
		data: {
			id: id
		}
	})
}

// 获取海报
export function getProductPoster(id) {
	return myAxios.request({
		url: "buyer/goods/goods/poster/" + id,
		method: 'get'
	})
}
// 获取图片列表
export function getImage(data) {
	return myAxios.request({
		url: "buyer/goods/goods",
		method: 'get',
		data: data
	})
}
// 提现金额
export function getCommission() {
	return myAxios.request({
		url: "buyer/distribution/distribution/info",
		method: 'get'
	})
}
// 获取分销订单
export function getCommissionList(data) {
	return myAxios.request({
		url: "buyer/distribution/order",
		method: 'get',
		data: data
	})
}


// 提现
export function toCash(data) {
	return myAxios.request({
		url: "/extract/cash",
		method: 'post',
		data: data
	})
}

// 提现记录
export function getSpread(data) {
	return myAxios.request({
		url: "buyer/distribution/cash",
		method: 'get',
		data: data
	})
}

// 线上开卡
export function openCardOnline(data) {
	return myAxios.request({
		url: "buyer/annualCard/annualCard/card/open",
		method: 'post',
		data: data
	})
}
// 线下开卡
export function openCardOffline(data) {
	return myAxios.request({
		url: "buyer/annualCard/annualCard/openCard/offline",
		method: 'post',
		data: data
	})
}
// 年卡列表
export function cardList(page, limit) {
	return myAxios.request({
		url: "buyer/annualCard/annualCard/card/list?pageNumber=" + page + '&pageSize=' + limit,
		method: 'get'
	})
}
// 激活
export function openActivate(type, data) {
	return myAxios.request({
		url: "buyer/annualCard/annualCard/openCard/activate/" + type,
		method: 'post',
		data: data
	})
}
// 赠送
export function changeGive(id) {
	return myAxios.request({
		url: "card/give/status/" + id,
		method: 'post'
	})
}
// 领取
export function getCard(data) {
	return myAxios.request({
		url: "buyer/annualCard/annualCard/card/give",
		method: 'post',
		data: data
	})
}

// 获取分销订单详情
export function getDisDetail(id) {
	return myAxios.request({
		url: "commission/orderDetail/" + id,
		method: 'post'
	})
}

// 库存日历
export function getStock(productId, playDate) {
	return myAxios.request({
		url: "buyer/goods/goods/sku/" + productId,
		method: 'get',
		data: {
			playDate: playDate
		}
	})
}
// 获取兑换列表
export function getChangeList(data) {
	return myAxios.request({
		url: "change/ticket/getAll",
		method: 'post',
		data: data
	})
}

// 确认兑换
export function postChange(key, code, data) {
	return myAxios.request({
		url: "order/changeTicket/" + key + '/' + code,
		method: 'post',
		data: data
	})
}

// 获取活动商品列表
export function getActiveProduct() {
	return myAxios.request({
		url: "buyer/promotion/eventGoods?pageNumber=1&pageSize=1000",
		method: 'get',
	})
}

// 获取店铺详情
export function getStoreInfo(id) {
	return myAxios.request({
		url: "buyer/store/store/get/detail/" + id,
		method: 'get',
	})
}
// 根据门店获取商品列表
export function getStoreProduct(id) {
	return myAxios.request({
		url: "buyer/goods/goods/goodsVO",
		method: 'get',
		data: {
			storeId: id,
			marketEnable: 'UPPER',
			order: 'asc',
			sort: 'sort'
		}
	})
}
// 获取门店列表
export function getStore(data) {
	return myAxios.request({
		url: "buyer/store/store",
		method: 'get',
		data: data
	})
}
// 年卡购买列表
export function buyCardList() {
	return myAxios.request({
		url: "products/annualCard",
		method: 'get',
	})
}

// 获取导航栏
export function getTypeList(data) {
	return myAxios.request({
		url: "buyer/routine/function/query/1/4",
		method: 'get',
		data: data
	})
}

export function getSign() {
	return myAxios.request({
		url: "buyer/setting/setting/get/POINT_SETTING",
		method: 'get',
	})
}
export function getSignDay(day) {
	return myAxios.request({
		url: "buyer/members/sign",
		method: 'get',
		data: {
			time: day
		}
	})
}
export function toSignDay() {
	return myAxios.request({
		url: "buyer/members/sign",
		method: 'post',
	})
}
// 获取积分商品分类
export function getKind() {
	return myAxios.request({
		url: "buyer/promotion/pointsGoods/category",
		method: 'get',
	})
}
// 获取积分商品
export function getKindProduct(data) {
	return myAxios.request({
		url: "buyer/promotion/pointsGoods",
		method: 'get',
		data: data
	})
}
// 获取积分优惠券
export function getcouponProduct(data) {
	return myAxios.request({
		url: "buyer/point/coupon/getByPage",
		method: 'get',
		data: data
	})
}
// 获取积分优惠券详情
export function getcouponDetail(id) {
	return myAxios.request({
		url: `buyer/promotion/coupon/get/info/${id}`,
		method: 'get',
	})
}
export function getPointDetail(id) {
	return myAxios.request({
		url: "buyer/promotion/pointsGoods/" + id,
		method: 'get'
	})
}
// 获取当前积分
export function getPoint() {
	return myAxios.request({
		url: "buyer/member/memberPointsHistory/getMemberPointsHistoryVO",
		method: 'get'
	})
}
// 获取积分列表
export function getPointList(data) {
	return myAxios.request({
		url: "buyer/member/memberPointsHistory/getByPage",
		method: 'get',
		data: data
	})
}

// 优惠券信息
export function getCouponInfo(id) {
	return myAxios.request({
		url: "buyer/promotion/coupon/get/" + id,
		method: 'get'
	})
}
export function postCoupon(id, data) {
	return myAxios.request({
		url: "buyer/promotion/coupon/use/parkingCoupon/" + id,
		method: 'post',
		data: JSON.stringify(data)
	})
}
// 优惠券数量
export function getCouponNumber() {
	return myAxios.request({
		url: "buyer/promotion/coupon/getCouponsNum",
		method: 'get'
	})
}

// 赛事列表
export function getMatchList(data) {
	return myAxios.request({
		url: "buyer/event/registration/list",
		method: 'get',
		data: data
	})
}
// 赛事详情
export function getMatchView(id) {
	return myAxios.request({
		url: "buyer/event/registration/info/" + id,
		method: 'get',
	})
}
// 赛事报名
export function saveMatch(id, data) {
	console.log(data)
	return myAxios.request({
		url: "buyer/event/registration/save/" + id,
		method: 'post',
		data: data
	})
}

export function getMatchInfo(id, memberId) {
	return myAxios.request({
		url: "buyer/event/registration/eventList",
		method: 'get',
		data: {
			competitionId: id,
			memberId: memberId
		}
	})
}
// 赛事列表
export function getMatchListByMember(data) {
	return myAxios.request({
		url: "buyer/event/registration/listByMemberId",
		method: 'get',
		data: data
	})
}
// 取消报名
export function calMatch(sn) {
	return myAxios.request({
		url: "buyer/event/registration/cancel/" + sn,
		method: 'get',
	})
}

// 绑定分销员
export function bindCode(incode) {
	return myAxios.request({
		url: "buyer/distribution/distribution/bindingDistribution?inCode=" + incode,
		method: 'get'
	})
}

// 排队取号
export function getSence(data) {
	// 取号
	return myAxios.request({
		url: "buyer/queue/search",
		method: 'get',
		data: data
	})
}
export function getQueueScen(data) {
	// 排队列表
	return myAxios.request({
		url: "buyer/quene/member/search",
		method: 'get',
		data: data
	})
}
export function getQueue(data) {
	// 取号
	return myAxios.request({
		url: "buyer/queue/getorder",
		method: 'get',
		data: data
	})
}
export function delQueue(data) {
	// 取号
	return myAxios.request({
		url: "buyer/quene/member/update",
		method: 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: data
	})
}
export function searchAfter(data) {
	// 取号
	return myAxios.request({
		url: "buyer/quene/member/searchafter",
		method: 'get',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: data
	})
}
// 叫号
export function callPeople(data) {
	// 取号
	return myAxios.request({
		url: "buyer/queue/call",
		method: 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: data
	})
}
// 获取会员等级
export function getGradeInfo(id) {
	// 取号
	return myAxios.request({
		url: "buyer/member/memberGrade/get/" + id,
		method: 'get',
	})
}
// 获取会员等级列表
export function getGradeList() {
	// 取号
	return myAxios.request({
		url: "buyer/member/memberGrade/getByPage",
		method: 'get',
	})
}
// 获取购买商品
export function getScroll(data) {
	return myAxios.request({
		url: "buyer/order/order/roll",
		method: 'get',
		data: data
	})
}
// 获取购物车商品数量
export function getCount() {
	return myAxios.request({
		url: "buyer/trade/carts/count",
		method: 'get',
		data: {
			checked: 'true'
		}
	})
}
// 获取商品列表
export function getProductDis(data) {
	return myAxios.request({
		url: "buyer/goods/goods/getDisGoods",
		method: 'get',
	})
}
// 获取年卡使用记录
export function getCardUserList(id) {
	return myAxios.request({
		url: "buyer/annualCard/annualCard/card/use/record/" + id,
		method: 'get',
	})
}

// 浏览任务
export function getLiulan(time) {
	return myAxios.request({
		url: "buyer/point/task/youLan?time=" + time,
		method: 'get'
	})
}
// 任务领取
export function getTaskList() {
	// 取号
	return myAxios.request({
		url: "buyer/point/task/getByPage",
		method: 'get',
	})
}
// 获取用户任务列表
export function getMyTask(id) {
	return myAxios.request({
		url: "buyer/point/task/getByPageByMemberId",
		method: 'get'
	})
}
// 清空购物车
export function clearCar() {
	return myAxios.request({
		url: "buyer/trade/carts",
		method: 'delete'
	})
}

// 分销规则
export function getsetting() {
	return myAxios.request({
		url: '/buyer/setting/setting/get/PRIVACY_POLICY',
		method: 'get'
	})
}

// 获取售票员商品列表
export function getGoodsSeller(data) {
	return myAxios.request({
		url: "buyer/goods/goods/visitor",
		method: 'get',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: data
	})
}

// 售票员订单列表
export function getSellerorderList(data) {
	return myAxios.request({
		url: "buyer/order/order/seller",
		method: 'get',
		data: data
	})
}

// 售票员二维码
export function getsellerQrcode(data) {
	return myAxios.request({
		url: "buyer/passport/connect/miniProgram/mp/sellerQrcode",
		method: 'get',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		//data:JSON.stringify(data)
		data: data,
	})
}

// 商户id GETbuyer/seller/getStores

export function getStores() {
	return myAxios.request({
		url: "buyer/visitorGoods/getStores",
		method: 'get',
	})
}

// 访客销售售票员产品列表
export function getVisitorGoods(data) {
	return myAxios.request({
		url: "buyer/visitorGoods/getByPage",
		method: 'get',
		data: data
	})
}


//获取隐私协议
export function privacyContent(incode) {
	return myAxios.request({
		url: "buyer/setting/noToken/get/PRIVACY_POLICY",
		method: 'get'
	})
}


// 自定义分词
export function getWords(words) {
	return myAxios.request({
		url: "buyer/goods/goods/page/",
		method: 'get',
		data: {
			words: words
		}
	})
}


//商品分类
export function getTypeProduct(categoryId) {
	return myAxios.request({
		url: `buyer/goods/category/info/${categoryId}`,
		method: 'get'
	})
}

//文创产品
export function getProductCulture(id) {
	return myAxios.request({
		url: `buyer/goods/goods/byCategory/${id}?marketEnable=UPPER`,
		method: 'get'
	})
}



// Es获取商品信息
export function getGoods(keyword) {
	return myAxios.request({
		url: "buyer/goods/goods/es",
		method: 'get',
		data: {
			keyword: keyword
		}
	})
}


//获取授权码
export function oauthCode() {
	return myAxios.requestYL({
		url: "authInfo/refreshOauthCode",
		method: 'get',
	})
}

//获取宇联的用户信息  手机号
export function authUserInfoByYL(data) {
	return myAxios.requestYL({
		url: "authInfo/authUserInfo",
		method: 'get',
		data: data,
	})
}

//用手机号拿token和用户信息
export function userInfoByPhone(phone) {
	return myAxios.request({
		url: `buyer/passport/member/userLogin?password=e10adc3949ba59abbe56e057f20f883e&username=${phone}`,
		method: 'post',
	})
}

// 距离
export function getdistance(data) {
	return myAxios.request({
		url: "buyer/store/store/distance",
		method: 'get',
		data: data
	})
}
// 地区
export function getminiProgram() {
	return myAxios.request({
		url: "buyer/passport/connect/miniProgram/getJS" ,
		method: 'get'
	})
}
