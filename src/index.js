import BrowserLocation from "./browser";
import WXBrowserLocation from "./wxbrowser";

/**
 * 浏览器入口
 * 输出
 * - latitude 纬度，浮点数，范围为90 ~ -90
 * - longitude 经度，浮点数，范围为180 ~ -180。
 * - speed 速度，以米/每秒计
 * - accuracy 位置精度
 */

const options = {
  maximumAge: 30000,
  timeout: 27000, // 超时时间ms
  type: 'wgs84' // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
}

const instance = {
  location: null,
  options,
  isready: false,
  ready(callback) {
    callback && callback()
  }
}

const ua = window.navigator.userAgent
const isWX = ua.indexOf('MicroMessenger') > -1

if ("geolocation" in navigator && !isWX) {
  // 浏览器
  instance.location = new BrowserLocation(instance.options)
  instance.isready = true
} else {
  // 微信webview
  if (isWX) {
    instance.ready = callback => {
      if (!window.wx) {
        throw new Error('引入wx jssdk')
      }
      if (!instance.isready) {
        instance.location = new WXBrowserLocation(instance.options)
        instance.location.check().then(() => {
          instance.isready = true
          callback && callback()
        })
      }
    }
  }
}

const methods = ['start']

methods.forEach(method => {
  Object.defineProperty(instance, method, {
    enumerable: true,
    configurable: true,
    get() {
      if (!instance.isready) {
        throw new Error('no ready')
      }
      return instance.location[method]
    }
  })
})

export default instance