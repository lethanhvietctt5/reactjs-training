import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../redux/slices/auth";

function Header() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Flex
      justify="center"
      shadow="md"
      w="100%"
      mx="auto"
      my="0"
      py="3"
      className="header"
      backgroundColor="white"
    >
      <Box w="80%">
        <Flex alignItems="center" justify="space-between">
          <Heading as="h1" size="xl">
            <Link to="/">
              <Text fontWeight="black">Blogs</Text>
            </Link>
          </Heading>
          {auth.currentUser.email ? (
            <Flex align="center" gap="4">
              <Link to="/create">
                <Tooltip hasArrow label="Create new post">
                  <EditIcon w={10} color="green" h="full" p="2" />
                </Tooltip>
              </Link>
              <Button
                color="white"
                backgroundColor="green.400"
                size="md"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Flex>
          ) : (
            <ButtonGroup gap={4}>
              <Link to="/login">
                <Button color="white" backgroundColor="green.400" size="md">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  color="green.400"
                  backgroundColor="white"
                  size="md"
                  variant="outline"
                >
                  Register
                </Button>
              </Link>
            </ButtonGroup>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}

export default Header;
