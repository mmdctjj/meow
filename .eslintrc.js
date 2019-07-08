module.exports = {
  // 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 package.json 文件或者 .eslintrc.* 文件里的 eslintConfig 字段下设置 "root": true。ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,
  // extends: 继承属性，值可以是 "eslint:recommended" "eslint:all" 或者是个插件 或者是个文件
  extends: [
    "eslint:recommended",
    "eslint:all"
    // "plugin:react/recommended"
  ],
  // env: 指定运行的环境，可选值有browser、node、es6等等，值为布尔类型，true为开启，默认为false
  env: {
    browser: true
  },
  // plugins: 指定插件，使用之前需下载，vue项目中使用的话vue就是属于插件
  plugins: [
    "vue"
    // "react"
  ],
  // rules: 指定语法规则，分为0,1,2三个等级对应off（关闭检测），warn（只警告），error（直接报错）
  rules: {
    eqeqeq: "off",
    curly: "1", // if结构中必须使用{}
    quotes: ["1", "double"]
    // 更多rules看这里 https://www.jianshu.com/p/80267604c775
    // 这里要说下rules的extends特性
    // 假如你的设置是这样的
    // "eqeqeq": ["error", "allow-null"]
    // "eqeqeq": "warn"
    // 那么它最后生成的配置是 "eqeqeq": ["warn", "allow-null"]
  }
};
