<template>
  <div class="theme-picker">
    <el-color-picker
      size="mini"
      @change="pikcerChangeHandle"
      :value="mainColor"
    ></el-color-picker>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from "vue";

import Color from "color";
import { addCSS, delCSS } from "@/utils/tool";
import { useStore } from "vuex";

export default defineComponent({
  name: "ThemePicker",

  setup() {
    const { getters, commit } = useStore();
    const mainColor = computed(() => getters["app/theme"].mainColor);

    const generateCss = async () => {
      delCSS("themeCss");
      const {
        mainColor,
        reverseColor,
        reverseColor2,
        reverseColor3,
        reverseColor4,
      } = getters["app/theme"];
      const styleCode = `
        :root {
          --main: ${mainColor};
          --reverse: ${reverseColor};
          --reverse2: ${reverseColor2};
          --reverse3: ${reverseColor3};
          --reverse4: ${reverseColor4};
        }
      `;
      await addCSS(styleCode, "themeCss");
    };

    const pikcerChangeHandle = (val) => {
      const _Color = Color(val);
      const isLight = _Color.isLight();
      const mixColor = isLight ? Color("#291415") : Color("#ffeaeb");
      const mainColor = _Color.mix(mixColor, 0.7).string();
      const reverseColor = _Color.mix(mixColor, 0.6).string();
      const reverseColor2 = _Color.mix(mixColor, 0.4).string();
      const reverseColor3 = _Color.mix(mixColor, 0.2).string();
      const reverseColor4 = _Color.mix(mixColor, 0.1).string();

      const theme = {
        mainColor,
        isLight,
        isDark: !isLight,
        reverseColor,
        reverseColor2,
        reverseColor3,
        reverseColor4,
      };
      commit("app/SET_THEME", theme);
      generateCss();
    };

    onMounted(() => {
      generateCss();
    });

    return {
      mainColor,
      pikcerChangeHandle,
    };
  },
});
</script>

<style>
</style>