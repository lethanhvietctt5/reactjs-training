import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import useCustomToast from "hooks/useCustomToast";
import api from "api";
import "./Register.scss";

type InputType = {
  email: string;
  name: string;
  password: string;
};

function Register() {
  const { register, handleSubmit } = useForm<InputType>();

  const { toastError, toastSuccess } = useCustomToast();
  const navigate = useNavigate();

  async function onSubmit(data: InputType) {
    if (data.email.length === 0 || data.password.length === 0) {
      toastError("Register failed! Please enter all field.");
      return;
    }

    try {
      const res = await api.post(`/users`, { id: nanoid(), ...data });

      if (res.data) {
        toastSuccess("Register successful! Let login to new account.");
        navigate("/login");
      }
    } catch (err) {
      toastError("Register failed! Please try again.");
    }
  }

  return (
    <div className="register" onSubmit={handleSubmit(onSubmit)}>
      <form className="register_card">
        <div className="register_card_title">Register</div>
        <div className="register_card_input">
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

            <InputGroup colorScheme={"teal"}>
              <InputLeftElement
                pointerEvents="none"
                children={<BiRename color="gray.100" />}
              />
              <Input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
                focusBorderColor="green.200"
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                fontSize="1.2em"
                children={<MdOutlinePassword color="gray.100" />}
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
        <Button
          className="register_card_button"
          type="submit"
          color="white"
          backgroundColor="green.400"
          size="sm"
        >
          Register
        </Button>
        <div className="login_link">
          Already have an account?{" "}
          <span className="link">
            <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
