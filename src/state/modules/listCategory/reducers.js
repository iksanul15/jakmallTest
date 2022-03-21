import * as types from "./types";
import { createReducer } from "../../utils";

const listCategoryReducer = createReducer( {
    data: '',
    error : null
} )( {
    [ types.SET_LIST_CATEGORY ]: (state, action ) => {
        return {
            data: action.payload,
            error: null
        }
    },
    [ types.SET_LIST_JOKE ]: (state, action ) => {
        return {
            data: state.data.map((item) => {
                if (item.category !== action.payload.category) {
                    return item;
                }
                return {
                    ...item,
                    ...action.payload,
                };
            }),
        }
    },
} );

// export default combineReducers( {
//     auth: authReducer
// } );

export default listCategoryReducer
