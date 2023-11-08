import { API_URL } from "../constants";
import axios from "axios";

class CharitiesService {
  static async GetCharity(Id) {
    let req = axios.get(API_URL + "/charity/" + Id, {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    });

    let data = req.then((response) => {
      return response.data.bankAccountId;
    });

    return data;
  }
}
export default CharitiesService;
