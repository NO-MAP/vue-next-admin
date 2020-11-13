<template>
  <div class="top-header">
    <button @click="toggleSidebar">test</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TopHeader",
  setup() {
    const store = useStore();
    const toggleSidebar = () => store.commit("app/TOGGLE_SIDEBAR");

    return {
      toggleSidebar,
    };
  },
});
</script>

<style lang="scss" scoped>
.top-header {
  height: 50px;
  width: 100%;
  background-color: white;
}
</style>
