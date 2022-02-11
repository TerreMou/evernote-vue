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
           <span class="el-icon-brush"/>
           <span class="el-icon-delete"/>
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
            <textarea v-show="true" placeholder="请输入内容，支持 markdown 语法"
                      @input="updateNote"
                      @keydown="statusText='保存中'"
                      v-model="currentNote.content"/>
            <div class="preview markdown-body" v-show="false"/>
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

export default {
  name: 'NoteDetail',
  components: {NoteSidebar},
  data() {
    return {
      currentNote: {},
      notes: [],
      statusText: '',
    };
  },

  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({path: '/login'});
      }
    })
    Bus.$once('update:notes', notes =>
      this.currentNote = notes.find(note =>
        note.id === this.$route.query.noteId -0) || {})
  },

  methods: {
    updateNote: _.debounce(function() { // 300ms 后再执行该函数
      const {id, title, content} = this.currentNote
      Note.updateNote({noteId: id}, {title, content})
        .then(res => {
          console.log(res)
          this.statusText = '保存成功'
        })
        .catch(err => {
          console.log(err)
          this.statusText = '保存出错'
        })
    }, 300),
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
