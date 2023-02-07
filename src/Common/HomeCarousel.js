import React from "react";
import { Carousel } from "antd";
const contentStyle = {
  height: "460px",
  color: "#fff",
  lineHeight: "460px",
  textAlign: "center",
  background: "#364d79",
};
export default function HomeCarousel() {
  return (
    <div className="homecraousel">
      <Carousel autoplay>
        <h3 style={contentStyle}>1</h3>

        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  );
}
