<template>
  <div id="note">
    <NoteSidebar @update:notes="notes=$event" />
    <div class="detail">
      <div class="unselected" v-show="!currentBook.id">请创建笔记本后</div>
      <div class="unselected" v-show="!currentNote.id">选择或创建笔记</div>
      <div class="selected" v-show="currentNote.id">
        <header>
          <div>
            <span>创建日期：{{currentNote.createdAtDisplay}}</span>
            <span>更新日期：{{currentNote.updatedAtDisplay}}</span>
            <span>{{ statusText }}</span>
          </div>
         <div>
           <span :class="previewVisible? 'el-icon-edit-outline' : 'el-icon-view'"
                 @click="previewVisible = !previewVisible"/>
           <span class="el-icon-delete" @click="onDeleteNote" />
         </div>
        </header>
        <main>
          <section class="title">
            <input type="text" placeholder="请输入标题"
                   @input="onUpdateNote"
                   @keydown="statusText='保存中'"
                   v-model="currentNote.title" >
          </section>
          <section class="editor">
            <textarea v-show="!previewVisible" placeholder="请输入内容，支持 markdown 语法"
                      @input="onUpdateNote"
                      @keydown="statusText='保存中'"
                      v-model="currentNote.content"/>
            <div class="preview markdown-body" v-show="previewVisible"
                 v-html="contentPreview"/>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar';
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
import {mapActions, mapGetters} from 'vuex';

const md = new MarkdownIt()

export default {
  name: 'NoteDetail',
  components: {NoteSidebar},

  data() {
    return {
      statusText: '',
      previewVisible: false,
    };
  },

  computed: {
    ...mapGetters([
      'notes',
      'currentNote',
      'currentBook'
    ]),

    contentPreview() {
      return md.render(this.currentNote.content || '')
    }
  },

  created() {
    this.checkLogin({path:'/login'})
  },

  methods: {
    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'
    ]),


    onUpdateNote: _.debounce(function() { // 300ms 后再执行该函数
      if(!this.currentNote.id) return
      const {id, title, content} = this.currentNote
      this.updateNote({noteId: id, title, content})
        .then(() => {
          this.statusText = '保存成功'
        })
        .catch(() => {
          this.statusText = '保存出错'
        })
    }, 1000),

    onDeleteNote() {
      this.deleteNote({noteId: this.currentNote.id})
        .then(() => {
          this.$router.replace({path:'/note'})
        })
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.$store.commit('setCurrentNote', {currentNoteId: to.query.noteId-0})
    next()
  },

};
</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail.less);
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
