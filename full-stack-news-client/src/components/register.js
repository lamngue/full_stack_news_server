import { Form, Input, Button, Checkbox, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../redux/action_creators";
import { useNavigate } from "react-router";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onRegister = (values) => {
    dispatch(saveUser(values)).then((data) => {
      if (data === "Registered User") {
        navigate("/");
      } else {
        message.error("User with that username already exists");
      }
    });
  };

  const onRegisterFailed = async (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      validateMessages={validateMessages}
      onFinish={onRegister}
      onFinishFailed={onRegisterFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
          { type: "email" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
