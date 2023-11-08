import CrudService from "./crud-service";
import axios from "axios";
import User from "../Model/User";
import { API_URL } from "../constants";

class UserSearchService extends CrudService {
  static baseURL = API_URL + "/user/part/";
  static async GetById(Id) {
    const config = {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    };
    let response = await axios.get(this.baseURL + Id, config).catch((error) => {
      console.log("User not found with " + Id);
      return null;
    });
    if (response != null) {
      let users = [];
      response.data.forEach((user) => {
        users.push(new User(user.id, user.username, user.email, "", user.bankAccountId));
      });
      return users;
    }
  }
}
export default UserSearchService;
