import { React, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import NewsCard from "./newsCard";
import { clearNews, fetchNews } from "../redux/action_creators";
import useWindowSize from "../utils/useWindowSize";

const AllPosts = () => {
  const news = useSelector((state) => state.news);
  const { type } = useParams();
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearNews);
    dispatch(fetchNews(type));
  }, [type]);

  return (
    <div>
      <h2>All News</h2>
      {news && news.length > 0 ? (
        news.map((item) => <NewsCard type={type} key={item.ID} {...item} />)
      ) : news && news.length === 0 ? (
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
