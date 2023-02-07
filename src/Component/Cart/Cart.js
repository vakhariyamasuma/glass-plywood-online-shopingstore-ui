import React, { useEffect, useState, useRef } from 'react'
import Footer from '../../Common/Footer'
import Header from '../../Common/Header'
import CartService from '../../Services/CartService'
import { Button, Result, Row, Empty, message, Modal } from 'antd';
import ProductCard from '../Product/ProductCard'
import { useNavigate, useLocation } from 'react-router-dom'
import SectionTitle from '../../Common/SectionTitle';
import { ShoppingOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';

export default function Cart() {
    const navigate = useNavigate()
    const location = useLocation()
    const [messageApi, contextHolder] = message.useMessage();
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });
    const [id, setId] = useState(null);

    const handleCheckout = () => {
        let sum = 0;
        products.map((product) => {
            sum = sum + (+product.price)
        })

        let productBuyingDetails = {
            cartProduct: true,
            totalPrice: sum,
            products: products
        }
        localStorage.setItem("buyingProductData", JSON.stringify(productBuyingDetails))
        navigate(`/buy/${products.productId}`)
    }

    const handleProductRemoveFromCart = (id) => {
        setId(id)
        setOpen(true)
    }

    useEffect(() => {
        let userObj = {
            userId: JSON.parse(localStorage.getItem("user")).userId
        }
        CartService.getCart(userObj).then((response) => {
            setProducts(response.data)
        }).catch((error) => {
            console.log(error)
            setError(true)
        })
    }, [])



    const draggleRef = useRef(null);
    const showModal = () => {
        setOpen(true);
    };
    const handleOkToRemove = (e) => {
        setOpen(false);
        let cartId = {
            _id: id
        }
        CartService.removeFromCart(cartId).then((response) => {
            if (response.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: 'Product Removed From Cart',
                });
                setTimeout(() => {
                    navigate(0)
                }, 500)
            }
        }).catch((error) => {
            console.log(error)
        })
        setOpen(false);
    };
    const handleCancel = (e) => {
        setId(null)
        setOpen(false);

    };
    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
    return (
        <div>
            {contextHolder}
            <Header page={`cart`} />
            <div>

                <div style={{ justifyContent: "center", width: "100%", display: "flex", marginTop: "0px" }}>
                    <SectionTitle title={`Products available in your cart`} />
                </div>
                {
                    products.length > 0 && (
                        <div style={{ justifyContent: "end", width: "100%", display: "flex", marginTop: "0px", paddingRight: "60px" }}>
                            <Button size={`large`} type="primary" onClick={() => handleCheckout()} style={{ fontWeight: "bold" }}><ShoppingOutlined />Checkout</Button>
                        </div>
                    )
                }

                <Row gutter={16} style={{ display: "flex", justifyContent: "flex-start", padding: "30px", paddingLeft: "70px" }}>
                    {
                        !error && products.length > 0 && (
                            products?.map((product, index) => {
                                return (

                                    <div style={{ marginTop: "10px" }}>
                                        <ProductCard product={product} key={index} location={location.pathname} handleRemoveProduct={() => handleProductRemoveFromCart(product._id)} />
                                    </div>
                                )
                            })
                        )
                    }
                    {
                        !error && products.length === 0 && (
                            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                <Empty />
                            </div>

                        )
                    }
                </Row>
                {
                    error && (
                        <Result
                            status="500"
                            title="500"
                            subTitle="Sorry, something went wrong."
                            extra={<Button type="primary" onClick={() => { navigate("/") }}>Back Home</Button>}
                        />
                    )
                }
            </div>



            <Modal
                title={
                    <div
                        style={{
                            width: '100%',
                            cursor: 'move',
                        }}
                        onMouseOver={() => {
                            if (disabled) {
                                setDisabled(false);
                            }
                        }}
                        onMouseOut={() => {
                            setDisabled(true);
                        }}
                        onFocus={() => { }}
                        onBlur={() => { }}
                    >
                        <h2>Alert</h2>
                    </div>
                }
                open={open}
                onOk={handleOkToRemove}
                onCancel={handleCancel}
                modalRender={(modal) => (
                    <Draggable
                        disabled={disabled}
                        bounds={bounds}
                        onStart={(event, uiData) => onStart(event, uiData)}
                    >
                        <div ref={draggleRef}>{modal}</div>
                    </Draggable>
                )}
            >
                <p style={{ color: "brown", fontSize: "15px", fontStyle: "italic", fontWeight: "bold" }}>
                    By doing this . Your product from the cart will be deleted.Still you want to remove this?
                </p>
            </Modal>
            <Footer />
        </div>
    )
}
