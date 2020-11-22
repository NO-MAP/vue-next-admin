<template>
  <div class="full-screen">
    <el-tooltip effect="dark" :content="isFull ? '取消全屏' : '全屏'">
      <i @click="FullScreenHandle" class="el-icon-full-screen"></i>
    </el-tooltip>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FullScreen",
  setup() {
    const isFull = ref(false);

    const FullScreenHandle = () => {
      const main = document.body;
      if (isFull.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen();
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen();
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen();
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen();
        }
      }
      isFull.value = !isFull.value;
    };
    return {
      isFull,
      FullScreenHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
.full-screen {
  cursor: pointer;
  i {
    font-size: 16px;
  }
}
</style>