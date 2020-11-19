<template>
  <el-menu-item v-if="!route.children && !route.hide" :index="route.path">
    <router-link :to="route.path">
      <i :class="route.icon"></i>
      <span>{{ route.title }}</span>
    </router-link>
  </el-menu-item>
  <el-submenu v-if="route.children && !route.hide" :index="route.path">
    <template #title>
      <i :class="route.icon"></i>
      <span>{{ route.title }}</span>
    </template>
    <MenuItem
      v-for="childRoute in route.children"
      :key="childRoute.path"
      :route="childRoute"
    />
  </el-submenu>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuItem",
  props: {
    route: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>