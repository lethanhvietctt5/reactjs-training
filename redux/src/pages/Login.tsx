import React from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../service";

type InputType = {
  email: string;
  password: string;
};

function Login() {
  const { register, handleSubmit } = useForm<InputType>();
  const toast = useToast();

  async function onSubmit(data: InputType) {
    if (data.email.length === 0 || data.password.length === 0) {
      toast({
        title: "Login failed.",
        description: "Please enter all field.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      return;
    }

    try {
      const res = await api.get(
        `/users?email=${data.email}&password=${data.password}`
      );

      console.log(res.data[0]);
    } catch (err) {
      toast({
        title: "Login failed.",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
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
                focusBorderColor="teal.500"
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={<MdOutlinePassword />}
              />
              <Input
                {...register("password")}
                type={"password"}
                focusBorderColor="teal.500"
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
          colorScheme="teal"
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
