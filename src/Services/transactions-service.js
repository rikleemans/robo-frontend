import { API_URL } from "../constants";
import CrudService from "./crud-service";
import axios from "axios";
import UserService from "./user-service";
import TransactionModel from "../Model/TransactionModel";
import CharitiesService from "./charities-service";

class TransactionsService extends CrudService {
  static baseURL = API_URL + "/transaction";

  static async GetByUserId(UserId) {
    //return this.SendRequest(axios.get, this.baseURL + "/" + Id);
    let bankId = await UserService.GetBankAccountById(UserId);
    console.log(UserId, "test", bankId);
    let req = axios.get(this.baseURL + "/user/" + UserId, {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    });
    let data = req.then((response) => {
      return response;
    });
    return data;
  }
  static async Donate(senderId, charityId, amount, description) {
    let senderBankAccountId = await UserService.GetBankAccountById(senderId);
    let receiverBankAccountId = await CharitiesService.GetCharity(charityId);
    let donation = new TransactionModel(senderId, receiverBankAccountId, amount, description);

    const config = {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    };
    let response = axios.post(this.baseURL + "/charity", donation, config).catch((error) => {
      console.log(error.message);
      return null;
    });
    if (response != null) return response.data;
  }

  static async AddTransaction(senderId, receiverId, amount, description) {
    let senderBankAccountId = await UserService.GetBankAccountById(senderId);
    let receiverBankAccountId = await UserService.GetBankAccountById(receiverId);
    let transaction = new TransactionModel(senderId, receiverId, amount, description);

    console.log(transaction);
    const config = {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    };
    let response = axios
      .post(this.baseURL + "/user", transaction, config)
      .then((e) => console.log(e))
      .catch((error) => {
        console.log(error.message);
        return null;
      });
    if (response != null) return response.data;
  }
}
export default TransactionsService;
