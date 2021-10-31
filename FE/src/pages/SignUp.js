import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import axios from "axios";

import "../style/SignUp.scss";

function SignUp(props) {
  const dispatch = useDispatch();
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [preference, setPreference] = useState([]);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    checkInputs();
  };

  const checkInputs = () => {
    const userIDValue = userID.trim();
    const userNameValue = userName.trim();
    const userPasswordValue = userPassword.trim();
    const userPasswordCheckValue = userPasswordCheck.trim();

    if (!isDuplicate) {
      window.alert("아이디 중복 확인을 먼저 해주세요.");
    } else if (userIDValue === "") {
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
      dispatch(
        userActions.signup(
          userIDValue,
          userNameValue,
          userPasswordValue,
          preference,
          props.history
        )
      );
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

  const onBtnCheckDup = async (e) => {
    e.preventDefault();

    if (userID === "" && userID.trim() === "") {
      window.alert("아이디를 입력해주세요.");
    } else if (userID.length < 8) {
      window.alert("8자리 이상의 아이디를 입력해주세요.");
    } else {
      if (await checkDuplicate(userID)) {
        window.alert("사용 가능한 아이디입니다");
        setIsDuplicate(true);
      } else {
        window.alert("이미 동일한 아이디가 존재합니다.");
      }
    }
  };

  const checkDuplicate = async (id) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`/api/checkduplicate`, {
          user_id: id,
        })
        .then((res) => {
          if (res.data.code === 200) {
            resolve(true);
          } else if (res.data.code === 500) {
            resolve(false);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return (
    <div className="signup_container">
      <div className="header">
        <h1 className="title">회원가입</h1>
      </div>
      <form className="form_signup">
        <div className="form_control">
          <label className="form_label">ID</label>
          <input
            className="form_input"
            type="text"
            placeholder="8자리 이상의 아이디를 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserID(e.target.value);
              setIsDuplicate(false);
            }}
          />
          <button className="btn check_dup" onClick={onBtnCheckDup}>
            ID 중복 확인
          </button>
        </div>
        <div className="form_control">
          <label className="form_label">이름</label>
          <input
            className="form_input"
            type="text"
            placeholder="이름을 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="form_control">
          <label className="form_label">비밀번호</label>
          <input
            className="form_input"
            type="password"
            placeholder="8자리 이상의 비밀번호를 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </div>
        <div className="form_control">
          <label className="form_label">비밀번호 확인</label>
          <input
            className="form_input"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserPasswordCheck(e.target.value);
            }}
          />
        </div>
        <div className="form_control">
          <label className="form_label">관심분야 설정하기</label>
          <select className="form_select">
            <option value="코미디">코미디</option>
            <option value="로맨스">로맨스</option>
            <option value="하이틴">하이틴</option>
            <option value="공포">공포</option>
          </select>
          <button className="btn add" onClick={onAddPreference}>
            추가
          </button>
          <div className="preference_container">
            {preference.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <span className="preference_span">
                    {item}
                    <button className="btn delete" onClick={onDeletePreference}>
                      X
                    </button>
                  </span>
                </React.Fragment>
              );
            })}
          </div>
          <small className="small">
            관심분야 변경 또는 추가는 마이페이지에서도 가능합니다.
          </small>
        </div>
        <button className="btn submit" onClick={onSubmit}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
