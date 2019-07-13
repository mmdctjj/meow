<template>
  <div>
    <el-container>
      <el-header>
        <div style="display:flex;flex-direction: row-reverse">
          <el-button
            style="margin-left: 10px"
            size="small"
            @click.stop="openHistory"
            circle
            icon="el-icon-time"
          ></el-button>
          <el-button
            style="margin-left: 10px"
            size="small"
            circle
            icon="el-icon-refresh"
            @click.stop="openDialog"
          ></el-button>
        </div>
      </el-header>
      <Drawer
        :drawerVisible.sync="isShowHistory"
        :width="400"
        direction="right"
        background="aquamarine"
        :mask="true"
        title="历史记录"
        :close-btn="true"
        @close="close"
        :footer-ok="footerOk"
        :footer-cal="footerCal"
      >
        <div style="height:100px">sfsdf</div>
      </Drawer>

      <div class="meow">
        <div class="meow-search">
          <img :src="this.optionUrl" style="width:45%" />
          <el-input
            v-model="inputValue"
            class="input-with-select"
            @keyup.enter.native="search"
            placeholder="请输入"
          >
            <el-select v-model="optionValue" :multiple="false" slot="prepend" placeholder="请选择">
              <el-option
                v-for="(item,index) in optionItem"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button slot="append" @click="search">{{this.optionLabel}}搜索</el-button>
          </el-input>
          <br />
          <br />
          <br />
          <br />
          <TodoList></TodoList>
        </div>
      </div>
    </el-container>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px">
        <el-form-item label="手机号">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="ruleForm.user_pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_login">注册或登录</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import TodoList from "@/components/todoList";
import Drawer from "@/components/drawer";
import Test from "@/components/test";
import bd_logo from "@/imgs/bd_logo.png";
import gg_logo from "@/imgs/google.png";
import { login } from "@/api/user";
import { getToDoList } from "@/api/todo";
import {
  Input,
  Select,
  Option,
  Button,
  Container,
  Dialog,
  Header,
  Form,
  FormItem,
  Notification
} from "element-ui";
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.prototype.$notify = Notification;
export default {
  name: "hello",
  data() {
    return {
      // 搜索内容
      inputValue: "",
      // 选中的搜索引擎值
      optionValue: "baidu",
      // 选中的搜索引擎名称
      optionLabel: "百度",
      // 选中的搜索引擎logo
      optionUrl: bd_logo,
      // 下拉框数据
      optionItem: [
        {
          value: "google",
          label: "谷歌",
          url: gg_logo
        },
        {
          value: "baidu",
          label: "百度",
          url: bd_logo
        }
      ],
      // 是否显示对话框
      dialogVisible: false,
      //用户登录信息
      ruleForm: {
        user_pwd: "",
        phone: ""
      },
      // 是否登录
      isLogin: false,
      // 是否打开历史记录栏目
      isShowHistory: false,
      drawerVisible: false
    };
  },
  components: {
    TodoList,
    Drawer,
    Test
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
    } else {
      this.$notify.error({
        title: "错误",
        message: "请登录"
      });
      this.dialogVisible = true;
    }
  },
  watch: {
    // 这里监听option的值变化
    optionValue(n) {
      this.optionLabel = this.findLabel(this.optionItem, n).label;
      this.optionUrl = this.findLabel(this.optionItem, n).url;
    }
  },
  methods: {
    // 搜索事件
    search() {
      if (this.optionValue == "baidu") {
        window.open(
          "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=" +
            this.inputValue,
          "_blank"
        );
      } else if (this.optionValue == "google") {
        window.open(
          "https://www.google.com/search?source=hp&ei=0uUiXeevLJXZz7sP7rSFsAM&q=" +
            this.inputValue,
          "_blank"
        );
      }
    },
    // 根据option的value值查找对应的label值
    findLabel(arr, n) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value == n) {
          return arr[i];
        }
      }
    },
    // 开启对话框
    openDialog() {
      if (this.isLogin) {
        getToDoList()
          .then(req => {
            if (req.data.code == 200) {
              this.$notify({
                title: "成功",
                message: "同步数据成功",
                type: "success"
              });
            } else {
              this.$notify.error({
                title: "错误",
                message: "同步数据错误"
              });
            }
          })
          .catch(err => {});
      } else {
        this.dialogVisible = true;
      }
    },
    // 关闭对话框
    handleClose() {
      this.dialogVisible = false;
    },
    _login() {
      login(this.ruleForm)
        .then(result => {
          if (result.data.code == 200) {
            this.dialogVisible = false;
            localStorage.setItem("token", result.data.msg);
          } else {
            this.dialogVisible = false;
            alert("err");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 打开历史
    openHistory() {
      this.isShowHistory = true;
      console.log("jjjj");
      // this.drawerVisible = true;
    },
    // 监听关闭事件
    close() {
      console.log("kkkk");
    },
    footerOk() {
      console.log("footerok");
    },
    footerCal() {
      console.log("footercal");
    }
  }
};
</script>

<style>
.el-select .el-input {
  width: 80px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input-group__append .el-button {
  background-color: #3385ff !important;
  color: #fff !important;
  border-radius: 0px !important;
  border-color: #3385ff !important;
  border: 10px !important;
}
.meow {
  text-align: center;
}
.meow-search {
  width: 700px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}
.dialog {
  right: 0px;
}
</style>
