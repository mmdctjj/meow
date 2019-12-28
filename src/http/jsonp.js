import jsonp from "jsonp";

// 将Parma参数拼接到url上
function joinParma(url, parma) {
  let str = "";
  for (const key in parma) {
    str += key + "=" + parma[key] + "&";
  }
  str = str.substring(0, str.length - 1);
  str = url.indexOf("?") == -1 ? "?" + str : "&" + str;
  return url + str;
}

export function get(url, parma) {
  var options = {
    parma: "callback",
    timeout: 5000,
    prefix: "",
    name: "callbackFun"
  };
  // 如果有参数就拼接参数，否则不作处理
  if (parma) {
    url = joinParma(url, parma);
  }
  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, res) => {
      if (err) {
        // 可以在这里对错误进行处理，比如引入element-ui等组件库的toast等
        // 将错误提示给用户
        // 也可以根据不同http状态码，导入不同的页面
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}
