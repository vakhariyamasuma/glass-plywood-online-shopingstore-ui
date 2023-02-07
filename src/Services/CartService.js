import axios from "axios";
import config from "../config";

export default class CartService {
    static addToCart(data) {
        return axios.post(`${config.apiUrl}/cart/add-to-cart`, data);
    }
    static getCart(data) {
        return axios.post(`${config.apiUrl}/cart/get-cart`, data);
    }
    static removeFromCart(data) {
        return axios.post(`${config.apiUrl}/cart/remove-product-from-cart`, data);
    }
    static removeAllFromCart(data) {
        return axios.post(`${config.apiUrl}/cart/remove-all-from-cart`, data);
    }
}
