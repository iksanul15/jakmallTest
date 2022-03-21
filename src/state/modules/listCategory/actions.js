import * as types from "./types";

export const setListCategory = (data) =>({
    type: types.SET_LIST_CATEGORY,
    payload: { data }
});

export const setListJoke = (data) =>({
    type: types.SET_LIST_JOKE,
    payload: { data }
});
