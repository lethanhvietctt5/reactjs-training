import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./Login.scss";
import { login } from "../redux/slices/auth";
import { useAppDispatch, useAppSelector } from "../hooks";
import useCustomToast from "hooks/useCustomToast";
import { useEffect } from "react";

type InputType = {
  email: string;
  password: string;
};

function Login() {
  const { register, handleSubmit } = useForm<InputType>();
  const auth = useAppSelector((state) => state.auth);
  const { toastError } = useCustomToast();
  const dispatch = useAppDispatch();
  async function onSubmit(data: InputType) {
    if (data.email.length === 0 || data.password.length === 0) {
      toastError("Login failed! Please enter all field.");
      return;
    }

    const { email, password } = data;
    dispatch(login({ email, password }));
  }

  useEffect(() => {
    if (auth.failed) {
      toastError("Login failed! Email or Password is wrong.");
    }
  }, [auth.failed, toastError]);

  if (auth.currentUser.email) {
    return <Navigate to="/posts" />;
  }

  return (
    <div className="login">
      <form className="login_card" onSubmit={handleSubmit(onSubmit)}>
        <div className="login_card_title">Login</div>
        <div className="login_card_input">
          <Stack spacing={4}>
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
