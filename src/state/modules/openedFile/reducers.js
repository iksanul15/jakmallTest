import * as types from "./types";
import { createReducer } from "../../utils";

const openedFileReducer = createReducer( {
    data: '',
    error : null
} )( {
    [ types.SET_OPENED_FILE ]: (state, action ) => {
        return {
            data: action.payload,
            error: null
        }
    },
} );

// export default combineReducers( {
//     auth: authReducer
// } );

export default openedFileReducer
