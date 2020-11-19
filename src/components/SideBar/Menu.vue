<template>
  <el-menu :collapse="collapse" :collapse-transition="false">
    <el-menu-item index="Home">
      <router-link to="/Home">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </router-link>
    </el-menu-item>
    <MenuItem v-for="item in navs" :key="item.path" :route="item" />
  </el-menu>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import MenuItem from "./MenuItem";

export default defineComponent({
  name: "Menu",
  props: {
    navs: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: { MenuItem },
  setup() {
    const { getters } = useStore();
    const collapse = computed(() => getters["app/collapse"]);

    return {
      collapse,
    };
  },
});
</script>

<style>
</style>