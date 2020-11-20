<template>
  <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in breadList" :key="item.path">{{
      item.meta.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const breadList = ref([]);
    const route = useRoute();

    const generateList = () => {
      breadList.value = route.matched.filter((item) => item.name != "Layout");
    };

    watch(
      () => route.path,
      () => {
        generateList();
      },
      {
        immediate: true,
      }
    );

    return {
      breadList,
    };
  },
});
</script>

<style>
</style>