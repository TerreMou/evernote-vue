<template>

  <div class="note-sidebar">
    <header>
      <el-dropdown class="note-title" @command="handleCommand" placement="bottom-start">
        <span class="el-dropdown-link">
          我的笔记本1<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">
          <el-dropdown-item v-for="notebook in notebooks" :key="notebook.id">{{ notebook.title }}</el-dropdown-item>
          <el-dropdown-item divided command="trash" >废纸篓</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="add-note"
            @click="addNote"><i class="el-icon-edit"/> 添加笔记</span>
    </header>
    <main>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="note-info">
        <li><span class="date">3 分钟前</span><span class="title">note 1</span></li>
        <li><span class="date">1 天前</span><span class="title">note 2</span></li>
        <li><span class="date">30 天前</span><span class="title">note 3</span></li>
        <li><span class="date">2021-12-17</span><span class="title">note 10</span></li>
      </ul>
    </main>


  </div>

</template>

<script>
import Notebook from '@/apis/notebookApis'
import Bus from '@/helpers/bus'

export default {
  data() {
    return {
      notebooks: [],
      notes: [],
      currentBook: {}
    }
  },

  created() {
    Notebook.getNotebookList().then((res)=>{
      this.notebooks = res.data
    })
  },

  methods: {
    addNote() {
      console.log("add note ...")
    },
    handleCommand() {},
  },

};
</script>


<style lang="less">
@import url(../assets/css/note-sidebar.less);

.el-dropdown-link {
  cursor: pointer;
  color: #878787;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-dropdown-menu {
  .el-dropdown-menu__item {
    width: 200px;
    &:hover {
      background-color: #fb80a7;
      color: #fff;
    }
  }
}

</style>
