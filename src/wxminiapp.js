import Location from './location'

const scope = 'scope.userLocation'

export default class WXMiniAppLocation extends Location {

  ready(callback) {
    const _this = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting[scope]) {
          wx.authorize({
            scope,
            success() {
              _this.grant = true
              _this.isready = true
              callback && callback()
            },
            fail() {
              _this.grant = false
              _this.isready = false
            }
          })
        } else {
          _this.isready = true
          _this.grant = true
        }
      }
    })
  }

  start() {
    const type = this.type
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type,
        success(res) {
          resolve(res)
        },
        fail(error) {
          reject(error)
        }
      })
    })
  }
}