import Location from './location'

const scope = 'scope.userLocation'

export default class WXMiniAppLocation extends Location {

  ready(success, fail) {
    const _this = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting[scope]) {
          wx.authorize({
            scope,
            success() {
              _this.isready = true
              success && success()
            },
            fail(e) {
              _this.isready = false
              const err = new Error(e.errMsg)
              erro.code = 401
              fail && fail(err)
            }
          })
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
        fail(error) {
          const err = new Error(error.errMsg)
          err.code = 500
          reject(err)
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