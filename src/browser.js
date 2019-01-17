
import Location from './location'

//HTML5 geolocation
export default class BrowserLocation extends Location {

  get h5() {
    return true
  }

  get wxh5() {
    return true
  }

  start() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        const res = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        resolve(res)
      }, error => {
        reject(error)
      })
    })
  }

  stop() {
    
  }
}