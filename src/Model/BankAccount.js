class BankAccount {
  id;
  amount;
  iban;
  constructor(id, amount, iban) {
    this.id = id;
    this.amount = amount;
    this.iban = iban;
  }

  //getters:
  GetId() {
    return this.id;
  }
  GetAmount() {
    return this.amount;
  }
  GetIban() {
    return this.iban;
  }

  //setters:
  SetAmount(amount) {
    this.amount = amount;
  }
}
export default BankAccount;
