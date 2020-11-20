<template>
  <div class="not-found">
    NOTFOUND
    <el-button @click="back">back</el-button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NotFound",
  setup() {
    const router = useRouter();
    const back = () => {
      router.push({ name: "Home" });
    };

    return {
      back,
    };
  },
});
</script>

<style>
</style>