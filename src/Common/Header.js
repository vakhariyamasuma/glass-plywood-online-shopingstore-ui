import React, { useState, useEffect } from "react";
import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  AppstoreAddOutlined,
  ShoppingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Popover } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js",
    "//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js",
  ],
});

export default function Header(props) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(props.page);

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  let items = [];

  if (!localStorage.getItem("user")) {
    items = [
      {
        label: <Link to="/">Home</Link>,
        icon: <HomeOutlined />,
        key: "home",
      },

      {
        label: <Link to="/login">Login</Link>,
        icon: <UserOutlined />,
        key: "login",
      },
      {
        label: <Link to="/registration">Registration</Link>,
        key: "registration",
        icon: <UserAddOutlined />,
      },
    ];
  }

  if (JSON.parse(localStorage.getItem("user"))?.account_type === "business") {
    items = [
      {
        label: <Link to="/">Home</Link>,
        icon: <HomeOutlined />,
        key: "home",
      },
      {
        label: <Link to="/create-product">Create Products</Link>,
        key: "create-product",
        icon: <AppstoreAddOutlined />,
      },

      {
        label: `Welcome ${JSON.parse(localStorage.getItem("user")).name}`,
        icon: <UserOutlined />,
        key: "user",
      },

      {
        label: <Link to="/cart">Cart</Link>,
        key: "cart",
        icon: <IconFont type="icon-shoppingcart" />,
      },
      {
        label: <Link to="/orders">My Orders</Link>,
        key: "orders",
        icon: <ShoppingOutlined />,
      },
      {
        label: (
          <span
            onClick={() => {
              localStorage.clear();
              navigate(0);
            }}
          >
            logout
          </span>
        ),
        key: "logout",
        icon: <LogoutOutlined />,
      },
    ];
  }

  if (JSON.parse(localStorage.getItem("user"))?.account_type === "normal") {
    items = [
      {
        label: <Link to="/">Home</Link>,
        icon: <HomeOutlined />,
        key: "home",
      },
      {
        label: `Welcome ${JSON.parse(localStorage.getItem("user")).name}`,
        icon: <UserOutlined />,
        key: "user",
      },
      {
        label: <Link to="/cart">Cart</Link>,
        key: "cart",
        icon: <IconFont type="icon-shoppingcart" />,
      },
      {
        label: <Link to="/orders">My Orders</Link>,
        key: "orders",
        icon: <ShoppingOutlined />,
      },
      {
        label: (
          <span
            onClick={() => {
              localStorage.clear();
              navigate(0);
            }}
          >
            logout
          </span>
        ),
        key: "logout",
        icon: <LogoutOutlined />,
      },
    ];
  }

  return (
    <Menu
      onClick={onClick}
      style={{ display: "flex", justifyContent: "center" }}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}
