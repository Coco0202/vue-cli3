/* eslint-disable */
const path = require('path')
const webpack = require('webpack')

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
  // 配别名
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@v': 'src/views',
  //     }
  //   }
  // },
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
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
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
  // 
  // 通过插件配置less全局变量，该方法尝试成功
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
}
// 将所有的全局css引入到一个less文件，全局引用
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
        patterns: [path.resolve(__dirname, "src/style/global.less")],
    })
}