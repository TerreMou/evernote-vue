<template>

  <div class="note-sidebar">
    <header>
      <el-dropdown class="note-title" @command="handleCommand"
                   trigger="click" placement="bottom-start"
                   v-if="currentBook.id">
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
      <span v-if="!currentBook.id" class="note-title">暂无笔记本</span>
      <span class="add-note"
            v-if="currentBook.id"
            @click="onAddNote"><i class="el-icon-edit"/> 添加笔记</span>
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
import {mapGetters, mapActions} from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'notebooks',
      'notes',
      'currentBook',
      'currentNote'
    ])
  },

  created() {
    this.getNotebooks().then(() => {
      this.$store.commit('setCurrentBook',
        {currentBookId: this.$route.query.notebookId});
      if(this.currentBook.id) {return this.getNotes({notebookId: this.currentBook.id})}
    }).then(() => {
        this.$store.commit('setCurrentNote', {currentNoteId: this.$route.query.noteId});
        this.$router.replace({
          path: '/note',
          query: {
            noteId: this.currentNote.id,
            notebookId: this.currentBook.id
          }
        });
      }
    );
  },

  methods: {
    ...mapActions([
      'getNotebooks',
      'getNotes',
      'addNote'
    ]),

    onAddNote() {
      this.addNote({notebookId: this.currentBook.id});
    },

    handleCommand(notebookId) {
      if (notebookId === 'trash') {
        return this.$router.push({path: '/trash'});
      }
      this.$store.commit('setCurrentBook', {currentBookId: notebookId});
      this.getNotes({notebookId}).then(() => {
        this.$store.commit('setCurrentNote');
        this.$router.replace({
          path: '/note',
          query: {
            noteId: this.currentNote.id,
            notebookId: this.currentBook.id
          }
        });
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
