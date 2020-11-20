<template>
  <el-menu :collapse="collapse" router :collapse-transition="false">
    <el-menu-item index="home">
      <router-link to="/home">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </router-link>
    </el-menu-item>
    <MenuItem v-for="item in navs" :key="item.path" :route="item" />
  </el-menu>
</template>

<script>
import { defineComponent, computed } from "vue";
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
    const navs = computed(() => getters["user/navRoutes"]);
    return {
      navs,
    };
  },
});
</script>

<style>
</style>