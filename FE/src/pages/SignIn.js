import React, { useState } from "react";

import "../style/SignIn.scss";

function SignIn() {
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
    }
  };

  return (
    <div className="signin-container">
      <div className="header">
        <h1>로그인</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label>ID</label>
          <input
            type="text"
            placeholder="아이디를 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserID(e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn submit">
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignIn;
