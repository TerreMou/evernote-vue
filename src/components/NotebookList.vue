<template>
  <div id="notebook-list">
    <header>
      <h2>笔记本</h2>
      <Button size="small" theme="text" @click.native="showDialog">
        <i class="iconfont icon-plus"/>新建笔记本
      </Button>
      <Dialog :visible="bool" @update:visible="bool=$event"
              :ok="onCreate"
              :closeOnClickOverlay="false">
        <template v-slot:title>
          <p>创建笔记本</p>
        </template>
        <template v-slot:content>
          <p>请输入新笔记本标题</p>
          <input v-model="nbTitle" type="text">
        </template>
      </Dialog>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="list">
          <router-link to="/note/1" class="item"
                       v-for="notebook in notebooks" :key="notebook.id">
            <div class="title">
              <span class="iconfont icon-notebook"/>{{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
            </div>
            <div class="actions" @click.stop.prevent>
              <span>{{ notebook.dateDisplay }}</span>
              <span @click="onEdit(notebook)">编辑</span>
              <span @click="onDelete(notebook)">删除</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '@/apis/auth';
import Notebook from '@/apis/notebookApis';
import Button from '@/components/Button';
import Dialog from '@/components/Dialog';

/** @namespace notebook.noteCounts **/
/** @namespace notebook.createdAt **/

export default {
  name: 'NotebookList',
  components: {Dialog, Button},
  data() {
    return {
      bool: false,
      notebooks: [],
      nbTitle:'',
    };
  },

  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({path: '/login'});
      }
    });
    Notebook.getNotebookList().then((res) => {
      this.notebooks = res.data;
    });
  },

  methods: {
    showDialog() {
      this.bool = !this.bool
    },

    onCreate() {
      if (this.nbTitle === null) {
        return;
      }
      if (this.nbTitle.trim() === '') {
        alert('笔记本名不能为空')
        this.nbTitle = ''
        return
      }
      Notebook.addNotebook({title: this.nbTitle}).then(res => {
        console.log(res);
        this.notebooks.unshift(res.data);
        alert(res.msg);
      }).catch(err=>alert(err.msg))
      this.nbTitle = ''
    },
    onEdit(notebook) {
      const title = window.prompt('修改笔记本名', notebook.title);
      Notebook.updateNotebook(notebook.id, {title}).then(res => {
        console.log(res);
        notebook.title = title;
        alert(res.msg);
      });
    },
    onDelete(notebook) {
      const isConfirm = window.confirm('你确定要删除吗？');
      if (isConfirm) {
        Notebook.deleteNotebook(notebook.id).then(res => {
          console.log(res);
          const index = this.notebooks.indexOf(notebook);
          this.notebooks.splice(index, 1);
          alert(res.msg);
        });
      }
    }
  },

};
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
