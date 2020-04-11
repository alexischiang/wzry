<template>
  <div class="listcard-container">
    <m-card :title="title" :icon="icon">
      <div class="nav d-flex jc-between ai-center py-2">
        <div
          class="nav-item"
          v-for="(data, i) in cardData"
          :key="i"
          :class="{ active: active === i }"
          @click="$refs.list.swiper.slideTo(i)"
        >
          <div class="nav-link pb-1">{{ data.name }}</div>
        </div>
      </div>
      <swiper
        class="mt-2"
        ref="list"
        @slide-change="() => (active = $refs.list.swiper.realIndex)"
      >
        <swiper-slide v-for="(data, i) in cardData" :key="i">
          <slot name="news-slot" :data="data"></slot>
        </swiper-slide>
      </swiper>
    </m-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      requierd: true
    },
    icon: {
      type: String,
      requierd: true
    },
    cardData: {
      type: Array
    }
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="scss"></style>
