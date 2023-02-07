import React, { useEffect, useState } from 'react'
import { Card, Col, Rate, Button, message } from "antd";
import config from '../../config';
import { useNavigate } from 'react-router-dom'
import ProductService from '../../Services/ProductService';
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import CartService from '../../Services/CartService';
const { Meta } = Card;

export default function ProductCard(props) {
    const [overAllRatings, setOverAllRatings] = useState(0)
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    console.log(props.location)
    const handleAddToCart = (e) => {
        let user = localStorage.getItem("user");
        if (!user) {
            navigate("/login")
        }
        let cartData = {
            prodcutname: props?.product?.prodcutname,
            productId: props?.product?._id,
            category: props?.product?.category,
            price: props?.product?.price,
            quantity: "1",
            size: "100x200",
            imgUrl: props?.product?.imgUrl,
            userId: JSON.parse(localStorage.getItem("user")).userId,
            status: true
        }
        CartService.addToCart(cartData).then((response) => {
            if (response.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: 'Added to cart successfully',
                });
            }
        }).catch((error) => {

        })
    }
    const handleDetailPageNavigate = (e) => {
        if (e.target.nodeName.toLowerCase() === "button" || e.target.nodeName.toLowerCase() === "span" || e.target.nodeName.toLowerCase() === "svg" || e.target.nodeName.toLowerCase() === "path") {
            e.nativeEvent.preventDefault();
            e.nativeEvent.stopPropagation();
        } else {
            navigate(`/product-details/${props.location !== "/cart" ? props?.product?._id : props?.product?.productId}`)
        }
    }
    useEffect(() => {
        let ratingObj = {
            productId: props.location !== "/cart" ? props?.product?._id : props?.product?.productId
        }
        ProductService.getProductRating(ratingObj).then((response) => {
            setOverAllRatings(response.data.totalRating)
        }).catch((error) => {

        })
    }, [])
    return (
        <div onClick={(e) => handleDetailPageNavigate(e)}>
            {contextHolder}
            <Col span={8} style={{ flex: "none" }} >
                <Card
                    hoverable
                    style={{
                        width: 240,
                        position: "relative"
                    }}
                    cover={
                        <img
                            alt="example"
                            src={`${config?.apiUrl}${props?.product?.imgUrl}`}
                            height="240px"
                        />
                    }
                >
                    <Meta title={props?.product?.prodcutname} description={`Rs ${props?.product?.price}`} />
                    {/* <div>Hello World</div> */}
                    {overAllRatings && (
                        <Rate allowHalf defaultValue={overAllRatings} disabled />
                    )}
                    {!overAllRatings && (
                        <Rate allowHalf defaultValue={0} disabled />
                    )}

                    {
                        props?.location === "/cart" ? (
                            <Button onClick={() => props?.handleRemoveProduct()} type="primary" danger style={{ width: "100%", marginTop: "8px" }}>
                                <DeleteOutlined /> Remove from cart
                            </Button>
                        ) : (
                            <Button onClick={(e) => handleAddToCart(e)} type="primary" primary style={{ width: "100%", background: "limegreen", marginTop: "8px", }}>
                                <ShoppingCartOutlined style={{ fontWeight: "bold" }} /> Add to Cart
                            </Button>
                        )
                    }
                </Card>
            </Col>
        </div>
    )
}
