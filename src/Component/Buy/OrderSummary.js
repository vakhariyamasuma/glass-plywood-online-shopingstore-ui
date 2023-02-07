import React, { useState } from 'react'
import { Divider, Button } from 'antd';

export default function OrderSummary(props) {
    const [buyingProductData, setBuyingProductData] = useState(JSON.parse(localStorage.getItem("buyingProductData")).products)
    const [totalPrice, setTotalPrice] = useState(JSON.parse(localStorage.getItem("buyingProductData")).totalPrice)
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
                <div style={{ width: "40%", border: "1px solid #ccc", borderRadius: "10px", background: "white" }}>
                    <div style={{ alignSelf: "center" }}>
                        <h2>Order Summary</h2>
                    </div>
                    <Divider />
                    <div style={{ paddingLeft: "10px", paddingRight: "10px", marginTop: "-20px" }}>
                        {buyingProductData.map((product) => {
                            return (
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h4>{product?.prodcutname} - (x{product?.quantity})</h4><h4>Rs {product?.price}</h4>
                                </div>
                            )
                        })}
                        <Divider />
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-20px", color: "brown" }}>
                            <h4>Total</h4><h4>Rs {totalPrice}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
                <div
                    style={{
                        marginTop: -4,
                    }}
                >
                    <Button type="primary" onClick={() => props.handleNext()}>
                        Next
                    </Button>
                </div>
            </div>
        </>
    )
}
