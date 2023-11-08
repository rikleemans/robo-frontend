import Charity from "../Model/Charity";
class MockCharityService {
  Charities;
  constructor() {
    let Charity0 = new Charity(
      1,
      "The First Charity",
      "charity1@gmail.com",
      "This is the first charity added in this application. And this is description for it. A description containing a lot of words.",
      [
        "https://www.youtube.com/watch?v=1_EUuXtSykg",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "https://www.youtube.com/watch?v=VBlFHuCzPgY",
      ],
      59
    );
    let Charity1 = new Charity(
      15,
      "The second charity",
      "second_charity@charities.nl",
      "This is the second charity, created for testing but still existing in our application. And that is the description.",
      ["https://www.youtube.com/watch?v=XyzxHR2rZ_w"],
      59
    );
    let Charity2 = new Charity(
      2,
      "Lorem ipsum",
      "sample@mail.com",
      "Curabitur ut felis suscipit, pharetra dui a, laoreet erat. Integer mollis ultricies lorem, nec tincidunt ante rhoncuz. This charity does have a reeeeaaally long description so we have to collapse it in order for the page to not look bad"
    );

    this.Charities = [Charity0, Charity1, Charity2];
  }
  GetCharity(id) {
    let foundCharity = null;
    this.Charities.some((charity, charityId) => {
      if (charity.id == id) {
        foundCharity = charity;
        return true;
      }
    });
    return foundCharity;
  }
  GetAllCharities() {
    return this.Charities;
  }
}
export default MockCharityService;
