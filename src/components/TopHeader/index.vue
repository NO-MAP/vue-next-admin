<template>
  <div class="top-header">
    <div class="left">
      <SidebarToggle />
      <Breadcrumb style="padding-left: 10px" />
    </div>
    <div class="right">
      <FullScreen style="padding-right: 10px" />
      <ThemePicker style="padding-right: 10px" />
      <User />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import Breadcrumb from "./components/Breadcrumb";
import SidebarToggle from "./components/SidebarToggle";
import User from "./components/User";
import FullScreen from "./components/FullScreen";
import ThemePicker from "./components/ThemePicker";

export default defineComponent({
  name: "TopHeader",
  components: { Breadcrumb, SidebarToggle, User, FullScreen, ThemePicker },
  setup() {},
});
</script>

<style lang="scss" scoped>
.top-header {
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  .right {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
