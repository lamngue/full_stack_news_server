import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Col, Row } from "antd";
import { actionCreators } from "../state/index";
const AllPosts = () => {
  const news = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const { fetchNews, clearNews } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    clearNews();
    fetchNews();
  }, []);

  const renderNews = () => {
    console.log(news);
    let secondColumnStart = 0;
    secondColumnStart = Math.floor(news.length / 2);
    const col1Item = news.slice(0, secondColumnStart);
    const col2Item = news.slice(secondColumnStart);
    return (
      <Row gutter={16}>
        <Col span={8}>
          {col1Item.map((n) => {
            return (
              <Card
                title={n.title}
                extra={<a href="#">More</a>}
                style={{ width: 300 }}
              >
                <p>{n.category}</p>
                <p dangerouslySetInnerHTML={{ __html: n.content }}></p>
              </Card>
            );
          })}
        </Col>
        <Col span={8}>
          {col2Item.map((n) => {
            return (
              <Card
                title={n.title}
                extra={<a href="#">More</a>}
                style={{ width: 300 }}
              >
                <p>{n.category}</p>
                <p dangerouslySetInnerHTML={{ __html: n.content }}></p>
              </Card>
            );
          })}
        </Col>
      </Row>
    );
  };

  return (
    <div>
      <h2>All Posts</h2>
      {renderNews()}
    </div>
  );
};

export default AllPosts;
