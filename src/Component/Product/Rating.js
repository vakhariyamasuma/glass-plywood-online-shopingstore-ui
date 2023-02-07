import React, { useState } from 'react'
import { Rate, Form, Input, Button, message } from 'antd';
import ProductService from '../../Services/ProductService';
import { useNavigate } from "react-router-dom";

export default function Rating(props) {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [ratingValue, setRatingValue] = useState(0);


    const onFinish = (values) => {
        values["rating"] = ratingValue
        values["productId"] = props.productId
        console.log(values)
        ProductService.createProductRating(values).then((response) => {
            if (response.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: 'You have reviwed the current product successfully',
                });
                setTimeout(() => {
                    navigate(0)
                }, 2000)
            }
        }).catch((error) => {

        })
    }
    return (
        <div style={{ width: "40%" }}>
            {contextHolder}
            <h3>Your Rating</h3>
            <Rate allowHalf defaultValue={0} onChange={setRatingValue} value={ratingValue} style={{ marginBottom: "10px" }} />
            <Form
                name="validate_other"
                onFinish={onFinish}
                initialValues={{
                    "input-number": 3,
                    "checkbox-group": ["A", "B"],
                    rate: 3.5,
                }}
            >

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your Name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="message"
                    label="Message"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your message!",
                        },
                    ]}
                >
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
