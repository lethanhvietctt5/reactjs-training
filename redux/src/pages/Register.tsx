import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import api from "../service";
import "./Register.scss";

type InputType = {
  email: string;
  password: string;
};

function Register() {
  const { register, handleSubmit } = useForm<InputType>();

  const toast = useToast();
  const navigate = useNavigate();

  async function onSubmit(data: InputType) {
    if (data.email.length === 0 || data.password.length === 0) {
      toast({
        title: "Register failed.",
        description: "Please enter all field.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const res = await api.post(`/users`, { id: nanoid(), ...data });

      if (res.data) {
        toast({
          title: "Register successful.",
          description: "Let login to new account.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        navigate("/login");
      }
    } catch (err) {
      toast({
        title: "Register failed.",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
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
        <Button
          className="register_card_button"
          type="submit"
          colorScheme="teal"
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
