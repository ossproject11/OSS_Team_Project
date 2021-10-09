import React, { useState } from "react";

import "../style/SignUp.scss";

function SignUp() {
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [preference, setPreference] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    checkInputs();
  };

  const checkInputs = () => {
    const userIDValue = userID.trim();
    const userNameValue = userName.trim();
    const userPasswordValue = userPassword.trim();
    const userPasswordCheckValue = userPasswordCheck.trim();

    if (userIDValue === "") {
      window.alert("아이디를 입력해주세요.");
    } else if (userIDValue.length < 8) {
      window.alert("8자리 이상의 아이디를 입력해주세요.");
    } else if (userNameValue === "") {
      window.alert("이름을 입력해주세요.");
    } else if (userPasswordValue === "" || userPasswordValue.length < 8) {
      window.alert("다른 비밀번호를 입력해주세요.");
    } else if (userPasswordCheckValue === "") {
      window.alert("비밀번호 확인을 입력해주세요.");
    } else if (userPasswordValue !== userPasswordCheckValue) {
      window.alert("비밀번호가 일치하지 않습니다.");
    } else {
      window.alert("이상 없음");
    }
  };

  const onAddPreference = (e) => {
    e.preventDefault();

    if (!preference.includes(e.target.previousSibling.value))
      setPreference([...preference, e.target.previousSibling.value]);
  };

  const onDeletePreference = (e) => {
    e.preventDefault();

    setPreference(
      preference.filter((item) => item !== e.target.previousSibling.data)
    );
  };
  return (
    <div className="signup-container">
      <div className="header">
        <h1>회원가입</h1>
      </div>
      <form>
        <div className="form-control">
          <label>ID</label>
          <input
            type="text"
            placeholder="8자리 이상의 아이디를 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserID(e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label>이름</label>
          <input
            type="text"
            placeholder="이름을 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="8자리 이상의 비밀번호를 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label>비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserPasswordCheck(e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label>관심분야 설정하기</label>
          <select>
            <option value="코미디">코미디</option>
            <option value="로맨스">로맨스</option>
            <option value="하이틴">하이틴</option>
            <option value="공포">공포</option>
          </select>
          <button className="btn add" onClick={onAddPreference}>
            추가
          </button>
          <div className="preference-container">
            {preference.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <span>
                    {item}
                    <button className="btn delete" onClick={onDeletePreference}>
                      X
                    </button>
                  </span>
                </React.Fragment>
              );
            })}
          </div>
          <small>관심분야 변경 또는 추가는 마이페이지에서도 가능합니다.</small>
        </div>
        <button className="btn submit" onClick={onSubmit}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
