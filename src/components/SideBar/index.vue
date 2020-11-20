<template>
  <div class="sidebar">
    <div class="side-title">vue-next-admin</div>
    <Menu :collapse="collapse" />
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
    const collapse = computed(() => getters["app/collapse"]);

    return {
      collapse,
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