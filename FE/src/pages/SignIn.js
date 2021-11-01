import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import "../style/SignIn.scss";

function SignIn(props) {
  const dispatch = useDispatch();
  const [userID, setUserID] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    checkInputs();
  };

  const checkInputs = () => {
    const userIDValue = userID.trim();
    const userPasswordValue = userPassword.trim();

    if (userIDValue === "") {
      window.alert("아이디를 입력해주세요.");
    } else if (userPasswordValue === "") {
      window.alert("비밀번호를 입력해주세요.");
    } else {
      dispatch(
        userActions.signin(userIDValue, userPasswordValue, props.history)
      );
    }
  };

  return (
    <div className="signin_container">
      <div className="header">
        <h1 className="title">로그인</h1>
      </div>
      <form className="form_signin" onSubmit={onSubmit}>
        <div className="form_control">
          <label className="form_label">ID</label>
          <input
            className="form_input"
            type="text"
            placeholder="아이디를 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserID(e.target.value);
            }}
          />
        </div>
        <div className="form_control">
          <label className="form_label">비밀번호</label>
          <input
            className="form_input"
            type="password"
            placeholder="비밀번호 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </div>
        <button className="btn_signin" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignIn;
