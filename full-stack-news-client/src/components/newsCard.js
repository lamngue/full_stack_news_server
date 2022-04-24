import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Popconfirm, Space, Tooltip, message } from "antd";
import { deleteNews, fetchNews } from "../redux/action_creators";
import { useDispatch } from "react-redux";
import slugify from "react-slugify";
import useWindowSize from "../utils/useWindowSize";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const NewsCard = (props) => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
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
          <Button
            type="primary"
            icon={width <= 700 ? <InfoCircleOutlined /> : null}
          >
            <Link to={`/news/${slugify(props.title)}_${props.ID}`}>
              {width > 700 ? "Detail" : null}
            </Link>
          </Button>

          <Button icon={width <= 700 ? <EditOutlined /> : null}>
            <Link to={`/edit/${props.ID}`}>{width > 700 ? "Edit" : null}</Link>
          </Button>
          <Popconfirm
            title="Are you sure to delete this news?"
            onConfirm={() => confirmDelete(props.ID)}
            onCancel={cancel}
          >
            <Button danger icon={width <= 700 ? <DeleteOutlined /> : null}>
              {width > 700 ? "Delete" : null}
            </Button>
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
