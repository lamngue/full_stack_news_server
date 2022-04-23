import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsDetail } from "../state/action_creators";

const ViewAPost = () => {
  const { title } = useParams();
  const id = title.split("_")[1];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newsDetail = useSelector((state) => state.news.newsDetail);

  useEffect(() => {
    if (id) {
      console.log("id", id);
      dispatch(fetchNewsDetail(id));
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!newsDetail) return <>Loading...</>;

  return (
    <div className="content-wrapper">
      <h1 style={{ fontSize: 36 }}>{newsDetail.title}</h1>
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
