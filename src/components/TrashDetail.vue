<template>
  <div id="trash">
    <div class="note-sidebar">
      <header>
        <div class="note-title">废纸篓</div>
      </header>
      <main>
        <div class="menu">
          <div>更新时间</div>
          <div>标题</div>
        </div>
        <ul class="note-info">
          <li v-for="note in trashNotes">
            <router-link :to="`/trash?noteId=${note.id}`">
              <span class="date">{{ note.updatedAtDisplay }}</span>
              <span class="title">{{ note.title }}</span>
            </router-link>
          </li>
        </ul>
      </main>
    </div>

    <div class="detail">
      <div class="unselected" v-show="!currentTrashNote.id">请选择笔记</div>
      <div class="selected" v-show="currentTrashNote.id">
        <header>
          <div>
            <span>创建日期：{{currentTrashNote.createdAtDisplay}}</span>
            <span>更新日期：{{currentTrashNote.updatedAtDisplay}}</span>
            <span>所属笔记本：{{ belongTo }}</span>
          </div>
          <div>
            <span class="action" @click="onDelete">彻底删除</span>
            <span class="action" @click="onRevert">恢复</span>
          </div>
        </header>
        <main>
          <section class="title">
            <span>{{ currentTrashNote.title }}</span>
          </section>
          <section class="editor">
            <div class="preview markdown-body"
                 v-html="compiledMarkdown"/>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import {mapActions, mapGetters} from 'vuex';

const md = new MarkdownIt()

export default {
  name: 'TrashDetail',

  computed: {
    ...mapGetters([
      'trashNotes',
      'currentTrashNote',
      'belongTo'
    ]),

    compiledMarkdown() {
      return md.render(this.currentTrashNote.content || '')
    }
  },

  created() {
    this.$store.dispatch('checkLogin', {path:'/login'})
    this.getNotebooks()
    this.getTrashNotes().then(() => {
      this.$store.commit('setCurrentTrashNote',
        {currentTrashNoteId: this.$route.query.noteId})
    })
  },

  methods: {
    ...mapActions([
      'getTrashNotes',
      'revertTrashNote',
      'deleteTrashNote',
      'getNotebooks'
    ]),

    onRevert() {
      console.log('revert')
      this.revertTrashNote({noteId: this.currentTrashNote.id})
    },

    onDelete() {
      console.log('delete');
      this.deleteTrashNote({noteId: this.currentTrashNote.id})
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.$store.commit('setCurrentTrashNote',
      {currentTrashNoteId: to.query.noteId})
    next()
  }

};
</script>

<style scoped lang="less">
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}

</style>
