import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import "../style/MyPage.scss";

function MyPage({ history }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  const [inputUserPassword, setInputUserPassword] = useState("");
  const [preference, setPreference] = useState(user.user.userPreferenceList);

  if (!user.is_login) {
    window.alert("로그인 후 이용가능합니다.");
    history.replace("/signin");
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      userActions.modifyUser(
        user.user.userId,
        inputUserPassword,
        user.user.userName,
        preference,
        history
      )
    );
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
    <div className="user_info_container">
      <div className="header">
        <h1 className="title">유저 정보 수정</h1>
      </div>
      <form className="form_user_info">
        <div className="form_control">
          <label className="form_label">비밀번호</label>
          <input
            className="form_input"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setInputUserPassword(e.target.value);
            }}
          />
        </div>
        <div className="form_control">
          <label className="form_label">관심분야 변경하기</label>
          <select className="form_select">
            <option value="미스테리">미스테리</option>
            <option value="로맨스">로맨스</option>
            <option value="드라마">드라마</option>
            <option value="가족">가족</option>
            <option value="코미디">코미디</option>
            <option value="사극">사극</option>
            <option value="뮤지컬">뮤지컬</option>
            <option value="감동">감동</option>
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
                    <button className="btn" onClick={onDeletePreference}>
                      X
                    </button>
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <button className="btn submit" onClick={onSubmit}>
          회원 정보 수정
        </button>
      </form>
    </div>
  );
}

export default MyPage;
