<template>
  <div id="notebook-list">
    <header>
      <h2>笔记本</h2>
      <Button size="small" theme="text">
        <i class="iconfont icon-plus"/>新建笔记本
      </Button>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表(10)</h3>
        <div class="list">
          <a href="#">
            <div class="item">
              <div class="title">
                <span class="iconfont icon-notebook"/>笔记本标题1
                <span>3</span>
              </div>
              <div class="actions">
                <span>3天前</span>
                <span>编辑</span>
                <span>删除</span>
              </div>
            </div>
          </a>
          <a href="#">
            <div class="item">
              <div class="title">
                <span class="iconfont icon-notebook"/>笔记本标题2
                <span>1</span>
              </div>
              <div class="actions">
                <span>15天前</span>
                <span>编辑</span>
                <span>删除</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '@/apis/auth';
import Button from '@/components/Button';

export default {
  name: 'NotebookList',
  components: {Button},
  data() {
    return {};
  },

  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({path: '/login'});
      }
    });
  },

};
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
