import request from '@/helpers/request';
import {sortByDate} from '@/helpers/sortByDate';

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
};

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(res => {
        sortByDate(res.data)
        resolve(res);
      }).catch(err => reject(err));
    });
  },

  deleteNote({noteId}) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE');
  },

  revertNote({noteId}) {
    return request(URL.REVERT.replace(':noteId', noteId), 'PATCH');
  },

};
