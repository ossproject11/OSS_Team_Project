import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  is_login: false,
  jwt: null,
  user: {
    userId: null,
    userName: "",
    userPreferenceList: [],
  },
};

const LOG_OUT = "user/LOG_OUT";
const SET_USER = "user/SET_USER";
const SET_LOGIN = "user/SET_LOGIN";

const logout = createAction(LOG_OUT);
const setUser = createAction(SET_USER);
const setLogin = createAction(SET_LOGIN);

const signin = (id, pwd, history) => {
  return function (dispatch, getState) {
    axios
      .post("http://localhost:8080/app/signin", {
        user_id: id,
        user_pwd: pwd,
      })
      .then((res) => {
        dispatch(setLogin({ jwt: res.data.result.jwt }));
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      })
      .then(() => {
        if (getState().user.jwt === null) return;
        axios.get("http://localhost:8080/app/sign-in");
      });
  };
};

const signup = (id, name, pwd, preferenceList, history) => {
  console.log(id, name, preferenceList);
  return;
  // return function (dispatch, getState) {
  //   axios
  //     .post("http://localhost:8080/api/register", {
  //       user_id: id,
  //       user_pwd: pwd,
  //     })
  //     .then((res) => {
  //       if (res.code === 200) {
  //         window.alert("회원가입 성공");
  //         history.push("/");
  //       }
  //     })
  //     .catch((error) => {
  //       window.alert(error.response.data.message);
  //     });
  // };
};

export default createReducer(initialState, {
  [SET_LOGIN]: (state, action) => {
    state.is_login = true;
    state.jwt = action.payload.jwt;
  },
  [SET_USER]: (state, action) => {
    // state.user.userId = action.payload.;
  },
});

const actionCreators = {
  signup,
};

export { actionCreators };
