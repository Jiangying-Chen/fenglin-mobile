import App from './App.vue'
import store from './store'

// 挂载变量
import {
	baseUrlYL,
	apiPathYL,
	IMG_URL
} from '@/config/index.js';
import {
	rejectPromise
} from '@/utils/index.js'
import {
	navTo
} from '@/core/app.js'

// #ifndef VUE3
import Vue from 'vue'
import share from '@/common/share.js'
import globalMixin from '@/mixin/globalMixin.js'
import uView from '@/uni_modules/uview-ui'

import {
	toTrueDay,
	getCanBuyDate
} from '@/utils/getDate.js'
Vue.prototype.$getCanBuyDate = getCanBuyDate
Vue.prototype.$toTrueDay = toTrueDay
Vue.prototype.$navTo = navTo
Vue.prototype.$BASE_URL_YL = baseUrlYL;
Vue.prototype.$API_URL_YL = apiPathYL;
Vue.prototype.$IMG_URL = IMG_URL;
Vue.prototype.$rejectPromise = rejectPromise
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store;
Vue.mixin(globalMixin) //全局混入
Vue.mixin(share);
Vue.prototype.$onLaunched = new Promise(resolve => {
	Vue.prototype.$isResolve = resolve
})
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif