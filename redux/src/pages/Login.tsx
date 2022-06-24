import { Box, Button, Input, InputGroup, InputLeftElement, Stack, Text } from "@chakra-ui/react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { login, setInit } from "redux/slices/auth";
import { useAppDispatch, useAppSelector } from "hooks";
import useCustomToast from "hooks/useCustomToast";
import "./Login.scss";

type InputType = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email("Invalid email.").required("No email provided."),
    password: yup
      .string()
      .required("No password provided.")
      .min(6, "Password is too short - should be 6 chars minimum."),
  })
  .required();

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: yupResolver(schema),
  });

  const auth = useAppSelector((state) => state.auth);
  const { toastError } = useCustomToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.failed) {
      toastError("Login failed! Email or Password is wrong.");
      dispatch(setInit());
    }
  }, [auth.failed, toastError, dispatch]);

  async function onSubmit(data: InputType) {
    const { email, password } = data;
    dispatch(login({ email, password }));
  }

  if (auth.currentUser.email) {
    return <Navigate to="/posts" />;
  }

  return (
    <div className="login">
      <form className="login_card" onSubmit={handleSubmit(onSubmit)}>
        <div className="login_card_title">Login</div>
        <div className="login_card_input">
          <Stack spacing={4}>
            <Box>
              <InputGroup colorScheme={"teal"}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<HiOutlineMail color="gray.100" />}
                />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter email"
                  focusBorderColor="green.200"
                />
              </InputGroup>
              <Text fontSize="sm" color="red" ml="2">
                {errors.email?.message}
              </Text>
            </Box>

            <Box>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  fontSize="1.2em"
                  children={<MdOutlinePassword />}
                />
                <Input
                  {...register("password")}
                  type={"password"}
                  focusBorderColor="green.200"
                  placeholder="Enter password"
                />
              </InputGroup>
              <Text fontSize="sm" color="red" ml="2">
                {errors.password?.message}
              </Text>
            </Box>
          </Stack>
        </div>
        <div className="forgot_password_link">
          Forgot password ? <span className="link">Reset</span>
        </div>
        <Button
          className="login_card_button"
          type="submit"
          color="white"
          backgroundColor="green.400"
          size="sm"
        >
          Login
        </Button>
        <div className="register_link">
          Don't have an account?{" "}
          <span className="link">
            <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
