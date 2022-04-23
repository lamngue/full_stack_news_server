import { Link } from "react-router-dom";
import { Button, Card, Popconfirm, Space, message } from "antd";
import { deleteNews, fetchNews } from "../state/action_creators";
import { useDispatch } from "react-redux";
import slugify from "react-slugify";

const NewsCard = (props) => {
  const dispatch = useDispatch();
  const confirmDelete = (id) => {
    dispatch(deleteNews(id));
    dispatch(fetchNews(props.type));
    message.success("Deleted News with ID " + id);
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <Card
      title={props.title}
      extra={
        <Space size="middle">
          <Button type="primary">
            <Link to={`/news/${slugify(props.title)}_${props.ID}`}>Detail</Link>
          </Button>
          <Button>
            <Link to={`/edit/${props.ID}`}>Edit</Link>
          </Button>
          <Popconfirm
            title="Are you sure to delete this news?"
            onConfirm={() => confirmDelete(props.ID)}
            onCancel={cancel}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      }
      style={{ width: "100%" }}
    >
      <p>{props.category}</p>
    </Card>
  );
};

export default NewsCard;
