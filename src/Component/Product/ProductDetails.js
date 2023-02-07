import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductService from '../../Services/ProductService';
import { Rate, Select, InputNumber, Button, Tabs, Card, Result, message } from 'antd';
import { MoneyCollectOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Rating from './Rating';

import Header from '../../Common/Header';
import config from '../../config';
import Zoom from 'react-img-zoom'
import Footer from '../../Common/Footer';
import RatedUsers from './RatedUsers';
import CartService from '../../Services/CartService';
const { Meta } = Card;


export default function ProductDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [productData, setProductData] = useState([])
    const [ratings, setRatings] = useState(null)
    const [overAllRatings, setOverAllRatings] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState(1)

    let idObj = {
        id: params.id
    }

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            value: `${i * 10} x ${i * 20}mm`,
            label: `${i * 10} x ${i * 20}mm`,
        });
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setSize(value)
    };

    const onChangeQuantity = (value) => {
        console.log('changed', value);
        setQuantity(value)
    };

    const handleBuyNowClick = () => {
        let user = localStorage.getItem("user");
        if (!user) {
            navigate("/login")
        } else {
            let productArray = []
            let buyingProductData = {
                price: productData[0].price,
                prodcutname: productData[0].prodcutname,
                quantity: quantity,
                size: size,
                productId: params.id
            }
            productArray.push(buyingProductData)
            let productBuyingDetails = {
                totalPrice: productData[0].price * quantity,
                products: productArray
            }
            localStorage.setItem("buyingProductData", JSON.stringify(productBuyingDetails))
            navigate(`/buy/${productData[0]._id}`)
        }

    }

    const TabContent = (props) => {
        return (
            <>
                {props.tab === "Description" ? (
                    <div>
                        {productData.length > 0 && (
                            <p style={{ color: "#7a7a7a", lineHeight: "24px", fontSize: "14px" }}>{productData[0]?.description}</p>
                        )}
                    </div>
                ) : (
                    <div>
                        {productData.length > 0 && (
                            <div>
                                <span style={{ fontSize: "18px", fontWeight: "bold" }}>Rating:</span> <Rate allowHalf defaultValue={overAllRatings} disabled />

                                {
                                    ratings?.length > 0 && (
                                        ratings?.map((rating, index) => {
                                            return (
                                                <RatedUsers rating={rating} key={index} />
                                            )
                                        })
                                    )
                                }
                                {
                                    ratings.length === 0 && (
                                        <h3>There are no reviews yet</h3>
                                    )
                                }
                                <Rating ratingData={`Rating`} productId={params.id} />
                            </div>

                        )}
                    </div>
                )}
            </>
        )
    }

    const handleAddToCart = (e) => {
        let user = localStorage.getItem("user");
        if (!user) {
            navigate("/login")
        } else {
            let cartData = {
                prodcutname: productData[0]?.prodcutname,
                productId: productData[0]?._id,
                category: productData[0]?.category,
                price: productData[0]?.price,
                quantity: "1",
                size: "100x200",
                imgUrl: productData[0]?.imgUrl,
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

    }

    useEffect(() => {
        ProductService.getProductById(idObj).then((response) => {
            setProductData(response?.data)
            let ratingObj = {
                productId: params.id
            }
            ProductService.getProductRating(ratingObj).then((response) => {
                setOverAllRatings(response.data.totalRating)
                setRatings(response.data.userRatings)
            }).catch((error) => {

            })
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    return (
        <div>
            {contextHolder}
            <Header />
            {
                productData.length > 0 && (
                    <div style={{ padding: "30px", paddingTop: "40px" }}>

                        <div style={{ display: "flex" }}>
                            <div style={{ width: "40vw", boxShadow: "0 20px 30px 10px rgb(0 0 0 / 10%)" }}>
                                <Zoom height="400" width="575" zoomScale={3} img={`${config.apiUrl}${productData[0]?.imgUrl}`} />
                            </div>
                            <div style={{ width: "40vw", paddingLeft: "30px" }}>
                                <h1 >{productData[0]?.prodcutname}</h1>
                                {
                                    overAllRatings && (
                                        <div>
                                            <Rate allowHalf defaultValue={overAllRatings} disabled />&nbsp;<span>({ratings?.length})</span>
                                        </div>

                                    )
                                }

                                <h2>MRP: Rs {productData[0]?.price}</h2>
                                <p style={{ color: "#7a7a7a", lineHeight: "24px", fontSize: "14px" }}>{productData[0]?.description}</p>

                                <Select
                                    mode="tags"
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Sizes"
                                    onChange={handleChange}
                                    options={options}
                                />
                                <div style={{ marginTop: "10px", display: "flex", justifyContent: "start" }}>
                                    <InputNumber min={1} max={10} defaultValue={quantity} onChange={onChangeQuantity} />&nbsp;&nbsp;<span style={{ alignSelf: "center" }}>Quantity</span>
                                </div>

                                <div style={{ marginTop: "10px" }}>
                                    <Button type="primary" danger onClick={() => handleBuyNowClick()}>
                                        Buy Now <MoneyCollectOutlined />
                                    </Button>&nbsp;
                                    <Button type="primary" onClick={(e) => handleAddToCart(e)} primary>
                                        Add to Cart <ShoppingCartOutlined />
                                    </Button>
                                </div>

                            </div>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Tabs
                                defaultActiveKey="1"
                                items={["Description", "Rating"].map((tab, i) => {
                                    const id = String(i + 1);
                                    return {
                                        label: (
                                            <span>
                                                {tab}
                                            </span>
                                        ),
                                        key: id,
                                        children: <TabContent tab={tab} />,
                                    };
                                })}
                            />
                        </div>


                    </div>
                )
            }

            {
                productData?.length === 0 && (
                    <Result
                        status="500"
                        title="Data Not Found"
                        subTitle="Sorry, the product does not exist."
                        extra={<Button type="primary" onClick={() => { navigate("/") }}>Back Home</Button>}
                    />
                )
            }
            <Footer />
        </div>
    )
}
