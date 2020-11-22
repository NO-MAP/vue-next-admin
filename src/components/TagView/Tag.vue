<template>
  <div
    class="tag"
    @click="selectTag"
    :class="{ active: active, unclose: unclose }"
  >
    <span>
      <slot></slot>
    </span>
    <i @click.stop="closeTag" v-if="!unclose" class="el-icon-close"></i>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Tag",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    unclose: {
      type: Boolean,
      default: false,
    },
  },
  emit: ["select", "close"],
  setup(props, { emit }) {
    const selectTag = () => {
      if (props.active) return false;
      emit("select");
    };

    const closeTag = () => {
      emit("close");
    };

    return {
      selectTag,
      closeTag,
    };
  },
});
</script>

<style lang="scss">
.tag {
  height: 24px;
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 0 6px;
  cursor: pointer;
  position: relative;
  margin: 0 5px;
  flex-shrink: 0;
  &.active {
    padding-left: 14px;
    &::before {
      content: "";
      height: 8px;
      width: 8px;
      border-radius: 50%;
      position: absolute;
      left: 4px;
    }
  }
  span {
    padding: 0 2px;
  }
  i {
    display: inline-block;
    height: 14px;
    width: 14px;
    text-align: center;
    line-height: 16px;
    cursor: pointer;
    font-size: 12px;
    border-radius: 50%;
    transition: 0.3s;
    &::before {
      transform: scale(0.6);
      display: inline-block;
    }
    &:hover {
      
      vertical-align: -3px;
    }
  }
}
</style>