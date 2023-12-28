const getImageInfo = images => {
	return new Promise((resolve, reject) => {
		let imageAry = {}
		images.map((item, index) => {
			uni.getImageInfo({
				src: item,
				fail: function(res) {
					imageAry[index] = null
					if (imageAry.length == images.length) {
						resolve(imageAry)
					}
				},
				success: function(res) {
					imageAry[index] = res
					if (Object.keys(imageAry).length == images.length) {
						resolve(imageAry)
					}
				},
			})
		})
	})
}

/**
 * 获取分享海报
 * @param array store 海报素材
 * @param string store_name 素材文字
 * @param string price 价格
 * @param function successFn 回调函数
 *
 *
 */
export const PosterCanvas = (store, successCallBack) => {
	uni.showLoading({
		title: '海报生成中',
		mask: true,
	})
	getImageInfo([store.image, store.code]).then(res => {
		console.log(res)
		let contentHh = 48 * 1.3
		const ctx = uni.createCanvasContext('myCanvas')
		ctx.clearRect(0, 0, 0, 0)
		const WIDTH = 747
		const HEIGHT = 1326
		ctx.fillStyle = '#FFFFFF'
		ctx.fillRect(0, 0, WIDTH, HEIGHT)
		ctx.drawImage(res[0].path, 0, 0, WIDTH, WIDTH)
		ctx.drawImage(res[1].path, 40, 1064, 200, 200)
		ctx.save()
		let r = 90
		let d = r * 2
		let cx = 40
		let cy = 990
		ctx.arc(cx + r, cy + r, r, 0, 2 * Math.PI)
		ctx.clip()
		ctx.restore()
		ctx.setTextAlign('center')
		ctx.setFontSize(48)
		ctx.setFillStyle('#000')
		ctx.fillText(store.title, WIDTH / 2, 810 + contentHh)
		ctx.setTextAlign('center')
		ctx.setFontSize(32)
		ctx.setFillStyle('red')
		ctx.fillText('￥' + store.price, WIDTH / 2, 985)
		ctx.setTextAlign('center')
		ctx.setFontSize(22)
		ctx.setFillStyle('#333333')
		ctx.fillText('长按识别二维码立即购买', WIDTH / 2, 1167)
		ctx.save()
		ctx.draw(true, () => {
			uni.canvasToTempFilePath({
				canvasId: 'myCanvas',
				fileType: 'png',
				destWidth: WIDTH,
				destHeight: HEIGHT,
				success: function(res) {
					uni.hideLoading()
					successCallBack && successCallBack(res.tempFilePath)
				},
				fail: function(error) {
					console.log(error)
				},
			})
		})
	})

	// uni.getImageInfo({
	//   src: store.image,
	//   fail: function (res) {
	//     uni.showToast({
	//       title: '海报生成失败',
	//       icon: "none",
	//       duration: 2000
	//     });
	//   },
	//   success: function (res) {

	//   }
	// })
}

// 数组排序
export function orderBy(list, key) {
	return list.sort((a, b) => a[key] - b[key]);
}

// 接口返回超过指定ms后返回失败Promise
export const rejectPromise = (rejectTime) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error(`在${rejectTime}ms后返回失败Promise`))
		}, rejectTime)
	})
}

/**
 * 显示消息提示框
 * @param  title 提示的内容，长度与 icon 取值有关。
 * @param  duration 提示的延迟时间，单位毫秒，默认：2000
 */
function toast(title, duration = 2000) {
	uni.showToast({
		title: title,
		icon: 'none',
		duration,
	});
}


/**
 * copyText 多端复制文本
 */
export function copyText(text) {
	// #ifndef H5
	uni.setClipboardData({
		data: text,
		success: function() {
			toast('复制成功!');
		},
		fail: function() {
			toast('复制失败!');
		},
	});
	// #endif
	// #ifdef H5
	var createInput = document.createElement('textarea');
	createInput.value = text;
	document.body.appendChild(createInput);
	createInput.select();
	document.execCommand('Copy');
	createInput.className = 'createInput';
	createInput.style.display = 'none';
	toast('复制成功');
	// #endif
}