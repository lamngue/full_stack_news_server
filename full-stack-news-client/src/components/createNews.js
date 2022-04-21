import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import { actionCreators } from "../state/index";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
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
  const content = useSelector((state) => state.content);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { modifyContent, addNews } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const onContentChange = (e, editor) => {
    const data = editor.getData();
    modifyContent(data);
  };

  const onFinish = (values) => {
    values.content = content;
    console.log(values);
    addNews(values).then(() => {
      navigate("/");
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
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
          <Option value="sports">sports</Option>
          <Option value="business">business</Option>
          <Option value="politics">politics</Option>
          <Option value="entertainment">entertainment</Option>
          <Option value="tech">tech</Option>
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
        <CKEditor editor={ClassicEditor} onChange={onContentChange} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateNews;
