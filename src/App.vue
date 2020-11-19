<template>
  <div id="app" v-loading="navLoading">
    <router-view />
  </div>
</template>

<script>
import { _debounce } from "@/utils/tool";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "app",
  setup() {
    const { commit, getters } = useStore();
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

    const navLoading = computed(() => getters["user/navLoading"]);

    return {
      resizeHandle,
      navLoading,
    };
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeHandle());
  },
});
</script>

<style lang="scss">
</style>
