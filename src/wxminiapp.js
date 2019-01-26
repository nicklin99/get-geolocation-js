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
            fail() {
              _this.isready = false
              fail && fail()
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
          reject(error)
        }
      })
    })
  }

  start() {
    if (!this.isready) {
      // throw new Error('调用前需要 用户授权 scope.userLocation')
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