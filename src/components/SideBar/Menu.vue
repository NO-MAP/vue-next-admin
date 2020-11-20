<template>
  <el-menu
    :collapse="collapse"
    :default-active="route.path"
    router
    :collapse-transition="false"
    @select="selectHandle"
  >
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
    </el-menu-item>
    <MenuItem v-for="item in navs" :key="item.path" :route="item" />
  </el-menu>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import MenuItem from "./MenuItem";

export default defineComponent({
  name: "Menu",
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  components: { MenuItem },
  setup() {
    const { getters } = useStore();
    const route = useRoute();
    const router = useRouter();
    const navs = computed(() => getters["user/navRoutes"]);
    const selectHandle = (index) => {
      router.push({
        path: index,
      });
    };
    return {
      navs,
      route,
      selectHandle,
    };
  },
});
</script>

<style lang="scss">
</style>