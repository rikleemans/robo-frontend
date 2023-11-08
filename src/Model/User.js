import Profile from "./Profile";

class User extends Profile {
  HighlightedCharities = [];

  constructor(
    id,
    name,
    email = "",
    description = name.split(" ")[0] + " hasn't yet written a description for their profile",
    bankAccountId
  ) {
    super(id, name, email, description, bankAccountId);
  }
}
export default User;
