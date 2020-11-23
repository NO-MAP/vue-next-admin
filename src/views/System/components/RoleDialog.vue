<template>
  <el-dialog
    custom-class="role-dialog"
    :fullscreen="isMobile"
    :title="title"
    v-model="flag"
    @close="closeHandle"
  >
    {{ confirmData.loading }}
    <el-form
      :disabled="status == 'view'"
      ref="formRef"
      label-position="left"
      label-width="80px"
      :modle="form"
      :rules="rules"
    >
      <el-form-item prop="roleName" label="角色名称">
        <el-input v-model="form.roleName"></el-input>
      </el-form-item>
      <el-form-item prop="roleCode" label="角色编码">
        <el-input v-model="form.roleCode"></el-input>
      </el-form-item>
    </el-form>
    <template #footer v-if="status != 'view'">
      <el-button type="text" @click="resetForm">重置</el-button>
      <el-button type="primary" :loading="confirmData.loading" @click="confirm"
        >确定</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
import { addRole, editRole } from "@/api/role";
import { SWR, useSWR } from "@/hooks/useSWR";
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "RoleDialog",
  emits: ["done"],
  setup(props, { emit }) {
    const { getters } = useStore();
    const flag = ref(false);
    const status = ref("view");
    const formRef = ref(null);
    const form = reactive({
      id: "",
      roleName: "",
      roleCode: "",
    });
    const rules = [];

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

    const setForm = (data) => {
      for (let i in data) {
        if (form[i] != undefined) {
          form[i] = data[i];
        }
      }
    };

    const resetForm = () => {
      setForm({
        id: "",
        roleName: "",
        roleCode: "",
      });
      formRef.value.resetFields();
    };

    const setStatus = (val) => {
      status.value = val;
    };

    const closeHandle = () => {
      resetForm();
    };

    const confirmData = SWR();

    const confirm = async () => {
      const { id, roleName, roleCode } = form;
      if (status.value == "add") {
        await useSWR(addRole({ roleName, roleCode }), confirmData);
      }
      if (status.value == "edit") {
        await useSWR(editRole({ id, roleName, roleCode }), confirmData);
      }
      if (confirmData.success) {
        emit("done");
        flag.value = false;
      }
    };

    return {
      flag,
      status,
      title,
      show,
      isMobile,
      formRef,
      form,
      rules,
      setForm,
      resetForm,
      setStatus,
      closeHandle,
      confirm,
      confirmData,
    };
  },
});
</script>

<style lang="scss" scope>
.role-dialog {
  .el-dialog__body {
    height: calc(100% - 172px);
  }
}
</style>