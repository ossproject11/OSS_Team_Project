import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TheaterList from "../components/TheaterList";

import { actionCreators as listActions } from "../redux/modules/list";
import "../style/Home.scss";

function Home() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.list);

  console.log(list);
  useEffect(() => {
    dispatch(listActions.getList());
  }, []);

  return (
    <div className="container">
      <TheaterList></TheaterList>
    </div>
  );
}

export default Home;
