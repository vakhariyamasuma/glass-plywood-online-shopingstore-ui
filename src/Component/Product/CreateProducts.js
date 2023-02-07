import React, { useState, useEffect } from "react";
import Header from "../../Common/Header";
import ProductService from "../../Services/ProductService";
import { InboxOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    Form,
    InputNumber,
    Row,
    Select,
    Upload,
    Input,
    message
} from "antd";
import SectionTitle from "../../Common/SectionTitle";
// import config from "../../config";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

export default function CreateProducts() {

    const [file, setFile] = useState(null)
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [categories, setCategories] = useState([])


    const normFile = (e) => {
        console.log("Upload event:", e);
        // setFile(e.fileList)

    };

    const dummyRequest = ({ file, onSuccess }) => {

        setTimeout(() => {
            console.log("test", file)
            setFile(file)
            onSuccess("ok");
        }, 0);
    };

    const handleFileEvent = (file) => {
        console.log(file)
    }

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        let formData = new FormData();
        for (const name in values) {
            if (name === "files") {
                formData.append("files", file);
            } else {
                formData.append(name, values[name]);
            }
        }

        console.log(formData)
        ProductService.createProduct(formData).then((response) => {
            if (response.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: 'Product Created Successfully',
                });
                setTimeout(() => {
                    navigate("/")
                }, 2000)

            }
        })
            .catch((err) => ("Error occured", err));
    };

    useEffect(() => {
        ProductService.getCategory().then((response) => {
            setCategories(response.data)
        }).catch((error) => {

        })
    }, [])

    return (
        <div>
            {contextHolder}
            <Header page={`create-product`} />
            <div style={{}}>
                <Row>
                    <Col span={18} push={6}>
                        <SectionTitle title={`Enter Your Product Information`} />
                        <Form
                            name="validate_other"
                            {...formItemLayout}
                            onFinish={onFinish}
                            initialValues={{
                                "input-number": 3,
                                "checkbox-group": ["A", "B"],
                                rate: 3.5,
                            }}
                        >
                            <Form.Item
                                label="Product Name"
                                name="prodcutname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Product Name!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Product Description"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input Intro",
                                    },
                                ]}
                            >
                                <Input.TextArea showCount maxLength={100} />
                            </Form.Item>

                            <Form.Item
                                name="category"
                                label="Product Category"
                                hasFeedback
                                rules={[
                                    { required: true, message: "Please select your category!" },
                                ]}
                            >
                                <Select placeholder="Please select a category">
                                    {categories.length > 0 && (
                                        categories.map((category) => {
                                            return (
                                                <Option value={category?.name}>{category?.name}</Option>
                                            )
                                        })
                                    )}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Product Price">
                                <Form.Item name="price" noStyle>
                                    <InputNumber />
                                </Form.Item>
                                <span className="ant-form-text" style={{ marginLeft: 8 }}>
                                    Rs
                                </span>
                            </Form.Item>

                            <Form.Item label="Upload Product Photo">
                                <Form.Item
                                    name="files"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    noStyle
                                >
                                    <Upload.Dragger name="files"
                                        customRequest={dummyRequest}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">
                                            Click or drag file to this area to upload
                                        </p>
                                        <p className="ant-upload-hint">
                                            Support for a single or bulk upload.
                                        </p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col
                        span={6}
                        pull={18}
                        style={{
                            background: "#02AAB0",
                            height: "93vh",
                            background: "linear-gradient(to right, #00CDAC, #02AAB0)",
                        }}
                    ></Col>
                </Row>
            </div>
        </div>
    );
}
