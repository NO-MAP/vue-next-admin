<template>
  <el-dropdown class="user" trigger="click">
    <span class="el-dropdown-link">
      <el-avatar
        shape="square"
        size="small"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="toUserCenter">个人中心</el-dropdown-item>
        <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "User",
  setup() {
    const router = useRouter();
    const {dispatch} = useStore();
    const toUserCenter = () => {
      router.push({
        name: "UserCenter",
      });
    };

    const logout = () => dispatch("user/logout");

    return {
      toUserCenter,
      logout,
    };
  },
});
</script>

<style lang="scss">
.user {
  cursor: pointer;
}
</style>