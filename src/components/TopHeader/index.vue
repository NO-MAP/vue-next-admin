<template>
  <div class="top-header">
    <div class="left">
      <div class="toggle" @click="toggleSidebar">
        <i :class="toggleIcon"></i>
      </div>
      <Breadcrumb />
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import Breadcrumb from "./components/Breadcrumb";

export default defineComponent({
  name: "TopHeader",
  components: { Breadcrumb },
  setup() {
    const { commit, getters } = useStore();
    const toggleIcon = computed(() => {
      const collapse = getters["app/collapse"];
      return collapse ? "el-icon-s-fold" : "el-icon-s-unfold";
    });
    const toggleSidebar = () => commit("app/TOGGLE_SIDEBAR");

    return {
      toggleSidebar,
      toggleIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
.top-header {
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    .toggle {
      padding: 10px 5px;
      cursor: pointer;
      i {
        font-size: 20px;
      }
    }
    .breadcrumb{
      padding-left: 10px;
    }
  }
}
</style>
