import axios from "axios";
import config from "../config";

export default class UserService {
  static register(data) {
    return axios.post(`${config.apiUrl}/users/registration`, data);
  }
  static auth(data) {
    return axios.post(`${config.apiUrl}/users/login`, data);
  }
}
