class TransactionModel {
  amount;
  description;
  sendingBackAccountId;
  receivingBankAccountId;

  constructor(senderId, receiverId, amount, description = "") {
    this.sendingBackAccountId = senderId;
    this.receivingBankAccountId = receiverId;
    this.amount = amount;
    this.description = description;
  }
  //getters
  GetSenderId() {
    return this.sendingBackAccountId;
  }
  GetReceiverId() {
    return this.receivingBankAccountId;
  }
  GetAmount() {
    return this.amount;
  }
  GetDescription() {
    return this.description;
  }
}

export default TransactionModel;
