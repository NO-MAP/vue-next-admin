<template>
  <div class="layout" :class="layoutClass">
    <SideBar v-if="!isMobile" />
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
    const layoutClass = computed(() => {
      const sdClass = [];
      getters["app/isMobile"] ? sdClass.push("mobile") : "";
      getters["app/collapse"] ? sdClass.push("closed") : sdClass.push("open");
      return sdClass.join(" ");
    });

    const isMobile = computed(() => getters["app/isMobile"]);

    return {
      layoutClass,
      isMobile,
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
    transition: 0.3s;

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

  &.mobile {
    .layout-content {
      width: 100%;
    }
  }
}
</style>
