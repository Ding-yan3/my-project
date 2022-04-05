module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        pluginOptions: {
          'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
          }
        }
      }
    }
  }
}