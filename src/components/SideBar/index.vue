<template>
  <div class="sidebar">
    <div class="side-title">vue-next-admin</div>
    <Menu :navs="navs" />
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import Menu from "./Menu";

export default defineComponent({
  name: "SideBar",
  components: { Menu },
  setup() {
    const { getters } = useStore();
    const navs = computed(() => getters["user/navRoutes"]);
    return {
      navs,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  overflow: hidden;
  .side-title {
    height: 64px;
    background-color: skyblue;
    width: 100%;
    display: flex;
    align-items: center;
  }
}
</style>>