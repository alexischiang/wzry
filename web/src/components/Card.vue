<template>
  <div class="card-container mt-3 px-3 bg-white">
    <div class="card-header d-flex py-3 bg-white ai-center">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="flex-1 ml-2 fs-l">{{ title }}</div>
      <i class="iconfont icon-moreread"></i>
    </div>
    <div class="card-body py-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import "../scss/variables";
</style>
