import axios from "axios";
import { API_URL } from "../constants";

//to be removed
class CrudService {
  static baseURL = API_URL;

  static GetAll() {
    return this.SendRequest(axios.get, this.baseURL);
  }
  static GetById(Id) {
    //return this.SendRequest(axios.get, this.baseURL + "/" + Id);
    let req = axios.get(this.baseURL + Id, {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    });

    let data = req.then((response) => {
      return response;
    });
    return data;
  }
  static Add(Object) {
    return this.SendRequest(axios.post, this.baseURL, JSON.stringify(Object));
  }
  static Delete(Id) {
    return this.SendRequest(axios.delete, this.baseURL + "/" + Id);
  }

  static async SendRequest(requestType, url, optionalParameter = "") {
    const config = {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    };
    let response = await requestType(url, optionalParameter, config).catch((error) => {
      console.log(error.message);
      return null;
    });

    if (response != null) return response.data;
  }
}
export default CrudService;
