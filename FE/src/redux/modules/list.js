import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
  is_loading: true,
};

const SET_LIST = "list/SET_LIST";
const SET_LOADING = "list/LOADING";

const setList = createAction(SET_LIST);
const setLoading = createAction(SET_LOADING);

const getList = (payload) => {
  return function (dispatch, getState) {
    axios
      .get("http://localhost:8080/api/perform/")
      .then((res) => {
        dispatch(setList(res.data.performInfo));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(console.error);
      });
  };
};

export default createReducer(initialState, {
  [SET_LIST]: (state, action) => {
    state.list = action.payload;
  },
  [SET_LOADING]: (state, action) => {
    state.is_loading = action.payload;
  },
});

const actionCreators = {
  setList,
  setLoading,
  getList,
};

export { actionCreators };
