<template>
  <div class="sidebar">
    <div class="side-title">vue-next-admin</div>
    <Menu />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Menu from "./Menu";

export default defineComponent({
  name: "SideBar",
  components: { Menu },
});
</script>

<style lang="scss" scoped>
.sidebar {
  overflow: hidden;
  .side-title {
    height: 50px;
    background-color: skyblue;
    width: 100%;
    display: flex;
    align-items: center;
  }
}
</style>>