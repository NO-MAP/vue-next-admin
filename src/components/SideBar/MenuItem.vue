<template>
  <el-menu-item
    :route="route.path"
    v-if="!route.children && !route.meta.hide"
    :index="route.path"
  >
    <i :class="route.meta.icon"></i>
    <span>{{ route.meta.title }}</span>
  </el-menu-item>
  <el-submenu
    v-if="route.children && !route.meta.hide"
    :index="route.path"
  >
    <template #title>
      <i :class="route.meta.icon"></i>
      <span>{{ route.meta.title }}</span>
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
  setup() {},
});
</script>

<style lang="scss" scoped>
</style>