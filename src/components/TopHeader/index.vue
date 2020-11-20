<template>
  <div class="top-header">
    <div class="left">
      <SidebarToggle />
      <Breadcrumb />
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import Breadcrumb from "./components/Breadcrumb";
import SidebarToggle from "./components/SidebarToggle";

export default defineComponent({
  name: "TopHeader",
  components: { Breadcrumb, SidebarToggle },
  setup() {},
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
    .breadcrumb {
      padding-left: 10px;
    }
  }
}
</style>
