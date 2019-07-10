import request from "@/http/request";

// 获取list列表
export function getToDoList() {
  return request({
    url: "/todo/getToDoList",
    method: "get"
  });
}

// 增加todo
export function addToDo(todo) {
  console.log(todo);
  return request({
    url: "/todo/addToDo",
    method: "post",
    data: {
      todo: todo
    }
  });
}

// 删除todo
export function delTodo(id) {
  return request({
    url: "/todo/delTodo",
    method: "get",
    params: {
      id
    }
  });
}

// done todo
export function doneTodo(id) {
  return request({
    url: "/todo/doneTodo",
    method: "get",
    params: {
      id
    }
  });
}
