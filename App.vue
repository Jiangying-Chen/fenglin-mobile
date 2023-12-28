<script>
	export default {
		onLaunch: function() {
			const updateManager = wx.getUpdateManager()
			updateManager.onCheckForUpdate(function(res) {
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function(ress) {
						updateManager.applyUpdate()
					})
				} else {
					updateManager.onUpdateFailed(function() {
					})
				}
			})
		},
		onShow: function() {
			this.$isResolve()
		},
		onHide: function() {
			
		}
	};
</script>

<style lang="scss">
</style>