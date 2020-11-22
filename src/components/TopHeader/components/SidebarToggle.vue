<template>
  <div class="toggle" v-if="!isMobile" @click="toggleSidebar">
    <i :class="toggleIcon"></i>
  </div>
  <div class="toggle" v-if="isMobile" @click="showSidebar">
    <i class="el-icon-s-unfold"></i>
  </div>
  <el-drawer
    custom-class="toggle-drawer"
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
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import config from "@/config";

import Menu from "@/components/SideBar/Menu";
import { useRoute } from "vue-router";

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
    const route = useRoute();

    const toggleSidebar = () => commit("app/TOGGLE_SIDEBAR");
    const showSidebar = () => {
      flag.value = true;
    };

    watch(() => route.path, () => {
      flag.value = false;
    })

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
  padding: 10px 5px;

  i {
    font-size: 20px;
  }
}
</style>