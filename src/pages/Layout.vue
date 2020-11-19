<template>
  <div class="layout" :class="sideBarState">
    <SideBar />
    <div class="layout-content">
      <TopHeader />
      <TagView />
      <div class="main-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// components
import SideBar from "@/components/SideBar/index.vue";
import TopHeader from "@/components/TopHeader/index.vue";
import TagView from "@/components/TagView/index.vue";

import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Layout",
  components: { SideBar, TopHeader, TagView },
  setup() {
    const { getters } = useStore();
    const sideBarState = computed(() =>
      getters["app/collapse"] ? "closed" : "open"
    );

    return {
      sideBarState,
    };
  },
});
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  width: 100%;
  display: flex;
  .sidebar {
    height: 100%;
    transition: 0.3s;
    background-color: pink;
  }

  .layout-content {
    height: 100%;
    position: relative;

    .main-container {
      width: 100%;
      height: calc(100% - 84px);
      padding: 5px;
      box-sizing: border-box;
    }
  }

  &.open {
    .sidebar {
      width: 250px;
    }

    .layout-content {
      width: calc(100% - 250px);
    }
  }

  &.closed {
    .sidebar {
      width: 64px;
    }

    .layout-content {
      width: calc(100% - 64px);
    }
  }
}
</style>
