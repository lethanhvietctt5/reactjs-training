import { Button, Flex, Text } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";

import Form from "components/Form";
import FormInput from "components/FormInput";
import { LOGIN_SCHEMA } from "constants/schemas";
import useAuthentication from "hooks/useAuthentication";
import FormInputValues from "types/formInput";

function Login() {
  const { currentUser, login } = useAuthentication();

  function onSubmit(data: FormInputValues) {
    const { email, password } = data;
    if (email && password) {
      login(email, password);
    }
  }

  if (currentUser) {
    return <Navigate to="/posts" />;
  }

  return (
    <Flex bgColor="gray.200" h="100vh" align={"center"}>
      <Flex
        direction="column"
        justify="center"
        w="30%"
        mx="auto"
        bgColor="white"
        px="10"
        py="20"
        rounded="xl"
      >
        <Form onSubmit={onSubmit} schema={LOGIN_SCHEMA}>
          <Text fontSize="6xl" textAlign="center" fontWeight="bold" mb="10">
            Login
          </Text>

          <Text fontWeight="bold">Email</Text>
          <FormInput name="email" type="email" placeHolder="abc@gmail.com" />

          <Text fontWeight="bold">Password</Text>
          <FormInput name="password" type="password" placeHolder="********" />

          <Flex ml="2" mb="6" mt="3" fontSize="sm">
            <Text>Forgot password? </Text>{" "}
            <Text color="green" ml="1">
              {" "}
              Reset
            </Text>
          </Flex>

          <Flex w="full" justify="center">
            <Button
              type="submit"
              color="white"
              backgroundColor="green.400"
              size="sm"
              fontSize="xl"
              py="5"
              px="10"
            >
              Login
            </Button>
          </Flex>

          <Flex justify="center" my="10" fontSize="sm">
            Don't have an account?{" "}
            <Text ml="1" color="green" fontSize="sm" className="link">
              <Link to="/register">Register</Link>
            </Text>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
}

export default Login;
