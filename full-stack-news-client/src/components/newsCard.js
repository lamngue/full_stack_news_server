import { Link } from "react-router-dom";
import { Button, Card, Popconfirm, Space, message } from "antd";
import { deleteNews } from "../redux/action_creators";
import { useDispatch, useSelector } from "react-redux";
import slugify from "react-slugify";
import useWindowSize from "../utils/useWindowSize";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const NewsCard = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { width } = useWindowSize();
  const confirmDelete = (id) => {
    dispatch(deleteNews(id));
    message.success("Deleted News with ID " + id);
  };

  const cancel = (e) => {
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
            <Link to={`/main/news/${slugify(props.title)}_${props.ID}`}>
              {width > 700 ? "Detail" : null}
            </Link>
          </Button>

          <Button
            disabled={user.data.user.ID !== props.userID}
            icon={width <= 700 ? <EditOutlined /> : null}
          >
            <Link to={`/edit/${props.ID}`}>{width > 700 ? "Edit" : null}</Link>
          </Button>
          <Popconfirm
            title="Are you sure to delete this news?"
            onConfirm={() => confirmDelete(props.ID)}
            onCancel={cancel}
          >
            <Button
              disabled={user.data.user.ID !== props.userID}
              danger
              icon={width <= 700 ? <DeleteOutlined /> : null}
            >
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
