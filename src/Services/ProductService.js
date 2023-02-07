import axios from "axios";
import config from "../config";

export default class ProductService {
    static createProduct(data) {
        return axios.post(`${config.apiUrl}/products/file-upload`, data);
    }

    static getProduct() {
        return axios.get(`${config.apiUrl}/products/get-products`);
    }

    static getCategory() {
        return axios.get(`${config.apiUrl}/products/get-category`);
    }

    static getProductByCategory(data) {
        return axios.post(`${config.apiUrl}/products/get-products-by-category`, data);
    }

    static getProductById(data) {
        return axios.post(`${config.apiUrl}/products/get-products-by-id`, data);
    }

    static createProductRating(data) {
        return axios.post(`${config.apiUrl}/products/rate-product`, data);
    }

    static getProductRating(data) {
        return axios.post(`${config.apiUrl}/products/get-ratings`, data);
    }
}
