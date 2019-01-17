import Location from './location'

const wx = window.wx

export default class WXBrowserLocation extends Location {
  
  get wxh5() {
    return true
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
      });
    })
  }

  stop() {

  }

  check() {
    return new Promise((resolve, reject) => {
      wx.checkJsApi({
        jsApiList: ['getLocation'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success(res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          console.info('checkJsApi.getLocation', res)
          resolve()
        },
        fail(error) {
          console.error(error)
          reject(new Error('getLocation接口添加到jsApiList数组中'))
        }
      })
    })
  }
}