import { Button, Flex, Text } from "@chakra-ui/react";
import { Navigate, Link } from "react-router-dom";
import { object, SchemaOf, string } from "yup";

import Form from "components/Form";
import FormInput from "components/FormInput";
import useAuthentication from "hooks/useAuthentication";

type InputType = {
  email: string;
  password: string;
};

const schema: SchemaOf<InputType> = object({
  email: string().email("Invalid email.").required("No email provided."),
  password: string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum."),
}).required();

function Login() {
  const { currentUser, login } = useAuthentication();

  async function onSubmit(data: InputType) {
    const { email, password } = data;
    login(email, password);
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
        py="36"
        rounded="xl"
      >
        <Form schema={schema} onSubmit={onSubmit}>
          <Text fontSize="6xl" textAlign="center" fontWeight="bold" mb="10">
            Login
          </Text>
          <FormInput fieldName="email" type="email" />
          <FormInput fieldName="password" type="password" />
          <Flex ml="2" mb="6" mt="3" fontSize="16px">
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
          <Flex justify="center" my="10">
            Don't have an account?{" "}
            <Text ml="1" color="green" fontSize="lg" className="link">
              <Link to="/register">Register</Link>
            </Text>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
}

export default Login;
