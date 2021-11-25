import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import list, { actionCreators as listActions } from "../redux/modules/list";

import "../style/Detail.scss";
import { useDispatch } from "react-redux";

const dummyData = [
  { id: 0, username: "test1234", content: "재미있었어요" },
  { id: 1, username: "asdfasdf", content: "시간이 아까웠어요" },
  { id: 2, username: "jooa7878", content: "그럭저럭이었어요" },
  { id: 3, username: "helloworld", content: "가족이랑 같이 봤는데 괜찮았어요" },
  { id: 4, username: "test1234", content: "재미있었어요" },
  { id: 5, username: "asdfasdf", content: "시간이 아까웠어요" },
  { id: 6, username: "jooa7878", content: "그럭저럭이었어요" },
  { id: 7, username: "helloworld", content: "가족이랑 같이 봤는데 괜찮았어요" },
  { id: 8, username: "test1234", content: "재미있었어요" },
  { id: 9, username: "asdfasdf", content: "시간이 아까웠어요" },
  { id: 10, username: "jooa7878", content: "그럭저럭이었어요" },
  {
    id: 11,
    username: "helloworld",
    content: "가족이랑 같이 봤는데 괜찮았어요",
  },
];

function Detail({ props, history }) {
  const item = props.location.state;
  const dispatch = useDispatch();
  let [startIdx, setStartIdx] = useState(0);
  let [slidesPerview, setSlidesPerView] = useState(5);
  let [comment, setComment] = useState("");
  const user = useState((state) => state.user);
  console.log(item);

  const rendering = () => {
    const commentList = [];
    for (let i = startIdx; i < startIdx + slidesPerview; i++) {
      if (i === dummyData.length) break;
      commentList.push(
        <li className="comment_item">
          <span className="comment_username">{dummyData[i].username}</span>
          <p className="comment_content">{dummyData[i].content}</p>
        </li>
      );
    }
    if (startIdx === dummyData.length) setStartIdx(0);
    return commentList;
  };

  const onClick = (e) => {
    if (slidesPerview * 2 < dummyData.length) {
      setSlidesPerView(slidesPerview * 2);
    } else {
      setSlidesPerView(dummyData.length);
      document.querySelector(".btn_more").style.display = "none";
    }
  };

  const onSumbit = (e) => {
    e.preventDefault();

    if (!user.is_login) {
      window.alert("로그인 후 이용가능합니다.");
      history.replace("/signin");
    } else {
      if (comment === "") {
        window.alert("댓글을 입력해주세요");
      } else if (comment.trim().length < 5) {
        window.alert("댓글을 다섯글자 이상 입력해주세요");
      } else {
        dispatch(
          listActions.postComment(item.mt20id, user.user.userId, comment)
        );
      }
    }
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="detail_container">
      <div className="detail_inner">
        <div className="thumbnail_box">
          <img src={item.poster} alt={item.prfnm} className="thumbnail" />
        </div>
        <div className="info_box">
          <h3 className="info_title">{item.prfnm}</h3>
          <p className="info_description">
            {item.sty.trim() === "" ? "등록된 줄거리가 없습니다" : item.sty}
          </p>
          <address className="info_address">{item.fcltynm}</address>
          <a
            href={`https://map.kakao.com/link/search/${
              item.fcltynm
                .replaceAll(" ", "")
                .replaceAll("[", " ")
                .replaceAll("]", " ")
                .split("(")[0]
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="info_link"
          >
            <button className="info_btn">카카오지도로 확인하기</button>
          </a>
          <a href="/" target="_blank" className="info_reserve">
            예매하러 가기
          </a>
        </div>
      </div>
      <div className="detail_comment_container">
        <h4 className="comment_header">후기</h4>
        <form onSubmit={onSumbit}>
          <div className="input_container">
            <h5 className="comment_header"> 댓글을 작성해주세요!</h5>
            <input
              type="text"
              className="comment_input"
              onChange={onChange}
              placeholder="다섯글자 이상 작성 가능합니다"
            />
            <button type="submit" className="btn_submit">
              등록
            </button>
          </div>
        </form>
        <ul className="comment_list">
          {rendering()}
          <button className="btn_more" onClick={onClick}>
            댓글 더보기
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Detail;
