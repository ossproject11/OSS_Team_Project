import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
  is_loading: true,
};

const SET_LIST = "list/SET_LIST";
const SET_LOADING = "list/LOADING";
const SET_COMMENT = "list/SET_COMMENT";

const setList = createAction(SET_LIST);
const setLoading = createAction(SET_LOADING);
const setComment = createAction(SET_COMMENT);

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

const postComment = (perform_id, user_name, comment) => {
  return function (dispatch, getState) {
    axios
      .post("http://localhost:8080/api/comment", {
        perform_id: perform_id,
        user_name: user_name,
        comment: comment,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
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
  postComment,
};

export { actionCreators };
