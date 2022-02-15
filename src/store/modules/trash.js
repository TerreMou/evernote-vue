import Trash from '@/apis/trashApis'
import {Message} from 'element-ui'

const state = {
  trashNotes: null,
  currentTrashNoteId: null,
}

const getters = {
  trashNotes: state => state.trashNotes || [],

  currentTrashNote: (state, getters) => {
    if(!state.currentTrashNoteId) return getters.trashNotes[0] || {}
    return state.trashNotes.find(note => note.id === state.currentTrashNoteId-0) || {}
  },

  belongTo: (state, getters, rootState, rootGetters) => {
    const notebook = rootGetters.notebooks
      .find(book => book.id === getters.currentTrashNote.notebookId-0) || {}
    return notebook.title || ''
  }
}

const mutations = {
  setTrashNotes(state, {trashNotes}) {
    state.trashNotes = trashNotes
  },

  setCurrentTrashNote(state, {currentTrashNoteId}={}) {
    state.currentTrashNoteId = currentTrashNoteId
  },

  deleteTrashNote(state, {noteId}) {
    state.trashNotes = state.trashNotes.filter(note => note.id !== noteId)
  },

}

const actions = {
  getTrashNotes({commit}) {
    return Trash.getAll().then(res => {
      commit('setTrashNotes', {trashNotes: res.data})
    })
  },

  deleteTrashNote({commit}, {noteId}) {
    return Trash.deleteNote({noteId})
      .then(res => {
        commit('deleteTrashNote', {noteId})
        Message.success(res.msg)
      })
  },

  revertTrashNote({commit}, {noteId}) {
    return Trash.revertNote({noteId})
      .then(res => {
        commit('deleteTrashNote', {noteId})
        Message.success(res.msg)
      })
  },

}

export default {
  state,
  getters,
  mutations,
  actions
}
