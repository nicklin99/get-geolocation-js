
# 获取地理位置

1. 抹平环境差异，不同环境，一样的调用方法
2. 调用方法支持promise, 环境需要支持promise

## 目录

1. 浏览器使用geolocation
2. 小程序使用微信小程序sdk
3. 微信h5使用微信jsapi sdk


### start()

- 返回
  
字段 | 类型 | 说明
---------|----------|---------
 longitude | 浮点数 | 经度，范围为180 ~ -180。
 latitude | 浮点数 |  纬度，范围为90 ~ -90

### 浏览器、h5获取地理位置

#### 加载页面马上获取

```js
BrowserLocation.ready(()=>{
    BrowserLocation.start().then(res => {
        console.log('location', res)
    }).catch(error => {
        console.error(error)
    })
})
```

#### 调用获取

```js
// 初始化
BrowserLocation.ready()
// 调用
BrowserLocation.start().then(res => {
        console.log('location', res)
    }).catch(error => {
        console.error(error)
    })
```

### 小程序获取地理位置

```js
import location from 'dist/wx'

location.start().then(data => {
    
}).catch(e => {
    // 拒绝授权，打开设置
    if (!e) {
        return wx.openSetting()
    }

    if (e.code === 401) {
        // 拒绝授权无法获取地理位置
    }

    if (e.code === 500) {
        // 获取失败
    }
})
```


## 构建

es6转es5，支持旧浏览器

```bash
yarn add rollup-plugin-node-resolve rollup-plugin-babel babel-preset-latest babel-plugin-external-helpers --dev
```

