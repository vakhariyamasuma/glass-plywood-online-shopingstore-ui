import axios from "axios";
import config from "../config";

export default class OrderService {
    static createOrder(data) {
        return axios.post(`${config.apiUrl}/orders/create-order`, data);
    }
    static getOrders(data) {
        return axios.post(`${config.apiUrl}/orders/get-orders`, data);
    }
}
