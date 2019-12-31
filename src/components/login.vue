<template>
  <div id="login">
    <el-row>
      <el-col :span="17">欢迎您的到来</el-col>
      <el-col :span="6" style="margin-top: 100px">
        username:
        <el-input v-model.trim="username" placeholder="请输入" style="width:100%"></el-input>password:
        <el-input v-model.trim="password" placeholder="请输入" style="width:100%"></el-input>
        <el-button
          type="success"
          style="margin: 15px 0;width: 100%"
          icon="el-icon-edit-outline"
          @click="login"
        >login</el-button>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      if ((this.password || this.username) == "") {
        return;
      }
      localStorage.setItem("token") == this.username;
    }
  }
};
</script>

<style>
#login {
  color: black;
  font-weight: bold;
  line-height: 250%;
}
</style>
