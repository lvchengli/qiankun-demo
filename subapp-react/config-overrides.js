module.exports = {
  webpack: (config) => {
    config.output.library = `subapp-react`;
    config.output.libraryTarget = "umd";
    config.output.publicPath = 'http://localhost:10012/'
    return config
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.headers = {
        "Access-Control-Allow-Origin": "*",
      };
      return config;
    };
  },
};