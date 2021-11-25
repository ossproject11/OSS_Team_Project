import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentList from "../components/ContentList";

import { actionCreators as listActions } from "../redux/modules/list";
import "../style/Home.scss";

function Home() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.list);
  const [flag, setFlag] = useState("default");
  let listSet = new Set();
  let userWantSet = new Set();
  list.forEach((item) => {
    listSet.add(item.genrenm);
    userWantSet.add(item.user_want);
  });

  const theaterList = list.filter((x) => x.genrenm === "연극");
  const classicList = list.filter((x) => x.genrenm === "클래식");
  const traditionalMusicList = list.filter((x) => x.genrenm === "국악");
  const complexList = list.filter((x) => x.genrenm === "복합");
  const musicalList = list.filter((x) => x.genrenm === "뮤지컬");
  const dancingList = list.filter((x) => x.genrenm === "무용");
  const operaList = list.filter((x) => x.genrenm === "오페라");

  const comedyList = list.filter((x) => x.user_want === "코미디");
  const dramaList = list.filter((x) => x.user_want === "드라마");
  const mysteryList = list.filter((x) => x.user_want === "미스터리");
  const emotionList = list.filter((x) => x.user_want === "감동");
  const familyList = list.filter((x) => x.user_want === "가족");
  const romanceList = list.filter((x) => x.user_want === "로맨스");
  const oldstoryList = list.filter((x) => x.user_want === "사극");

  useEffect(() => {
    dispatch(listActions.getList());
  }, []);

  const onBtnClick = (e) => {
    document.querySelectorAll(".btn").forEach((el) => {
      if (el.classList.contains("selected")) el.classList.remove("selected");
    });

    e.target.classList.add("selected");
  };

  return (
    <div className="container">
      <div className="btn_container">
        <button
          className="btn selected"
          onClick={(e) => {
            onBtnClick(e);

            setFlag("default");
          }}
        >
          기본 정렬
        </button>
        <button
          className="btn"
          onClick={(e) => {
            onBtnClick(e);
            setFlag("preference");
          }}
        >
          선호 기반 정렬
        </button>
      </div>

      {flag === "default" ? (
        <>
          <ContentList list={theaterList} name="연극"></ContentList>
          <ContentList list={musicalList} name="뮤지컬"></ContentList>
          <ContentList list={classicList} name="클래식"></ContentList>
          <ContentList list={traditionalMusicList} name="국악"></ContentList>
          <ContentList list={complexList} name="복합"></ContentList>
          <ContentList list={dancingList} name="무용"></ContentList>
          <ContentList list={operaList} name="오페라"></ContentList>
        </>
      ) : (
        <>
          <ContentList list={comedyList} name="코미디"></ContentList>
          <ContentList list={musicalList} name="뮤지컬"></ContentList>
          <ContentList list={dramaList} name="드라마"></ContentList>
          <ContentList list={mysteryList} name="미스테리"></ContentList>
          <ContentList list={emotionList} name="감동"></ContentList>
          <ContentList list={familyList} name="가족"></ContentList>
          <ContentList list={romanceList} name="로맨스"></ContentList>
          <ContentList list={oldstoryList} name="사극"></ContentList>
        </>
      )}
    </div>
  );
}

export default Home;
