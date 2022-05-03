import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsDetail } from "../redux/action_creators";

const ViewAPost = () => {
  const { title } = useParams();
  const id = title.split("_")[1];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newsDetail = useSelector((state) => state.news.newsDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchNewsDetail(id));
    }
  }, [id]);

  useEffect(() => {
    console.log(newsDetail);
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!newsDetail) return <>Loading...</>;

  return (
    <div className="content-wrapper">
      <h1 style={{ fontSize: 36 }}>{newsDetail.title}</h1>
      <h2>by {newsDetail.username}</h2>
      <Divider orientation="right">
        <Button type="primary" onClick={handleGoBack}>
          Back
        </Button>
      </Divider>
      <div dangerouslySetInnerHTML={{ __html: newsDetail.content }}></div>
    </div>
  );
};

export default ViewAPost;
