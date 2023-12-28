//登录接口
import myAxios from '@/utils/myAxios.js'

/*
 * 小程序登陆
 * */
export function wxappAuth(data) {
	return myAxios.requestYL({
		url: "blade-auth/oauth/token",
		method: 'post',
		data,
		header: {
			"content-type": "application/x-www-form-urlencoded",
			"Authorization": "Basic ZmxieV9tb2JpbGU6bUBfc2FqZCZz",
			"User-Type": 'app'
		}
	})
}

//绑定用户信息
export function bindingUserInfo(data) {
	return myAxios.requestYL({
		url: "tourist/bindingUserInfo",
		method: 'post',
		data,
	})
}


/*
 *   h5短信验证码
 * 
 */
export function h5SendValidate(data) {
	return myAxios.requestYL({
		url: "blade-resource/sms/endpoint/send-validate",
		method: 'post',
		data,
		header: {
			"content-type": "application/x-www-form-urlencoded",
			"Authorization": "Basic ZmxieV9tb2JpbGU6bUBfc2FqZCZz",
			"User-Type": 'app'
		}
	})
}

/*
 * 手机号登录
 * */
export function h5Auth(data) {
	return myAxios.requestYL({
		url: "/blade-auth/oauth/token",
		method: 'post',
		data,
		header: {
			"content-type": "application/x-www-form-urlencoded",
			"Authorization": "Basic ZmxieV9tb2JpbGU6bUBfc2FqZCZz",
			"User-Type": 'app'
		}
	})
}