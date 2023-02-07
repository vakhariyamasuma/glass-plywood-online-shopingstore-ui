import React from 'react'
import { Rate, Avatar } from 'antd';

export default function RatedUsers(props) {
    return (
        <div style={{ marginTop: "10px" }}>
            <div style={{ border: "1px solid brown", padding: "10px", width: "30%", borderRadius: "10px" }}>
                <div><Rate allowHalf defaultValue={+props?.rating?.rating} disabled /></div>
                <div style={{ display: "flex" }}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />&nbsp;&nbsp;
                    <span style={{ alignSelf: "center", fontWeight: "bold" }}>{props?.rating?.name}</span>
                </div>
                <p style={{ fontSize: "12px", opacity: "0.7", fontStyle: "italic" }}>{props?.rating?.message}</p>
            </div>
        </div>
    )
}
