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
const MODIFY_USER = "user/MODIFY_USER";

const logout = createAction(LOG_OUT);
const setUser = createAction(SET_USER);
const setLogin = createAction(SET_LOGIN);
const modify = createAction(MODIFY_USER);

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
              window.alert("로그인 성공");
              dispatch(setUser(res.data.userInfo));
              history.push("/");
            }
          })
          .catch((error) => {
            console.error(error);
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

const modifyUser = (id, pwd, name, preferenceList, history) => {
  return function (dispatch, getState) {
    axios
      .put("http://localhost:8080/api/modifyuser", {
        user_id: id,
        user_pwd: pwd,
        user_name: name,
        user_prefer: preferenceList,
      })
      .then((res) => {
        console.log(pwd);
        console.log(res);
        if (res.data.code === 200) {
          console.log("in");
          window.alert("회원정보 수정 완료");
          history.push("/");
          dispatch(modify(preferenceList));
        } else {
          window.alert("입력하신 비밀번호가 일치하지 않습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
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
    state.user.userId = userData.id;
    state.user.userName = userData.name;
    state.user.userPreferenceList = userData.prefer;
  },
  [MODIFY_USER]: (state, action) => {
    state.user.userPreferenceList = action.payload;
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
  modifyUser,
};

export { actionCreators };
