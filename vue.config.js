module.exports = {
  transpileDependencies: [
    'vuetify'
  ], 
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "TimiKeys";
      return args;
    });
  },  
  publicPath: process.env.NODE_ENV === "production" ? "/tm-frontend/" : "/"
}