/* eslint-disable */
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 分析文件大小
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isProduction = process.env.NODE_ENV === 'production'
const isAnalyz = process.env.NODE_ANALYZ === 'analyz'

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  // 代理
  devServer: {
    proxy: {
      '/prs-rebirth': {
        target: "https://10.0.81.23",
        pathRewrite: {},
        // 是否跨域
        changeOrigin: true,
        // 协议走https，将secure设为false
        secure: false //https绕过ss认证 默认情况下如果请求的服务是https的，并且证书是未认证的的，则该错未认证证书默认是无法使用的。如果想要使用该证书。则需要进行如下配置，关闭安全检测
      }
    }
  },
  // 配别名方法2
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))

    // svg rule loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))


    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)

    // 如果当前模式是体积分析
    if (isAnalyz) {
      config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    // 通过插件配置less全局变量，该方法尝试成功
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
  configureWebpack: config => {
    if (isProduction) {
      // 为生产环境修改配置...
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              compress: {
                drop_console: true,// console
                drop_debugger: false,
                pure_funcs: ['console.log'] // 是否屏蔽掉控制台输出
              },
              sourceMap: false,
              parallel: true, // 多通道并行处理
            }
          })
        ]
      }
    }
  },
  // productionSourceMap: false。不然在最终打包的文件中会出现一些map文件，map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
  // 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 通过插件配置less全局变量，该方法尝试失败
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'less',
  //     patterns: [
  //       //路径一定要写对，建议复制相对路径
  //       path.resolve(__dirname, 'src/style/variables.less')
  //     ]
  //   }
  // },
}
// 将所有的全局css引入到一个less文件，全局引用
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
        patterns: process.env.VUE_APP_VERSION === 'NTA'?
        [path.resolve(__dirname, "src/style/global.less"), path.resolve(__dirname, "src/style/variables.less")]:
        [path.resolve(__dirname, "src/style/global.less"), path.resolve(__dirname, "src/style/variables_ATD.less")],
    })
}