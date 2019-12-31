<template>
  <div>
    <div v-if="drawerVisible" :class="mask?'mask':''"></div>
    <transition :name="this.direction=='left'?'slide-right':'slide-left'">
      <div v-if="drawerVisible" @click.stop="closeBtn?'':close" class="drawer">
        <div
          @click.stop="close_"
          class="drawer_body"
          :style="{
            'right':direction=='right'?'0':'auto',
            'left':direction=='left'?'0':'auto',
            'width':width+'px',
            'background': background,
            'overflow-y':scroll?'scroll':'hidden'}"
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
                circle
                size="mini"
                class="close_btn"
                icon="el-icon-close"
                @click="close"
              ></el-button>
            </div>
          </slot>
          <div style="min-height:calc(100vh - 116px);padding: 10px">
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
  inheritAttrs: false,
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
    footerCal: Function,
    // 是否开启滚动
    scroll: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    console.log(this.$attrs, 444);
  },
  watch: {
    drawerVisible(n, o) {
      if (n == true) {
        document.documentElement.style.overflowY = "hidden";
        document.documentElement.style.overflowX = "hidden";
      }
    }
  },
  methods: {
    close() {
      this.$emit("update:drawerVisible", false);
      this.$emit("close");
      document.documentElement.style.overflowY = "scroll";
    },
    close_() {}
  }
};
</script>

<style scoped>
.drawer {
  position: absolute;
  height: 100vh;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000000 !important;
}
.drawer .drawer_body {
  height: 100%;
  position: absolute;
  z-index: 1000001;
  background-color: #fff;
}
.mask {
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 1000000;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
}
.title {
  border-bottom: 0.1px #ddd solid;
  padding: 10px;
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
