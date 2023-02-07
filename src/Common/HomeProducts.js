import React, { useState, useEffect } from "react";
import { Row, Empty, Button } from "antd";
import SectionTitle from "./SectionTitle";
import ProductCard from "../Component/Product/ProductCard";
import { useNavigate } from "react-router-dom";

export default function HomeProducts(props) {
  const [products, setProducts] = useState(props.products);
  const navigate = useNavigate();

  const handleNavigationToCategoryPage = (category) => {
    navigate(`/product-list/${category}`);
  };

  useEffect(() => {
    let productData = props?.products?.filter((data) => {
      return data.category === props.category;
    });
    setProducts(productData);
  }, []);

  return (
    <>
      <SectionTitle title={props.category} />
      <div className="site-card-wrapper">
        <Row gutter={16} style={{ display: "flex", justifyContent: "center" }}>
          {products?.length > 0 &&
            products?.map((product, index) => {
              if (product?.category === props?.category && index < 5) {
                return <ProductCard product={product} key={index} />;
              }
            })}

          {products?.length === 0 && (
            <>
              <Empty />
            </>
          )}
        </Row>
        {products?.length > 0 && (
          <div
            style={{
              display: "grid",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="primary"
              style={{ marginTop: "20px", width: "20%" }}
              onClick={() => handleNavigationToCategoryPage(props.category)}
            >
              View All
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
