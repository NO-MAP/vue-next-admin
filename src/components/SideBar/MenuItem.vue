<template>
  <el-menu-item
    :route="route.path.toLocaleLowerCase()"
    v-if="!route.children && !route.hide"
    :index="route.path.toLocaleLowerCase()"
  >
    <i :class="route.icon"></i>
    <span>{{ route.title }}</span>
  </el-menu-item>
  <el-submenu
    v-if="route.children && !route.hide"
    :index="route.path.toLocaleLowerCase()"
  >
    <template #title>
      <i :class="route.icon"></i>
      <span>{{ route.title }}</span>
    </template>
    <MenuItem
      v-for="childRoute in route.children"
      :key="childRoute.path.toLocaleLowerCase()"
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