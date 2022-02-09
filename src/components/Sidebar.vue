<template>
  <div id="sidebar">
    <Avatar/>
    <div class="icons">
      <router-link to="/note" title="笔记">
        <i class="iconfont icon-note"/>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <i class="iconfont icon-notebook"/>
      </router-link>
      <router-link to="/trash" title="回收站">
        <i class="iconfont icon-trash"/>
      </router-link>
      <div class="logout" @click="onLogout" title="退出登录">
        <i class="iconfont icon-logout"/>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar';
import Auth from '@/apis/auth';

export default {
  name: 'Sidebar',
  components: {Avatar},
  methods: {
    onLogout() {
      Auth.logout().then(data => {
        console.log(data);
        this.$router.push({path: '/login'});
      });
    }
  }
};
</script>

<style lang="less" scoped>
// #2c333c
@bg: #aec4d1;
@font: #fff;
@active: darken(#aec4d1,6%);

#sidebar {
  position: relative;
  width: 64px;
  text-align: center;
  background: @bg;

  .icons {
    margin-top: 15px;

    a {
      padding: 10px 0;
      display: block;
    }

    .router-link-active {
      background-color: @active;
    }

  }

  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    padding: 6px 0;
  }

  .iconfont {
    color: @font;
  }

}
</style>
