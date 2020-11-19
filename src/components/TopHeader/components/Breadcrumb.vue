<template>
  <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in breadList" :key="item.path">{{
      item.meta.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { computed, defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const breadList = ref([]);
    const route = useRoute();

    const path = computed(() => route.path);

    const generateList = () => {
      breadList.value = route.matched.filter((item) => item.name != "Layout");
    };

    watch(
      path,
      () => {
        generateList();
      },
      {
        immediate: true,
      }
    );

    return {
      breadList,
      path,
    };
  },
});
</script>

<style>
</style>