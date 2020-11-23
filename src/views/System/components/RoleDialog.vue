<template>
  <el-dialog :fullscreen="isMobile" :title="title" v-model="flag">
    <template #footer>
      <el-button type="text">重置</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "RoleDialog",
  setup() {
    const { getters } = useStore();
    const flag = ref(false);
    const status = ref("view");

    const show = () => {
      flag.value = true;
    };

    const isMobile = computed(() => getters["app/isMobile"]);

    const title = computed(() => {
      const obj = {
        add: "新增角色",
        edit: "编辑角色",
        view: "查看角色",
      };
      return obj[status.value];
    });

    return {
      flag,
      status,
      title,
      show,
      isMobile,
    };
  },
});
</script>

<style>
</style>