import { React, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Col, Row } from "antd";
import { actionCreators } from "../state/index";
import slugify from "react-slugify";

const AllPosts = () => {
  const news = useSelector((state) => state.news);
  const { type } = useParams();
  const dispatch = useDispatch();
  const { fetchNews, clearNews } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    clearNews();
    fetchNews(type);
  }, [type]);

  const renderNews = () => {
    if (!news) return;
    let secondColumnStart = 0;
    secondColumnStart = Math.ceil(news.length / 3);
    let thirdColumnStart = secondColumnStart * 2;
    const col1Item = news.slice(0, secondColumnStart);
    const col2Item = news.slice(secondColumnStart, thirdColumnStart);
    const col3Item = news.slice(thirdColumnStart);
    return (
      <Row gutter={16}>
        <Col span={8}>
          {col1Item.map((n, idx) => {
            return (
              <Card
                key={idx}
                title={n.title}
                extra={<Link to={`/info/${slugify(n.title)}`}>More</Link>}
                style={{ width: 300 }}
              >
                <p>{n.category}</p>
                <p dangerouslySetInnerHTML={{ __html: n.content }}></p>
              </Card>
            );
          })}
        </Col>
        <Col span={8}>
          {col2Item.map((n, idx) => {
            return (
              <Card
                key={idx}
                title={n.title}
                extra={<Link to={`/info/${slugify(n.title)}`}>More</Link>}
                style={{ width: 300 }}
              >
                <p>{n.category}</p>
                <p dangerouslySetInnerHTML={{ __html: n.content }}></p>
              </Card>
            );
          })}
        </Col>
        <Col span={8}>
          {col3Item.map((n, idx) => {
            return (
              <Card
                key={idx}
                title={n.title}
                extra={<Link to={`/info/${slugify(n.title)}`}>More</Link>}
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
