import * as yup from "yup";

class InputValidation {
  static register = yup.object({
    username: yup
      .string()
      .required("Username is required")
      .min(4, "Minimum length is 4 characters")
      .matches(/[A-Z][a-z0-9_-]/, "Username must start with a capital letter"),
    email: yup.string().required("Your email is required.").email("Invalid email"),
    //(?=.*[A-Z]) - requires one uppercase letter
    //(?=.*[0-9]) - requires one number
    //(?=.*[a-z]) - requires one lowercase letter
    //.{8} - minimum length of 8 letters
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must contain at least 8 characters, one uppercase, one lowercase, one special symbol and one number"
      )
      .required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("You are required to confirm your password"),
  });
  static login = yup.object({
    username: yup.string(),
    password: yup.string(),
  });
}
export default InputValidation;
