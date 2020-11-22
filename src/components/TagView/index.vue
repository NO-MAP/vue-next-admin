<template>
  <div class="tag-view">
    <div class="list-wrap">
      <div
        class="scrollbar-wra"
        :class="{ 'is-mobile': isMobile }"
        id="tagScrollBar"
      >
        <Tag
          v-for="item in tagView"
          :key="item.path"
          :active="item.path == route.path"
          :unclose="item.meta.unclose"
          @select="tagSelectHandle(item)"
          @close="tagCloseHandle(item)"
          >{{ item.meta.title }}</Tag
        >
      </div>
    </div>
    <div class="opra">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i
            style="margin-left: 0px"
            class="opra-icon el-icon-arrow-down el-icon--right"
          ></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="closeAllTag">关闭所有</el-dropdown-item>
            <el-dropdown-item @click="closeOtherTag">关闭其他</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { IsPC } from "@/utils/tool";
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Tag from "./Tag";

export default defineComponent({
  name: "TagView",
  components: { Tag },
  setup() {
    const { getters, commit } = useStore();
    const isMobile = ref("true");
    IsPC() ? (isMobile.value = false) : (isMobile.value = true);
    const tagView = computed(() => getters["app/tagView"]);
    const route = useRoute();

    const router = useRouter();
    const tagSelectHandle = (route) => {
      router.push({
        name: route.name,
      });
    };

    const tagCloseHandle = (route) => {
      commit("app/DEL_TAG", {
        currentPath: route.path,
        route,
      });
    };

    const closeAllTag = () => {
      commit("app/CLEAR_TAG", {
        currentPath: route.path,
      });
    };

    const closeOtherTag = () => {
      commit("app/CLEAR_OTHER_TAG", {
        currentPath: route.path,
      });
    };

    const mouseWheelHandle = (e) => {
      const dom = document.getElementById("tagScrollBar");
      const d = e.wheelDelta > 0 ? -40 : 40;
      dom.scrollLeft += d;
    };

    onMounted(() => {
      const dom = document.getElementById("tagScrollBar");
      dom.addEventListener("mousewheel", mouseWheelHandle);
    });

    onBeforeUnmount(() => {
      const dom = document.getElementById("tagScrollBar");
      dom.removeEventListener("mousewheel", mouseWheelHandle);
    });

    return {
      tagView,
      route,
      tagSelectHandle,
      tagCloseHandle,
      closeAllTag,
      closeOtherTag,
      isMobile,
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
  .opra {
    height: 33px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .opra-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 33px;
      width: 33px;
    }
  }
  .list-wrap {
    width: calc(100% - 34px);
    box-sizing: border-box;
    padding: 0 10px;
    height: 100%;
    overflow: hidden;
    position: relative;
    .scrollbar-wra {
      scroll-snap-type: x mandatory;
      width: 100%;
      height: 48px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      &.is-mobile {
        height: 31px;
      }
      .tag {
        scroll-snap-align: start;
      }
    }
  }
}
</style>