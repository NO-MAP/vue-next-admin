<template>
  <div class="earth-wrapper" id="earthDom" v-dragable="options">
    <div class="drag-trigger">
      <i class="el-icon-rank"></i>
    </div>
    <img :style="angleStyle" src="/imgs/login/earth-shadow.png" alt />
  </div>
</template>

<script>
import { computed, defineComponent, onUnmounted, ref } from "vue";

export default defineComponent({
  name: "EarthWrapper",
  setup(props, ctx) {
    const angle = ref(0);
    const options = {
      trigger: ".drag-trigger",
      body: ".earth-wrapper",
    };
    const updateRotate = (e) => {
      const oriRect = document
        .getElementById("earthDom")
        .getBoundingClientRect();
      const rect = {
        x: oriRect.x + 250,
        y: oriRect.y + 250,
      };
      const ePosition = {
        x: e.pageX,
        y: e.pageY,
      };
      ctx.emit("earth-mouse-move", ePosition);

      const x = Math.abs(rect.x - ePosition.x);
      const y = Math.abs(rect.y - ePosition.y);
      const a = Math.atan(x / y);
      const _angle = (
        Math.round((((a * 180) / Math.PI) % 360) * 1000) / 1000
      ).toFixed();
      if (ePosition.x >= rect.x && ePosition.y < rect.y) {
        angle.value = parseInt(_angle);
      } else if (ePosition.x >= rect.x && ePosition.y >= rect.y) {
        angle.value = 180 - parseInt(_angle);
      } else if (ePosition.x < rect.x && ePosition.y >= rect.y) {
        angle.value = 180 + parseInt(_angle);
      } else if (ePosition.x < rect.x && ePosition.y < rect.y) {
        angle.value = 360 - parseInt(_angle);
      }
    };

    document.addEventListener("mousemove", updateRotate);

    const angleStyle = computed(() => {
      return {
        transform: `rotate(${angle.value}deg)`,
      };
    });

    onUnmounted(() => {
      document.removeEventListener("mousemove", updateRotate);
    });

    return {
      options,
      angleStyle,
    };
  },
});
</script>

<style lang="scss">
.earth-wrapper {
  height: 500px;
  width: 500px;
  background-image: url("/imgs/login/earth.png");
  background-size: 100% 100%;
  position: absolute;
  bottom: 40px;
  left: 40px;
  border-radius: 250px;
  overflow: hidden;

  .drag-trigger {
    z-index: 10;
    height: 30px;
    width: 30px;
    position: absolute;
    top: 100px;
    left: 100px;
    color: white;
    font-size: 26px;
    transition: 0.5s;
    opacity: 0;
  }

  &:hover {
    .drag-trigger {
      display: block;
      opacity: 1;
    }
  }

  img {
    display: block;
    height: 100%;
    width: 100%;
  }
}
</style>