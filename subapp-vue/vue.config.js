module.exports = {
  devServer:{
      port:10011,
      headers:{
          'Access-Control-Allow-Origin':'*'
      }
  },
  configureWebpack:{
      output:{
          library:'vueApp',
          libraryTarget:'umd'
      }
  }
}