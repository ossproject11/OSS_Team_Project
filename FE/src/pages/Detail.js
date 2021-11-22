import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import "../style/Detail.scss";

function Detail(props) {
  const item = props.location.state;
  console.log(item);

  return (
    <div className="detail_container">
      <div className="detail_inner">
        <div className="thumbnail_box">THUMBNAIL</div>
        <div className="info_box">
          <h3 className="info_title">{item.name}</h3>
          <p className="info_description">content 설명</p>
          <address className="info_address">위치</address>
          <Link to="/map" className="info_link">
            <button className="info_btn">카카오지도로 확인하기</button>
          </Link>
          <a href="/" target="_blank" className="info_reserve">
            예매하러 가기
          </a>
        </div>
      </div>
      <div className="detail_comment_container">
        <h4 className="comment_header">후기</h4>
      </div>
    </div>
  );
}

export default Detail;
