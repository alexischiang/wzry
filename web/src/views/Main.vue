<template>
  <div class="main">
    <div class="topbar bg-black py-2 px-3 text-white d-flex ai-center">
      <img src="../../public/logo.png" alt="logo" style="height:30px" />
      <div class="px-3 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-dark-1">团队成就更多</div>
      </div>
      <button class="btn bg-primary">立即下载</button>
    </div>
    <div class="nav bg-primary py-2">
      <div
        class="nav d-flex jc-around text-white fs-l pt-1"
        style="font-weight:200"
      >
        <div class="nav-item py-1 active">
          <router-link to="/home" tag="div" class="nav-link">首页</router-link>
        </div>
        <div class="nav-item py-1">
          <router-link to="/" tag="div" class="nav-link">攻略中心</router-link>
        </div>
        <div class="nav-item py-1">
          <router-link to="/" tag="div" class="nav-link">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
