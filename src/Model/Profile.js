class Profile {
  id;
  name;
  email;
  description;
  bankAccountId;
  isCharity;
  constructor(id, name, email = "", description = "", bankAccountId) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.description = description;
    this.bankAccountId = bankAccountId;
    this.isCharity = false;
  }

  //getters:
  GetId() {
    return this.id;
  }
  GetName() {
    return this.name;
  }
  GetEmail() {
    return this.email;
  }
  GetDescription() {
    return this.description;
  }
  GetBankAccountId() {
    return this.GetBankAccountId();
  }

  //setters:
  SetName(name) {
    this.name = name;
  }
  SetEmail(email) {
    this.email = email;
  }
  SetDescription(description) {
    this.description = description;
  }
}
export default Profile;
