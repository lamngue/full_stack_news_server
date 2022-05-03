import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Card, message, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addNews, editNews } from "../redux/action_creators";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchNewsDetail } from "../redux/action_creators";
import { normalizeNewsEdit } from "../utils";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CreateNews = (props) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const isEdit = !!id;
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.user);
  const newsDetail = useSelector((state) => state.news.newsDetail);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchNewsDetail(id));
    }
  }, [id]);

  useEffect(() => {
    if (newsDetail) {
      form.setFieldsValue(normalizeNewsEdit(newsDetail));
      setContent(newsDetail.content);
    }
  }, [newsDetail]);

  const onContentChange = (e, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const onFinish = async (values) => {
    values.content = content;
    values.userID = user.data.id;
    if (isEdit) {
      dispatch(editNews({ id, values }));
      message.success("Update completed!");
    } else {
      dispatch(addNews(values));
      navigate("/main/all-post");
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card title={isEdit ? "Edit News" : "Create News"}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select mode="multiple" placeholder="Select option(s)" allowClear>
            {categories?.length
              ? categories.map((item) => (
                  <Option key={item.ID} value={item.ID}>
                    {item.type}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <CKEditor
            editor={ClassicEditor}
            data={content}
            // config={{
            //   ckfinder: {
            //     uploadUrl: "http://localhost:3001/upload-image",
            //   },
            // }}
            onChange={onContentChange}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              {isEdit ? "Update" : "Create"}
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateNews;
