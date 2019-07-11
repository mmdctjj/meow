<template>
  <div id="todoList">
    <el-input
      v-model="input"
      placeholder="今天要做什么，点击这里告诉小喵哦"
      :clearable="true"
      @keyup.enter.native="enter"
      :style="{'width':'600px'}"
    ></el-input>
    <br />
    <br />
    <div>
      <div style="text-align:left">
        <div v-for="(item,index) in todoList" :key="index">
          <div class="todo" @click="doneEvent(index)">
            <span :class="item.is_finsh!=0?'done':''">{{index+1}}. {{item.item}}</span>
            <el-button
              size="mini"
              :style="{'float':'right','display':'none','margin-top':'5px'}"
              icon="el-icon-close"
              circle
              class="button"
              @click.stop="del(index,$event)"
            ></el-button>
          </div>
        </div>
      </div>
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
import Vue from "vue";
import { Checkbox, Menu, Submenu, MenuItem } from "element-ui";
import { getToDoList, addToDo, delTodo, doneTodo } from "@/api/todo";
Vue.use(Checkbox);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
export default {
  data() {
    return {
      input: "",
      todoList: []
    };
  },
  created() {
    this._getTodoList();
  },
  methods: {
    // 回车事件
    enter() {
      if (this.input != "" && localStorage.getItem("token") != null) {
        addToDo(this.input)
          .then(result => {
            this._getTodoList();
            this.input = "";
          })
          .catch(err => {});
      } else {
        this.$notify.error({
          title: "错误",
          message: "您还没有登录"
        });
      }
    },
    // 已经做完
    doneEvent(index) {
      if (this.todoList[index].is_finsh == 0) {
        this.todoList[index].is_finsh = 1;
      } else {
        this.todoList[index].is_finsh = 0;
      }
      doneTodo(this.todoList[index].id)
        .then(result => {})
        .catch(err => {});
    },
    // 删除
    del(index) {
      delTodo(this.todoList[index].id)
        .then(result => {
          this._getTodoList();
        })
        .catch(err => {});
    },
    // 获取todoList
    _getTodoList() {
      getToDoList()
        .then(result => {
          this.todoList = result.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less">
#todoList input {
  border: none !important;
  border-radius: 0px;
  font-size: 20px;
  color: #888;
}
#todoList input:focus {
  border-bottom: 1px solid #aaa !important;
}
#todoList input::-webkit-input-placeholder {
  text-align: center;
}
.todo {
  line-height: 230%;
  color: #666;
  cursor: pointer;
  font-size: 18px;
  color: #888;
}
.done {
  text-decoration: line-through;
  color: #aaa;
}
.todo:hover .button {
  display: inline !important;
}
</style>
