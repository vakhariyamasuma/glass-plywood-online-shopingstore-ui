import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Empty } from "antd";
import ProductCard from "../Component/Product/ProductCard";
import ProductList from "../Component/Product/ProductList";

export default function Cart(props) {
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
    <div>
      <ProductList />
      <Row gutter={16} style={{ display: "flex", justifyContent: "center" }}>
        {products?.length > 0 &&
          products?.map((product, index) => {
            if (product?.category === props?.category && index < 4) {
              return <ProductCard product={product} key={index} />;
            }
          })}

        {products?.length === 0 && (
          <>
            <Empty />
          </>
        )}
      </Row>
    </div>
  );
}
