import Profile from "./Profile";

class Charity extends Profile {
  videoLinks = [];
  constructor(id, name, email = "", description = "", videoLinks = [], bankAccount) {
    super(id, name, email, description);
    this.isCharity = true;
    this.bankAccountId = bankAccount;
    this.SetVideoLinks(videoLinks);
  }
  GetVideoLinks() {
    return this.videoLinks;
  }
  SetVideoLinks(videoLinks) {
    this.videoLinks = videoLinks;
  }
  AddVideoLink(videoLink) {
    this.videoLinks.unshift(videoLink);
  }
}
export default Charity;
