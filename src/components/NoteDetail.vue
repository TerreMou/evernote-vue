<template>
  <div id="note">
    <NoteSidebar @update:notes="notes=$event" />
    <div class="note-detail">
      <div class="unselected" v-show="!currentNote.id">请选择笔记</div>
      <div class="selected" v-show="currentNote.id">
        <header>
          <div>
            <span>创建日期：{{currentNote.createdAtDisplay}}</span>
            <span>更新日期：{{currentNote.updatedAtDisplay}}</span>
            <span>{{ statusText }}</span>
          </div>
         <div>
           <span class="el-icon-brush" @click="previewVisible = !previewVisible"/>
           <span class="el-icon-delete" @click="deleteNote" />
         </div>
        </header>
        <main>
          <section class="note-title">
            <input type="text" placeholder="请输入标题"
                   @input="updateNote"
                   @keydown="statusText='保存中'"
                   v-model="currentNote.title" >
          </section>
          <section class="editor">
            <textarea v-show="!previewVisible" placeholder="请输入内容，支持 markdown 语法"
                      @input="updateNote"
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
import Auth from '@/apis/auth';
import NoteSidebar from '@/components/NoteSidebar';
import Bus from '@/helpers/bus'
import _ from 'lodash'
import Note from '@/apis/noteApis'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export default {
  name: 'NoteDetail',
  components: {NoteSidebar},
  data() {
    return {
      currentNote: {},
      notes: [],
      statusText: '',
      previewVisible: false,
    };
  },

  computed: {
    contentPreview() {
      return md.render(this.currentNote.content || '')
    }
  },

  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({path: '/login'});
      }
    })
    Bus.$once('update:notes', notes =>
      this.currentNote = notes.find(note =>
        note.id === this.$route.query.noteId -0) || {}
    )
  },

  methods: {
    updateNote: _.debounce(function() { // 300ms 后再执行该函数
      const {id, title, content} = this.currentNote
      Note.updateNote({noteId: id}, {title, content})
        .then(res => {
          console.log(res.msg)
          this.statusText = '保存成功'
        })
        .catch(err => {
          console.log(err.msg)
          this.statusText = '保存出错'
        })
    }, 300),

    deleteNote() {
      Note.deleteNote({noteId: this.currentNote.id})
        .then(res => {
          this.$message.success(res.msg)
          const index = this.notes.indexOf(this.currentNote)
          this.notes.splice(index,1)
          this.$router.replace({path:'/note'})
        })
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.currentNote = this.notes.find(note =>
      note.id === to.query.noteId-0) || {}
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
