<template>
  <div id="notebook-list">
    <header>
      <h2>笔记本</h2>
      <Button size="small" theme="text" @click.native="showCreateDialog">
        <i class="iconfont icon-plus"/>新建笔记本
      </Button>
      <Dialog :visible="bool1" @update:visible="bool1=$event"
              buttonConfirm="确定"
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
      <Dialog :visible="bool2" @update:visible="bool2=$event"
              buttonConfirm="确定"
              :ok="onEdit"
              :closeOnClickOverlay="false">
        <template v-slot:title>
          <p>修改笔记本标题</p>
        </template>
        <template v-slot:content>
          <p>请输入新笔记本标题</p>
          <input v-model="nbTitleEdit" type="text">
        </template>
      </Dialog>
      <Dialog :visible="bool3" @update:visible="bool3=$event"
              buttonConfirm="删除"
              :ok="onDelete"
              :closeOnClickOverlay="false">
        <template v-slot:title>
          <p>删除笔记本</p>
        </template>
        <template v-slot:content>
          <strong>确定要删除该笔记本吗？</strong>
        </template>
      </Dialog>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="list">
          <router-link :to="`/note?notebookId=${notebook.id}`" class="item"
                       v-for="notebook in notebooks" :key="notebook.id">
            <div class="title">
              <span class="iconfont icon-notebook"/>{{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
            </div>
            <div class="actions" @click.stop.prevent>
              <span>{{ notebook.dateDisplay }}</span>
              <span class="edit" @click="showEditDialog(notebook)">编辑</span>
              <span class="delete" @click="showDeleteDialog(notebook)">删除</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Button from '@/components/Button';
import Dialog from '@/components/Dialog';

/** @namespace notebook.noteCounts **/
/** @namespace notebook.createdAt **/

export default {
  name: 'NotebookList',
  components: {Dialog, Button},
  data() {
    return {
      bool1: false,
      bool2: false,
      bool3: false,
      nbTitle: '',
      nbTitleEdit: '',
      nb: {},
    };
  },

  created() {
    this.checkLogin({path: '/login'})
    this.getNotebooks()
  },

  computed: {
    ...mapGetters(['notebooks'])
  },

  methods: {
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook',
      'checkLogin'
    ]),

    showCreateDialog() {
      this.bool1 = !this.bool1;
    },
    showEditDialog(notebook) {
      this.bool2 = !this.bool2;
      this.nbTitleEdit = notebook.title;
      this.nb = notebook;
    },
    showDeleteDialog(notebook) {
      this.bool3 = !this.bool3;
      this.nb = notebook;
    },

    onCreate() {
      if (this.nbTitle === null) {
        return;
      }
      if (this.nbTitle.trim() === '') {
        this.$message.error('笔记本名不能为空');
        this.nbTitle = '';
        return;
      }
      this.addNotebook({title: this.nbTitle})
    },
    onEdit() {
      this.updateNotebook({notebookId: this.nb.id, title: this.nbTitleEdit})
    },
    onDelete() {
      this.deleteNotebook({notebookId: this.nb.id})
    }
  },
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
