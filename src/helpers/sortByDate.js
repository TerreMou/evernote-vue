import {beautifyDate} from '@/helpers/beautifyDate';

export function sortByDate(data) {
  data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
  data.forEach(note => {
    note.createdAtDisplay = beautifyDate(note.createdAt)
    note.updatedAtDisplay = beautifyDate(note.updatedAt)
  })
}
