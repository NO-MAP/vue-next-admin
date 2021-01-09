<template>
  <el-dialog
    custom-class="role-dialog"
    :fullscreen="isMobile"
    :title="title"
    v-model="flag"
    :before-close="beforeCloseHandle"
    width="600px"
  >
    <el-form
      :disabled="status == 'view'"
      ref="formRef"
      label-position="left"
      label-width="90px"
      :model="form"
      :rules="rules"
      label-suffix=":"
    >
      <el-form-item prop="userName" label="用户名">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item prop="roles" label="角色">
        <el-select v-model="form.roles" multiple style="width: 100%">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
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
import { getRolesList } from "@/api/role";
import { addUser, editUser } from "@/api/user";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { SWR, useSWR } from "@/hooks/useSWR";
export default {
  name: "UserDialog",
  emits: ["done"],
  setup(props, { emit }) {
    const { getters } = useStore();
    const flag = ref(false);
    const status = ref("view");
    const formRef = ref(null);
    const isMobile = computed(() => getters["app/isMobile"]);
    const roleList = ref([]);
    const title = computed(() => {
      const obj = {
        add: "新增用户",
        edit: "编辑用户",
        view: "查看用户",
      };
      return obj[status.value];
    });
    const rules = {
      userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      roles: [{ required: true, message: "请选择角色", trigger: "blur" }],
    };
    const form = reactive({
      id: "",
      userName: "",
      email: "",
      roles: [],
    });

    const setForm = (data) => {
      for (let i in data) {
        if (form[i] != undefined) {
          form[i] = data[i];
        }
      }
    };

    const resetForm = () => {
      formRef.value.resetFields();
      setForm({
        id: "",
        userName: "",
        email: "",
        roles: [],
      });
    };

    const beforeCloseHandle = (done) => {
      resetForm();
      done();
    };

    const setStatus = (val) => {
      status.value = val;
    };

    const show = () => {
      flag.value = true;
    };

    const confirmData = SWR();

    const getRoleList = async () => {
      roleList.value = await getRolesList();
    };

    getRoleList();

    const confirm = () => {
      const _formRef = formRef.value;
      _formRef.validate(async (valid) => {
        if (valid) {
          const { id, userName, email, roles } = form;
          if (status.value == "add") {
            await useSWR(
              addUser({
                userName,
                email,
                roles,
                password: "123456",
                passwordConfirm: "123456",
              }),
              confirmData
            );
          }
          if (status.value == "edit") {
            await useSWR(editUser({ id, userName, email, roles }), confirmData);
          }

          if (confirmData.success) {
            emit("done");
            flag.value = false;
          }
        }
      });
    };

    return {
      flag,
      status,
      formRef,
      isMobile,
      title,
      rules,
      confirmData,
      form,
      roleList,

      show,
      setForm,
      setStatus,
      beforeCloseHandle,
      confirm,
    };
  },
};
</script>

<style>
</style>