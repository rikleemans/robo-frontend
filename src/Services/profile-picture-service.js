import ProfilePictureRequest from "../Request/Profile-picture-request";
import axios from "axios";
import CrudService from "./crud-service";
import { API_URL } from "../constants";

class ProfilePictureService {
  static baseURL = API_URL + "/user/picture";
  static Add(userId, picture) {
    const config = {
      headers: {
        Authorization: localStorage.getItem("user"),
        "Access-Control-Allow-Origin": "*",
      },
    };

    return axios.post("http://localhost:8082/user/picture/" + userId, picture, config);
  }
  static async GetById(Id) {
    const config = {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    };
    let pic = await axios.get(this.baseURL + "/" + Id, config);
    console.log(pic);
    return pic;
  }
}
export default ProfilePictureService;
