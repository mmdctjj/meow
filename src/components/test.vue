<template>
  <div>
    <div v-if="drawerVisible" @click.stop="close" class="mask"></div>
    <!-- 不同方向使用不用的动画名称，如果在左边，则进入方向是朝 —→ -->
    <transition :name="this.direction=='left'?'slide-right':'slide-left'">
      <div class="drawer">
        <div
          v-if="drawerVisible"
          class="drawer_body"
          :style="{
            'right':direction=='right'?'0':'auto',
            'left':direction=='left'?'0':'auto',
            'width':width+'px',
            'background':background}"
        >
          <slot name="header">
            <div
              v-if="title||closeBtn"
              :style="{'justify-content':title?'space-between':'flex-end'}"
              class="title"
            >
              <div v-if="title">{{title}}</div>
              <el-button
                v-if="closeBtn"
                class="close_btn"
                circle
                size="mini"
                icon="el-icon-close"
                @click="close"
              ></el-button>
            </div>
          </slot>
          <div style="min-height:82vh;padding: 5px 0">
            <slot></slot>
          </div>
          <slot name="footer">
            <div class="footer">
              <el-button size="mini" type="primary" @click="footerOk">确认</el-button>
              <el-button size="mini" @click="footerCal">取消</el-button>
            </div>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    // 是否显示drawer
    drawerVisible: Boolean,
    // drawer方向
    direction: {
      type: String,
      validator(val) {
        return ["right", "left"].indexOf(val) !== -1;
      }
    },
    // drawer宽度
    width: {
      type: Number,
      default: 400
    },
    // drawer背景色
    background: {
      type: String,
      default: "#ffffff"
    },
    // 是否显示遮罩层
    mask: {
      type: Boolean,
      default: true
    },
    // drawer标题
    title: String,
    // 是否显示关闭按钮
    closeBtn: {
      type: Boolean,
      default: false
    },
    footerOk: Function,
    footerCal: Function
  },
  methods: {
    close() {
      this.$emit("update:drawerVisible", false);
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.drawer {
  /*z-index必须有这个属性才能生效*/
  position: absolute;
  z-index: 100001;
  height: 100vh;
  /*初始化这些默认值为0*/
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.mask {
  position: absolute;
  z-index: 100000;
  width: 100%;
  height: 100%;
  background: aquamarine;
}
.drawer .drawer_body {
  position: absolute;
  width: 100%;
  height: 100%;
}
.title {
  padding: 15px;
  border-bottom: 0.1px #ddd solid;
  padding-bottom: 8px;
  color: #000;
  display: flex;
  justify-content: space-between;
}
.close_btn {
  color: #000;
  border: none;
  background: none;
}
.footer {
  border-top: 0.1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: transform 300ms;
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.slide-right-enter,
.slide-right-leave-active {
  transform: translate(-100%, 0);
}
.slide-left-leave-active,
.slide-left-enter {
  transform: translate(100%, 0);
}
</style>