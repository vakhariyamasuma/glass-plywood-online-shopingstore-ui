import React, { useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";

import { Button, Cascader, DatePicker, Form, Input, Radio, Select } from "antd";

import Header from "../../Common/Header";
import SectionTitle from "../../Common/SectionTitle";
import Footer from "../../Common/Footer";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function Registration() {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const onFormLayoutChange = (values) => {
    console.log(values);
    UserService.register(values)
      .then((response) => {
        if (response.data.status === "success") {
          messageApi.open({
            type: "success",
            content: "You are registered successfully",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
        console.log(response);
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: "An unexpcted error occured",
        });
        console.log(error);
      });
  };

  return (
    <div className="background">
      {contextHolder}
      <Header page="registration" />
      <SectionTitle title={`Registration`} />
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={onFormLayoutChange}
      >
        {/* <Form form={form} style={{ color: "#fff" }}> */}
        <Form.Item
          style={{ color: "white" }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Full Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* </Form> */}
        <Form.Item
          label="Account Type"
          name="account_type"
          rules={[
            {
              required: true,
              message: "Please input your Business type!",
            },
          ]}
        >
          <Select>
            <Select.Option value="business">Business</Select.Option>
            <Select.Option value="normal">Normal</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "please Enter your valide Email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: "Select Gender!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="State/City"
          name="state_city"
          rules={[
            {
              required: true,
              message: "Please select your State/City!",
            },
          ]}
        >
          <Cascader
            options={[
              {
                value: "gujrat",
                label: "Gujrat",
                children: [
                  {
                    value: "rajkot",
                    label: "Rajkot",
                  },
                ],
              },
              {
                value: "west_bengal",
                label: "West Bengal",
                children: [
                  {
                    value: "kolkata",
                    label: "Kolkata",
                  },
                ],
              },
              {
                value: "maharashtra",
                label: "Maharashtra",
                children: [
                  {
                    value: "mumbai",
                    label: "Mumbai",
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Mobile Number"
          name="mobile_number"
          rules={[
            {
              required: true,
              message: "Please Enter your Mobile Number!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please enter your Address!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Footer />
    </div>
  );
}
