import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentList from "../components/ContentList";

import { actionCreators as listActions } from "../redux/modules/list";
import "../style/Home.scss";

function Home() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.list);
  const is_loading = useSelector((state) => state.list.is_loading);
  let listSet = new Set();
  list.forEach((item) => {
    listSet.add(item.genrenm);
  });

  const theaterList = list.filter((x) => x.genrenm === "연극");
  const classicList = list.filter((x) => x.genrenm === "클래식");
  const traditionalMusicList = list.filter((x) => x.genrenm === "국악");
  const complexList = list.filter((x) => x.genrenm === "복합");
  const musicalList = list.filter((x) => x.genrenm === "뮤지컬");
  const dancingList = list.filter((x) => x.genrenm === "무용");
  const operaList = list.filter((x) => x.genrenm === "오페라");

  useEffect(() => {
    dispatch(listActions.getList());
  }, []);

  return (
    <div className="container">
      {is_loading ? (
        <span> 로딩중입니다.</span>
      ) : (
        <>
          <ContentList list={theaterList} name="연극"></ContentList>
          <ContentList list={musicalList} name="뮤지컬"></ContentList>
          <ContentList list={classicList} name="클래식"></ContentList>
          <ContentList list={traditionalMusicList} name="국악"></ContentList>
          <ContentList list={complexList} name="복합"></ContentList>
          <ContentList list={dancingList} name="무용"></ContentList>
          <ContentList list={operaList} name="오페라"></ContentList>
        </>
      )}
    </div>
  );
}

export default Home;
