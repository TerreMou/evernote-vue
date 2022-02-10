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
          </div>
         <div>
           <span class="el-icon-brush"/>
           <span class="el-icon-delete"/>
         </div>
        </header>
        <main>
          <section class="note-title">
            <input type="text" v-model="currentNote.title" placeholder="请输入标题">
          </section>
          <section class="editor">
            <textarea v-show="true" v-model="currentNote.content" placeholder="请输入内容，支持 markdown 语法" />
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

export default {
  name: 'NoteDetail',
  components: {NoteSidebar},
  data() {
    return {
      currentNote: {},
      notes:[],
    };
  },
  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({path: '/login'});
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.currentNote = this.notes.find(note=>note.id === to.query.noteId-0) || {}
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
