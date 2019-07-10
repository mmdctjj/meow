import request from "@/http/request";

export function registered(data) {
  return request({
    url: "/user/registered",
    method: "post",
    data
  });
}

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data
  });
}
