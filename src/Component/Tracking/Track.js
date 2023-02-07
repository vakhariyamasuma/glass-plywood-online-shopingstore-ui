import { Timeline } from 'antd';
import { useState } from 'react';
import Footer from '../../Common/Footer';
import Header from '../../Common/Header';
import SectionTitle from '../../Common/SectionTitle';

export default function Track() {
    return (
        <div>
            <Header />
            <SectionTitle title={`Current Status Of the Consingnement`} />
            <div style={{ padding: "60px" }}>
                <Timeline mode={`left`}>
                    <Timeline.Item label="2022-08-20">Reached Destination Facility</Timeline.Item>
                    <Timeline.Item label="2022-08-17 09:12:11">Reached Airport</Timeline.Item>
                    <Timeline.Item>Ready for departure for destination</Timeline.Item>
                    <Timeline.Item label="2022-08-15 09:12:11">Picked Up By Near by Facility</Timeline.Item>
                </Timeline>
            </div>
            <Footer />
        </div>
    )
}
