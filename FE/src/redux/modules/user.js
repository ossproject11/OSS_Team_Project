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
  return async function (dispatch, getState) {
    await axios
      .post(`http://localhost:8080/api/auth`, {
        user_id: id,
        user_pwd: pwd,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setLogin({ jwt: res.data.token }));
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      })
      .then(() => {
        axios
          .post(`http://localhost:8080/api/getuserinfo`, {
            user_id: id,
          })
          .then((res) => {
            if (res.data.code === 200) {
              console.log("로그인 성공");
              console.log(res);
              dispatch(setUser(res.data.userInfo));
            }
          })
          .catch((error) => {
            console.error(error);
          })
          .then(() => {
            history.replace("/");
          });
      });
  };
};

const signup = (id, name, pwd, preferenceList, history) => {
  return function (dispatch, getState) {
    axios
      .post("http://localhost:8080/api/register", {
        user_id: id,
        user_pwd: pwd,
        user_name: name,
        user_prefer: preferenceList,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          window.alert("회원가입 성공");
          history.push("/");
        }
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
};

export default createReducer(initialState, {
  [SET_LOGIN]: (state, action) => {
    state.is_login = true;
    state.jwt = action.payload.jwt;
  },
  [SET_USER]: (state, action) => {
    const userData = action.payload;
    state.user.userId = userData.USER_ID;
    state.user.userName = userData.USER_NAME;
    state.user.preferenceList = userData.USER_PREFER;
  },
  [LOG_OUT]: (state, action) => {
    state.is_login = false;
    state.jwt = null;
    state.user = {
      userId: null,
      userName: null,
      userPreferenceList: null,
    };
  },
});

const actionCreators = {
  signin,
  signup,
  logout,
};

export { actionCreators };
