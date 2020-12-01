<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-button type="primary" :loading="testData.loading" @click="test"
      >test</el-button
    >
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

// api
import { hello } from "@/api/login";
import { defineComponent } from "vue";
import { SWR, useSWR } from "@/hooks/useSWR";

export default defineComponent({
  name: "Home",
  components: { HelloWorld },
  setup() {
    const testData = SWR();
    const test = async () => {
      await useSWR(hello(), testData);
      console.log(testData.result);
    };

    return {
      test,
      testData,
    };
  },
});
</script>
