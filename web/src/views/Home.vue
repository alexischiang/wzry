<template>
  <div class="home">
    <swiper :options="swiperOption" class="mb-3">
      <swiper-slide>
        <img src="../assets/swiper/swiper1.jpeg" alt="" class="w-100" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/swiper/swiper2.jpeg" alt="" class="w-100" />
      </swiper-slide>
      <div
        class="swiper-pagination home-pagination text-right pr-4"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of index swiper -->
    <div class="nav-container">
      <div class="sprite-icons d-flex flex-wrapped text-center bg-white">
        <div class="sprite-item my-3" v-for="n in spriteItems" :key="n">
          <i class="sprite sprite-blz my-1"></i>
          <div>{{ n }}</div>
        </div>
      </div>
      <div class="bg-light py-2 d-flex jc-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav container -->
    <list-card title="新闻资讯" icon="menu" :cardData="newsData">
      <template #news-slot="{data}">
        <div
          class="d-flex ai-center fs-l"
          style="height:30px"
          v-for="(item, i) in data.newsList"
          :key="i"
        >
          <p class="text-grey mr-1">[{{ item.categoryName }}]</p>
          <p class="flex-1 text-ellipsis px-1">| {{ item.title }}</p>
          <p class="text-grey">{{ item.createdAt | date }}</p>
        </div>
      </template>
    </list-card>
    <list-card title="英雄列表" icon="card-hero"></list-card>
    <list-card title="视频资讯" icon="video"></list-card>
  </div>
  <!-- end of news card -->
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 2000
        },
        pagination: {
          el: ".home-pagination"
        }
      },
      spriteItems: [
        "爆料站",
        "故事站",
        "周边商城",
        "体验服",
        "新人专区",
        "荣耀传承",
        "同仁社区",
        "王者营地",
        "公众号",
        "版本介绍"
      ],
      newsData: []
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("/news/list");
      this.newsData = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
  }
};
</script>

<style lang="scss">
@import "../scss/variables";
.home-pagination {
  .swiper-pagination-bullet {
    background-color: map-get($colors, "white");
    border-radius: 2px;
    opacity: 0.8;
    width: 10px;
    height: 10px;
    margin: 0 5px;
    &.swiper-pagination-bullet-active {
      background-color: #4b67af;
    }
  }
}

.sprite-icons {
  color: #222222;
}

.nav-container {
  font-weight: 300;
  border-top: 1px solid map-get($map: $colors, $key: "grey-1");
  border-bottom: 1px solid map-get($map: $colors, $key: "grey-1");
}
</style>
