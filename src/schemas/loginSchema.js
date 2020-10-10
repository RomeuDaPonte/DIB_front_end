import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().min(5),
});

export default {
  loginSchema,
};
