<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { _debounce } from "@/utils/tool";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import config from "./config";

export default defineComponent({
  name: "app",
  setup() {
    document.title = config.title;
    const { commit } = useStore();
    const setSize = () => {
      const boxrect = document.getElementById("app").getBoundingClientRect();
      const size = {
        w: boxrect.width,
        h: boxrect.height,
      };
      commit("app/SET_APP_SIZE", size);
    };
    setSize();
    const resizeHandle = () => {
      return _debounce(setSize, 500, false);
    };
    window.addEventListener("resize", resizeHandle());

    return {
      resizeHandle,
    };
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeHandle());
  },
});
</script>

<style lang="scss">
</style>
