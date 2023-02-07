import React, { useState, useEffect } from 'react'
import Header from '../../Common/Header'
import { useParams, useNavigate } from 'react-router-dom'
import ProductService from '../../Services/ProductService';
import ProductCard from './ProductCard';
import { Button, Result, Row, Input, Alert } from 'antd';
import Footer from '../../Common/Footer';

const { Search } = Input;

export default function ProductList() {
    const params = useParams();
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [productsCopy, setProductsCopy] = useState([])
    const [filterApplied, setFilterApplied] = useState(false)
    const [error, setError] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    const onSearch = (e) => {
        if (e !== "") {
            setFilterApplied(true)
        } else {
            setFilterApplied(false)
        }

        let searchedProducts = productsCopy.filter((product) => {
            return product.prodcutname.toLowerCase().includes(e.toLowerCase())
        })

        setProducts(searchedProducts)
    }

    const handleClose = () => {
        setFilterApplied(false)
        setSearchValue("")
        setProducts(productsCopy)

    }

    const searchProduct = (e) => {
        setSearchValue(e.target.value)
        onSearch(e.target.value)
    }



    useEffect(() => {
        let dataObj = {
            category: params.category
        }
        ProductService.getProductByCategory(dataObj).then((DataResponse) => {
            setProducts(DataResponse.data)
            setProductsCopy(DataResponse.data)
        }).catch((error) => {
            setError(true)
        })
    }, [])
    return (
        <div>
            <Header />
            <div>
                <div style={{ justifyContent: "center", width: "100%", display: "flex", marginTop: "20px" }}>
                    <Search value={searchValue} onChange={(e) => searchProduct(e)} placeholder="Type product name to search your product" onSearch={onSearch} enterButton style={{ width: "40%" }} />

                </div>
                {filterApplied ? (
                    <div style={{ justifyContent: "center", width: "100%", display: "flex", marginTop: "20px" }}>

                        <Alert message={`Showing ${products.length} Products, which we got after searching`} closable afterClose={handleClose} type="success" showIcon />
                    </div>
                ) : ("")}

                <Row gutter={16} style={{ display: "flex", justifyContent: "flex-start", padding: "30px", paddingLeft: "70px" }}>
                    {
                        !error && products.length > 0 && (
                            products?.map((product, index) => {
                                return (
                                    <div style={{ marginTop: "10px" }}>
                                        <ProductCard product={product} key={index} />
                                    </div>
                                )
                            })
                        )
                    }
                </Row>
                {
                    error && (
                        <Result
                            status="500"
                            title="500"
                            subTitle="Sorry, something went wrong."
                            extra={<Button type="primary" onClick={() => { navigate("/") }}>Back Home</Button>}
                        />
                    )
                }
            </div>
            <Footer />
        </div>
    )
}
