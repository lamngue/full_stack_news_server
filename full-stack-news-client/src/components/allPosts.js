import { React, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import NewsCard from "./newsCard";
import { clearNews, fetchNews } from "../state/action_creators";

const AllPosts = () => {
  const news = useSelector((state) => state.news);
  const { type } = useParams();
  const dispatch = useDispatch();
  // const { fetchNews, clearNews } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    dispatch(clearNews);
    dispatch(fetchNews(type));
  }, [type]);

  return (
    <div>
      <h2>All Posts</h2>
      {news?.length ? (
        news.map((item) => <NewsCard key={item.ID} {...item} />)
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default AllPosts;
