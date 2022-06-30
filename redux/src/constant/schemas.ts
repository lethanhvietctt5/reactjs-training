import { object, string } from "yup";

const LOGIN_SCHEMA = object({
  email: string().email("Invalid email.").required("No email provided."),
  password: string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum."),
}).required();

const REGISTER_SCHEMA = object({
  email: string().email("Invalid email.").required("No email provided."),
  name: string().required("Name is not provided"),
  password: string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum."),
}).required();

const POST_SCHEMA = object({
  title: string().required("Post's title is required"),
  content: string().required("Post's content is required"),
}).required();

export { LOGIN_SCHEMA, REGISTER_SCHEMA, POST_SCHEMA };
