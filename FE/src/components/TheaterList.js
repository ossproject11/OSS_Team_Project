import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../style/TheaterList.scss";

import MaterialIcon from "react-google-material-icons";

const dummyData = [
  { id: 1, name: "옥탑방 고양이" },
  { id: 2, name: "어쩌고" },
  { id: 3, name: "nameTest" },
  { id: 4, name: "옥탑방 고양이" },
  { id: 5, name: "어쩌고" },
  { id: 6, name: "nameTest" },
  { id: 7, name: "옥탑방 고양이" },
  { id: 8, name: "어쩌고" },
  { id: 9, name: "nameTest" },
  { id: 10, name: "옥탑방 고양이" },
  { id: 11, name: "어쩌고" },
  { id: 12, name: "nameTest" },
  { id: 13, name: "옥탑방 고양이" },
  { id: 14, name: "어쩌고" },
  { id: 15, name: "nameTest" },
  { id: 16, name: "옥탑방 고양이" },
  { id: 17, name: "어쩌고" },
  { id: 18, name: "nameTest" },
];

function TheaterList() {
  let [startIdx, setStartIdx] = useState(0);
  const slidesPerview = 5;

  const onClick = (e) => {
    if (startIdx < dummyData.length - 5) {
      setStartIdx(startIdx + slidesPerview);
    } else {
      setStartIdx(0);
    }
  };

  const rendering = () => {
    const theaterList = [];
    for (let i = startIdx; i < startIdx + slidesPerview; i++) {
      if (i === dummyData.length) break;
      theaterList.push(
        <li className="theater_item">
          <Link
            to={{
              pathname: `detail/${dummyData[i].id}`,
              state: dummyData[i],
            }}
            className="theater_link"
          >
            <span key={i} className="theater_name">
              {dummyData[i].name}
            </span>
          </Link>
        </li>
      );
    }

    if (startIdx === dummyData.length) setStartIdx(0);
    return theaterList;
  };

  return (
    <div className="theater_container">
      <h2 className="theater_header">연극 목록</h2>
      <ul className="theater_list">
        {rendering()}
        <button className="btn_view_more" onClick={onClick}>
          <MaterialIcon icon="arrow_forward" size={24}></MaterialIcon>
        </button>
      </ul>
    </div>
  );
}

export default TheaterList;
