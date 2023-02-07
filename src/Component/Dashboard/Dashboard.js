import React, { useState, useEffect } from 'react'
import HomeCarousel from '../../Common/HomeCarousel'
import Header from '../../Common/Header'
import SectionTitle from '../../Common/SectionTitle'
import ProductCard from '../../Common/HomeProducts'
import Footer from '../../Common/Footer'
import ProductService from '../../Services/ProductService'

export default function Dashboard() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    let a = ["1", "2", "3"]

    useEffect(() => {
        setLoading(true)
        ProductService.getCategory().then((categoryResponse) => {

            ProductService.getProduct().then((productResponse) => {
                setProducts(productResponse.data)
                setCategories(categoryResponse.data)
                setLoading(false)
                console.log(categories)
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })

    }, [])
    return (
        <div>
            <Header page={`home`} />
            <HomeCarousel />
            {!loading && categories?.length && products?.length > 0 && (
                categories?.map((category, index) => {
                    return (
                        <ProductCard category={category.name} key={index} products={products} />
                    )
                })
            )}
            <ProductCard />
            <Footer />
        </div>
    );
}
