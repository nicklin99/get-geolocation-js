import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'

const env = process.env.NODE_ENV

console.log('NODE_ENV', env)

const h5 = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    name: 'BrowserLocation'
  }
}

const wx = {
  input: 'src/wx.js',
  output: {
    file: 'dist/wx.js',
    format: 'cjs'
  }
}

const configs = {
  h5,
  wx
}

const key = process.argv[4]
console.log('NODE_ENV', key)
if (!key || !configs[key]) {
  throw new Error('没有传配置文件key名')
}

const config = Object.assign({}, configs[key], {
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
})

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config