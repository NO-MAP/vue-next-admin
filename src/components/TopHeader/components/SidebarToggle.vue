<template>
  <div class="toggle" v-if="!isMobile" @click="toggleSidebar">
    <i :class="toggleIcon"></i>
  </div>
  <div class="toggle" v-if="isMobile" @click="showSidebar">
    <i class="el-icon-s-unfold"></i>
  </div>
  <el-drawer
    :title="config.stTitle"
    v-if="isMobile"
    size="250px"
    v-model="flag"
    direction="ltr"
    destroy-on-close
  >
    <Menu />
  </el-drawer>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import config from "@/config";

import Menu from "@/components/SideBar/Menu";

export default defineComponent({
  name: "SidebarToggle",
  components: { Menu },
  setup() {
    const flag = ref(false);
    const { commit, getters } = useStore();
    const toggleIcon = computed(() => {
      const collapse = getters["app/collapse"];
      return collapse ? "el-icon-s-unfold" : "el-icon-s-fold";
    });
    const isMobile = computed(() => getters["app/isMobile"]);

    const toggleSidebar = () => commit("app/TOGGLE_SIDEBAR");
    const showSidebar = () => {
      flag.value = true;
    };

    return {
      toggleSidebar,
      toggleIcon,
      isMobile,
      showSidebar,
      flag,
      config,
    };
  },
});
</script>

<style lang="scss" scoped>
.toggle {
  cursor: pointer;
}
</style>