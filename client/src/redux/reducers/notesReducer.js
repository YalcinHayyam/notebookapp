import { ADD_NOTE, LOAD_NOTES } from '../actions/actionTypes'

function notesReducer(state = [], action) {
    switch (action.type) {
        case LOAD_NOTES:
            console.log("tut:", action.notes)
            return action.notes;

        case ADD_NOTE:
            return [
                ...state,
                {
                    notes
                }
            ];

        default:
            return state;
    }
}

export default notesReducer