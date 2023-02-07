import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import UserService from "../../Services/UserService";
import { useNavigate } from "react-router-dom";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import SectionTitle from "../../Common/SectionTitle";

export default function Login(props) {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [accountType, setAccountType] = useState("");

  const onFinish = (values) => {
    console.log("Success:", values);
    UserService.auth(values)
      .then((response) => {
        if (response.status === 200) {
          let userData = response.data;
          setAccountType(userData.account_type);
          userData = JSON.stringify(userData);
          localStorage.setItem("user", userData);
          messageApi.open({
            type: "success",
            content: "You have logined successfully",
          });
          setTimeout(() => {
            navigate(0);
          }, 2000);
        }
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: "Email or password is invailid",
        });
        console.log(error);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {contextHolder}
      <Header page={`login`} accountType={accountType} />
      <SectionTitle title={`Signin`} />
      <div
        style={{
          height: "300px",
          width: "90%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 29,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ marginTop: "20px", width: "40%" }}
        >
          <Form.Item
            label="Email"
            name="email"
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
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </div>
  );
}
