import React, { useState, useEffect } from 'react'
import {
    Col,
    Form,
    Row,
    Input,
    Button
} from "antd";

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

export default function ShippingDetails(props) {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")))


    const onFinish = (values) => {
        values = JSON.stringify(values);
        localStorage.setItem("shippingDetails", values)
        props.handleNext()
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
            <div style={{ width: "100%", border: "1px solid #ccc", borderRadius: "10px", background: "white" }}>

                <div>
                    <Row>
                        <Col span={18} push={3}>
                            <div style={{ alignSelf: "center" }}>
                                <h2>Shipping Details</h2>
                            </div>
                            <Form
                                name="validate_other"
                                {...formItemLayout}
                                onFinish={onFinish}
                                initialValues={{
                                    name: userData?.name,
                                    email: userData?.email,
                                    address: userData?.address,
                                    mobile_number: userData?.mobile_number
                                }}
                            >
                                <Form.Item
                                    label="Name"
                                    name="name"

                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your Name!",
                                        },
                                    ]}
                                >
                                    <Input value={userData?.name || "Hello"} />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your Name!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Phone Number"
                                    name="mobile_number"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your Name!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="address"
                                    label="Address"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Intro",
                                        },
                                    ]}
                                >
                                    <Input.TextArea showCount maxLength={100} />
                                </Form.Item>
                                <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
                                    <Button type="primary" htmlType="submit" >
                                        Next
                                    </Button>

                                    <Button
                                        style={{
                                            margin: '0 8px',
                                        }}
                                        onClick={() => props.handlePrev()}
                                    >
                                        Previous
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </div >
    )
}
