<template>
  <div id="app">
    <Sidebar/>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar';

export default {
  name: 'App',
  components: {Sidebar}
};
</script>

<style>
@import "//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #app {
  height: 100%;
}

body {
  font-size: 14px;
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  -webkit-tap-highlight-color: transparent;
}

a {
  text-decoration: none;
  color: #444;
}

ul, ol {
  list-style: none;
}

#app {
  display: flex;
  align-items: stretch;
}
</style>
