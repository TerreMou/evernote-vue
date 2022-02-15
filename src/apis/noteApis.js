import request from '@/helpers/request';
import {beautifyDate} from '@/helpers/beautifyDate';
import {sortByDate} from '@/helpers/sortByDate';

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
};

/** @namespace note.updatedAt **/

export default {
  getAllNote({notebookId}) {
    return new Promise((resolve, reject) => {
      request(URL.GET.replace(':notebookId', notebookId))
        .then(res => {
          sortByDate(res.data)
          resolve(res);
        }).catch(err => reject(err));
    });
  },

  updateNote({noteId}, {title, content}) {
    return request(URL.UPDATE.replace(':noteId', noteId),
      'PATCH', {title, content});
  },

  deleteNote({noteId}) {
    return request(URL.DELETE.replace(':noteId', noteId),
      'DELETE');
  },

  addNote({notebookId}, {title = '', content = ''} = {title: '', content: ''}) {
    return new Promise((resolve, reject) => {
      request(URL.ADD.replace(':notebookId', notebookId),
        'POST', {title, content})
        .then(res => {
          res.data.createdAtDisplay = beautifyDate(res.data.createdAt);
          res.data.updatedAtDisplay = beautifyDate(res.data.updatedAt);
          resolve(res);
        }).catch(err => reject(err));
    });
  }

};
