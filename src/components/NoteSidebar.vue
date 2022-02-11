<template>

  <div class="note-sidebar">
    <header>
      <el-dropdown class="note-title" @command="handleCommand"
                   trigger="click" placement="bottom-start">
        <span class="el-dropdown-link">
          {{ currentBook.title }}<i class="el-icon-arrow-down el-icon--right"/>
        </span>
        <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">
          <el-dropdown-item v-for="notebook in notebooks" :key="notebook.id"
                            :command="notebook.id"
          >{{ notebook.title }}
          </el-dropdown-item>
          <el-dropdown-item divided command="trash">废纸篓</el-dropdown-item>
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
        <li v-for="note in notes">
            <router-link :to="`/note?noteId=${note.id}&notebookId=${currentBook.id}`">
              <span class="date">{{ note.updatedAtDisplay }}</span>
              <span class="title">{{ note.title }}</span>
            </router-link>
        </li>
      </ul>
    </main>
  </div>

</template>

<script>
import Notebook from '@/apis/notebookApis';
import Note from '@/apis/noteApis';
import Bus from '@/helpers/bus';

export default {
  data() {
    return {
      notebooks: [],
      notes: [],
      currentBook: {}
    };
  },

  created() {
    Notebook.getNotebookList().then((res) => {
      this.notebooks = res.data;
      this.currentBook = this.findCurrentBook(this.notebooks)
      return Note.getAllNote({notebookId: this.currentBook.id});
    }).then(res => {
      this.notes = res.data;
      this.$emit('update:notes', this.notes)
      Bus.$emit('update:notes', this.notes)
    });
  },

  methods: {
    addNote() {
      Note.addNote({notebookId: this.currentBook.id})
        .then(res => {
          this.$message.success(res.msg)
          this.notes.unshift(res.data)
        })
    },

    findCurrentBook(notebooks) {
      return notebooks.find(book => book.id === this.$route.query.notebookId -0) || notebooks[0] || {}
    },

    handleCommand(notebookId) {
      if (notebookId === 'trash') {
        return this.$router.push({path: '/trash'});
      }
      this.currentBook = this.notebooks
        .filter(notebook => notebook.id === notebookId)[0];
      Note.getAllNote({notebookId}).then((res) => {
        this.notes = res.data;
        this.$emit('update:notes', this.notes)
      });
    },
  },

};
</script>


<style lang="less" scoped>
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
