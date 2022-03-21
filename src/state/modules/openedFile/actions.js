import * as types from "./types";

export const setOpenedFile = (data ) =>({
    type: types.SET_OPENED_FILE,
    payload: { data }
});

