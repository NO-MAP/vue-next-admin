<template>
  <div class="sidebar">
    <div class="side-title">
      <div class="logo">
        <img src="/imgs/logo.png" alt="lgoo" />
      </div>
      <div v-if="!collapse" class="logo-text">VNEXT-ADMIN</div>
    </div>
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

<style lang="scss">
.sidebar {
  overflow: hidden;
  .side-title {
    height: 64px;
    width: 100%;
    position: relative;
    .logo {
      position: absolute;
      left: 0px;
      top: 0px;
      height: 64px;
      width: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 50px;
        width: 50px;
      }
    }
    .logo-text {
      margin-left: 64px;
      width: 136px;
      height: 64px;
      line-height: 64px;
      text-align: center;
      white-space: nowrap;
    }
  }
}
</style>>