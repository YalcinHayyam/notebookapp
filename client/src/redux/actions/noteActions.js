import axios from 'axios'
import { addNote, loadNotes } from './actionCreators'

export const createNote =  (notes) => {
    return async function (dispatch) {
        await axios.post('http://localhost:4000', { noteList: notes })
    }

}

export const getNotes = () => {
    return async function  (dispatch) {
       await axios.get('http://localhost:4000').then(res => {
            dispatch(loadNotes(res.data));

        }).catch(error => console.log(error))
    }
}