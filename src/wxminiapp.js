import Location from './location'

const scope = 'scope.userLocation'

export default class WXMiniAppLocation extends Location {

  ready(success, fail) {
    const _this = this
    wx.getSetting({
      success(res) {
        const isGranted = res.authSetting[scope]
        if (!isGranted) {
          if (isGranted === false) {
            fail && fail(isGranted) // 拒绝授权
          } else {
            wx.authorize({
              scope,
              success() {
                _this.isready = true
                success && success()
              },
              fail(err) {
                _this.isready = false
                const error = new Error(err.errMsg)
                error.code = 401 // 拒绝了授权
                fail && fail(error)
              }
            })
          }
        } else {
          _this.isready = true
          success && success()
        }
      }
    })
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: this.type,
        success(res) {
          resolve(res)
        },
        fail(err) {
          const error = new Error(err.errMsg)
          error.code = 500
          reject(error)
        }
      })
    })
  }

  start() {
    if (!this.isready) {
      return new Promise((resolve, reject) => {
        this.ready(() => {
          this.getLocation().then(resolve).catch(reject)
        }, reject)
      })
    } else {
      return this.getLocation()
    }
  }
}