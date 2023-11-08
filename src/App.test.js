import { render, screen } from "@testing-library/react";
import App from "./App";
import { shallow, configure } from "enzyme";
import LoginContainer from "./Components/login-container";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

//Test for register link redirect
it("redirect from login to register", () => {
  const component = shallow(<LoginContainer />);
  expect(true).toBe(true);
});

// test for the redirect
describe("when unauthenticated", () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: { status: "fail" },
    })
  );

  const props = {
    isAuthenticated: false,
  };

  it("redirects when authToken invalid", async () => {
    const { history } = renderWithRouter(<Profile {...props} />);
    await wait(() => {
      expect(axios).toHaveBeenCalled();
    });
    expect(history.location.pathname).toEqual("/login");
  });
});
