import axios from "axios";
import { API_URL } from "../constants";
import BankAccount from "../Model/BankAccount";
import User from "../Model/User";

class UserService {
  static baseURL = API_URL;

  static async GetUser() {
    let req = axios.get(API_URL + "/user", {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    });

    let data = req.then((response) => {
      console.log(response.data.bankAccountId);
      return new User(response.data.id, response.data.username, response.data.email, "", response.data.bankAccountId);
    });
    return data;
  }
  static GetById(Id) {
    let req = axios.get(this.baseURL + "/user/" + Id, {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    });

    let data = req.then((response) => {
      return new User(response.data.id, response.data.username, response.data.email, "", response.data.bankAccountId);
    });
    return data;
  }
  static GetByName(name) {
    let req = axios.get(this.baseURL + "/user/" + name, {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    });

    let data = req.then((response) => {
      return new User(response.data.id, response.data.username, response.data.email, "", response.data.bankAccountId);
    });
    return data;
  }
  static Add(Object) {
    // return this.SendRequest(axios.post, this.baseURL, JSON.stringify(Object));
  }
  static GetProducts() {
    let req = axios.get(API_URL + "/product", {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    });

    let data = req.then((response) => {
      return response.data;
    });
    return data;
  }
  static GetBankAccountById(id) {
    let req = axios.get(this.baseURL + "/user/bankaccount?id=" + id, {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    });

    let data = req.then((response) => {
      return new BankAccount(response.data.id, response.data.amount, response.data.iban);
    });
    return data;
  }
}
export default UserService;
