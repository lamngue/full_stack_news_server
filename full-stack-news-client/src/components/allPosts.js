import { React, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import NewsCard from "./newsCard";
import { clearNews, fetchNews } from "../redux/action_creators";

const AllPosts = () => {
  const news = useSelector((state) => state.news);
  const { type } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearNews);
    dispatch(fetchNews(type));
  }, [type]);

  const handleChangePage = (page, pageSize) => {
    dispatch(fetchNews(type, pageSize, page));
  };

  return (
    <div>
      <h2>All News</h2>
      {news.result && news.totalLength > 0 ? (
        <>
          {news.result.map((item) => (
            <NewsCard type={type} key={item.ID} {...item} />
          ))}
          <br />
          <Pagination
            onChange={handleChangePage}
            defaultPageSize={5}
            defaultCurrent={1}
            total={news.totalLength}
          />
        </>
      ) : news.result && news.totalLength === 0 ? (
        <h3>
          There is no news to show :(. Please go to "Create News" to make one.
        </h3>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default AllPosts;
