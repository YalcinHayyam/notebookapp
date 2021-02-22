import { LOAD_NOTES, ADD_NOTE } from '../actions/actionTypes'


export function addNote(notes) {
    return { type: ADD_NOTE,notes }
  }
  export function loadNotes(notes) {
    return { type: LOAD_NOTES, notes }
  }