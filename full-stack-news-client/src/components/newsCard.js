import { Link } from "react-router-dom";
import { Card } from "antd";
import slugify from "react-slugify";

const NewsCard = (props) => {
  return (
    <Card
      title={props.title}
      extra={
        <Link to={`/news/${slugify(props.title)}_${props.ID}`}>Detail</Link>
      }
      style={{ width: 300 }}
    >
      <p>{props.category}</p>
    </Card>
  );
};

export default NewsCard;
