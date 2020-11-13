<template>
  <div class="tag-view">标签显示</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TagView",
});
</script>

<style lang="scss" scoped>
.tag-view {
  height: 33px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  box-shadow: 0px 2px 2px rgba(155, 155, 155, 0.5);
}
</style>