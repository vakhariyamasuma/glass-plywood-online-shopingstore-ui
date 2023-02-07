import React, { useState } from 'react'
import { Button, message, Steps, theme } from 'antd';
import Header from '../../Common/Header';
import Footer from '../../Common/Footer';
import OrderSummary from './OrderSummary';
import ShippingDetails from './ShippingDetails';
import Payment from './Payment';
export default function BuyNow() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const steps = [
        {
            title: 'Order Review',
            content: <OrderSummary current={current} handleNext={() => next()} handlePrev={() => prev()} />,
        },
        {
            title: 'Shipping Details',
            content: <ShippingDetails current={current} handleNext={() => next()} handlePrev={() => prev()} />,
        },
        {
            title: 'Payment',
            content: <Payment current={current} handleNext={() => next()} handlePrev={() => prev()} />,
        },
    ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    const contentStyle = {
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };
    return (
        <div>
            <Header />
            <div style={{ padding: "60px", paddingTop: "20px" }}>
                <Steps current={current} items={items} />
                <div style={contentStyle}>{steps[current].content}</div>
            </div>
            <Footer />
        </div>
    )
}
