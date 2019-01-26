
// 小程序入口

import WXMiniAppLocation from "./wxminiapp";

const options = {
  altitude: false, // 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
  type: 'wgs84' // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
}

const instance = {
  location: null,
  options,
}

instance.location = new WXMiniAppLocation(instance.options)

const methods = ['start', 'ready', 'isready']

methods.forEach(method => {
  Object.defineProperty(instance, method, {
    enumerable: true,
    configurable: true,
    get() {
      return instance.location[method]
    }
  })
})

export default instance