import React, { useEffect, useState } from 'react'
import Footer from '../../Common/Footer'
import Header from '../../Common/Header'
import OrderService from '../../Services/OrderService'
import { Collapse, Space, Divider, Empty } from 'antd';
import { useNavigate } from 'react-router-dom'
import SectionTitle from '../../Common/SectionTitle';

const { Panel } = Collapse;


export default function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([])

    useEffect(() => {
        let userData = {
            userId: JSON.parse(localStorage.getItem("user")).userId
        }
        OrderService.getOrders(userData).then((response) => {
            if (response.status === 200) {
                setOrders(response.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    return (
        <div>
            <Header />
            <SectionTitle title={`My Orders`} />
            <div style={{ padding: "20px" }} >
                {
                    orders.length > 0 && (
                        orders?.map((order) => {
                            return (
                                <div style={{ display: "grid", padding: "20px" }}>
                                    <Space direction="vertical">
                                        <Collapse collapsible="header" defaultActiveKey={['1']}>
                                            <Panel header={`Order No #${order._id}`} key="1">
                                                <p>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div>Created On <b>15th August 2022</b></div>
                                                        <div style={{ color: "brown" }}>Deliver To <b>{order.name}</b></div>
                                                        <div style={{ color: "green" }}>Estimated Time of Delivery <b>3 - 4 Working days</b></div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div style={{ color: "golden" }}>
                                                            <b style={{ color: "brown" }}>Shipping Address: </b>{order.address}
                                                        </div>
                                                        <div>
                                                            <b style={{ color: "blue" }} onClick={() => { navigate("/track") }}>Track Shipment</b>
                                                        </div>
                                                    </div>

                                                    {
                                                        order.products.map((product) => {
                                                            return (
                                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                    <b>{product?.prodcutname} - (x{product?.quantity})</b><b>Rs {product?.price}</b>

                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <Divider />
                                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-20px", color: "brown" }}>
                                                        <b>Total</b><b>Rs {order?.total}</b>

                                                    </div>

                                                </p>
                                            </Panel>
                                        </Collapse>

                                    </Space>
                                </div>
                            )

                        })

                    )
                }

                {
                    orders.length === 0 && (
                        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                            <Empty />
                        </div>
                    )
                }

            </div>
            <Footer />
        </div>
    )
}
