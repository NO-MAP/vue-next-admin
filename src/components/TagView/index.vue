<template>
  <div class="tag-view">
    <div class="list-wrap">
      <Tag
        v-for="item in tagView"
        :key="item.path"
        :active="item.path == currentPath"
        :unclose="item.meta.unclose"
        @select="tagSelectHandle(item)"
        @close="tagCloseHandle(item)"
        >{{ item.meta.title }}</Tag
      >
    </div>
    <div class="opra">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i
            style="margin-left: 0px"
            class="el-icon-arrow-down el-icon--right"
          ></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Tag from "./Tag";

export default defineComponent({
  name: "TagView",
  components: { Tag },
  setup() {
    const { getters } = useStore();
    const tagView = computed(() => getters["app/tagView"]);
    const currentPath = computed(() => {
      const route = useRoute();
      return route.path;
    });

    const router = useRouter();
    const tagSelectHandle = (route) => {
      router.push({
        name: route.name,
      });
    };

    const tagCloseHandle = (route) => {
      console.log("close", route);
    };

    return {
      tagView,
      currentPath,
      tagSelectHandle,
      tagCloseHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
.tag-view {
  height: 33px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .opra {
    height: 33px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
  .list-wrap {
    width: calc(100% - 33px);
    box-sizing: border-box;
    padding: 0 10px;
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>