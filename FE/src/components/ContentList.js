import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../style/ContentList.scss";

import MaterialIcon from "react-google-material-icons";

function ContentList(props) {
  let [startIdx, setStartIdx] = useState(0);
  const slidesPerview = 5;

  const onClick = (e) => {
    if (startIdx < props.list.length - 5) {
      setStartIdx(startIdx + slidesPerview);
    } else {
      setStartIdx(0);
    }
  };

  const rendering = () => {
    const contentList = [];

    for (let i = startIdx; i < startIdx + slidesPerview; i++) {
      if (i === props.list.length) break;
      contentList.push(
        <li className="content_item">
          <Link
            to={{
              pathname: `detail/${props.list[i].mt20id}`,
              state: props.list[i],
            }}
            className="content_link"
          >
            <img className="content_poster" src={props.list[i].poster} alt="" />
            <span key={i} className="content_name">
              {props.list[i].prfnm}
            </span>
          </Link>
        </li>
      );
    }

    if (startIdx === props.list.length) setStartIdx(0);
    return contentList;
  };

  return (
    <div className="content_container">
      <h2 className="content_header">{props.name} 목록</h2>
      <ul className="content_list">
        {rendering()}
        <button className="btn_view_more">
          <MaterialIcon icon="arrow_forward" size={24}></MaterialIcon>
        </button>
      </ul>
    </div>
  );
}

export default ContentList;
