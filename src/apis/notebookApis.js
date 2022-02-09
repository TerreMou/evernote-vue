import request from '@/helpers/request';
import {beautifyDate} from '@/helpers/beautifyDate';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
};

export default {
  getNotebookList() {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(res => {
        res.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
        res.data.forEach(notebook => {
          notebook.dateDisplay = beautifyDate(notebook.createdAt);
        });
        resolve(res);
      }).catch(err => reject(err));
    });
  },

  updateNotebook(notebookId, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title});
  },

  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE');
  },

  addNotebook({title = ''} = {title: ''}) {
    return new Promise((resolve, reject) => {
      request(URL.ADD, 'POST', {title}).then(res => {
        res.data.dateDisplay = beautifyDate(res.data.createdAt);
        resolve(res);
      }).catch(err => reject(err));
    });
  }

};
