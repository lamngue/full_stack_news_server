import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchNewsDetail } from "../state/action_creators";

const ViewAPost = () => {
  const { title } = useParams();
  const id = title.split("_")[1];
  const dispatch = useDispatch();
  const newsDetail = useSelector((state) => state.news.newsDetail);

  useEffect(() => {
    if (id) {
      console.log("id", id);
      dispatch(fetchNewsDetail(id));
    }
  }, [id]);

  if (!newsDetail) return <>Loading...</>;

  return (
    <div className="content-wrapper">
      <h1 style={{ fontSize: 36 }}>{newsDetail.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: newsDetail.content }}></div>
    </div>
  );
};

export default ViewAPost;
