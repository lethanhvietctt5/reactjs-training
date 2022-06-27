import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import userApi from "api/userApi";
import Form from "components/Form";
import FormInput from "components/FormInput";
import { REGISTER_SCHEMA } from "constants/schemas";
import useCustomToast from "hooks/useCustomToast";
import FormInputValues from "types/formInput";

function Register() {
  const { toastError, toastSuccess } = useCustomToast();
  const navigate = useNavigate();

  async function onSubmit(data: FormInputValues) {
    const { email, password, name } = data;
    if (email && password && name) {
      try {
        const user = await userApi.register(email, name, password);

        if (user) {
          toastSuccess("Register successful! Let login to new account.");
          navigate("/login");
        }
      } catch (err) {
        toastError("Register failed! Please try again.");
      }
    }
  }

  return (
    <Flex w="full" h="100vh" justify="center" bgColor="gray.200" py="10">
      <Flex
        w="30%"
        border="2px"
        bg="white"
        borderColor="gray.200"
        borderRadius="20px"
        direction="column"
        justify="center"
        align="center"
        px="40px"
      >
        <Form schema={REGISTER_SCHEMA} onSubmit={onSubmit}>
          <Flex direction="column" justify="center" align="center">
            <Text fontSize="50px" fontWeight="bold" mb="15">
              Register
            </Text>
            <Box w="full">
              <Text fontWeight="bold">Email</Text>
              <FormInput type="email" name="email" placeHolder="abc@gmail.com" />

              <Text fontWeight="bold">Name</Text>
              <FormInput type="text" name="name" placeHolder="Nguyen Van A" />

              <Text fontWeight="bold">Password</Text>
              <FormInput type="password" name="password" placeHolder="********" />
            </Box>
            <Button
              w="full"
              mt="20px"
              mx="20"
              type="submit"
              color="white"
              backgroundColor="green.400"
              size="sm"
            >
              Register
            </Button>
            <Flex mt="40px" fontSize="sm" color="gray.500">
              Already have an account?{" "}
              <Text color="green" cursor="pointer" ml="1">
                <Link to="/login">Login</Link>
              </Text>
            </Flex>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
}

export default Register;
