const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("./node_modules/vue-loader/lib/plugin");
const esLint = false;
module.exports = {
  module: {
    rules: [
      { test: /\.vue$/, use: "vue-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      {
        test: /\.(jpg|png|jpeg|woff|ttf|svg|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8000,
            name: "[hash:8]-[name].[ext]"
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      esLint
        ? {
            test: /\.(js|vue)$/,
            loader: "eslint-loader",
            include: [path.resolve(__dirname, "src")], // 指定检查的目录
            options: {
              // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
              formatter: require("eslint-friendly-formatter") // 指定错误报告的格式规范
            }
          }
        : {}
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, "./index.html"),
      filename: "index.html"
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    port: 8080,
    proxy: {
      "/api-dev": {
        target: "http://118.24.80.133:10002", // 代理的目标地址
        changeOrigin: true // 是否开启跨域
      }
    }
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve("src")
    }
  }
};
