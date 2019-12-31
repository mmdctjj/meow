<template>
  <div id="login">
    <el-row>
      <el-col :span="17">欢迎您的到来</el-col>
      <el-col :span="7" style="height: 100vh; padding: 20px">
        <h2 style="padding:100px 0 50px 0">天天喵，你的极简人生</h2>username:
        <el-input v-model.trim="ruleForm.phone" placeholder="请输入" style="width:97%"></el-input>password:
        <el-input
          v-model.trim="ruleForm.user_pwd"
          placeholder="请输入"
          show-password
          style="width:97%"
        ></el-input>
        <el-button
          type="success"
          style="margin: 15px 0;width: 97%"
          icon="el-icon-edit-outline"
          @click="_login"
        >login</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  name: "login",
  data() {
    return {
      //用户登录信息
      ruleForm: {
        user_pwd: "",
        phone: ""
      }
    };
  },
  methods: {
    _login() {
      //   login(this.ruleForm)
      //     .then(result => {
      //       if (result.data.code == 200) {
      //         this.dialogVisible = false;
      //         localStorage.setItem("token", result.data.msg);
      //         this.$router.push("/");
      //       } else {
      //         this.$message({
      //           type: "error",
      //           message: "error"
      //         });
      //       }
      //     })
      //     .catch(err => {
      //       this.$message({
      //         type: "error",
      //         message: "error"
      //       });
      //     });
      if ((this.ruleForm.user_pwd || this.ruleForm.phone) == "") {
        return;
      }
      localStorage.setItem("token", result.data.msg);
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
#login {
  color: black;
  font-weight: bold;
  line-height: 250%;
}
</style>
