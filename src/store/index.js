import Vue from 'vue'
import Vuex from 'vuex'
import notebook from '@/store/modules/notebook';
import note from '@/store/modules/note';
import trash from '@/store/modules/trash';
import user from '@/store/modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notebook,
    note,
    trash,
    user
  }
})
