import axios from "axios";
import { API_URL } from "../constants";

class AuthService {
  loginURL = API_URL + "/login";
  registerURL = API_URL + "/register/user";

  static async Login(username, password) {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    };
    return axios.post(
      API_URL + "/login",
      {
        username: username,
        password: password,
      },
      {
        headers: headers,
      }
    );
  }
  static Logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
  }
  static async Register(username, password, email) {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
    };
    return axios.post(
      API_URL + "/register/user",
      {
        username: username,
        password: password,
        email: email,
      },
      {
        headers: headers,
      }
    );
  }
}
export default AuthService;
