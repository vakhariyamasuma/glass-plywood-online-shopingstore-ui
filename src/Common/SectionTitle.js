import React from 'react'
import { Typography } from 'antd';
const { Title } = Typography;

export default function SectionTitle(props) {
    return (
        <div>
            <Title style={{ textAlign: "center", textTransform: "capitalize" }}>{props.title}</Title>
        </div>
    )
}
