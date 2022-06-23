import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { logout } from "redux/slices/auth";

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
            <Link to="/posts">
              <Text fontWeight="black">Blogs</Text>
            </Link>
          </Heading>
          {auth.currentUser.email ? (
            <Flex align="center" gap="4">
              <Link to="/create">
                <Tooltip hasArrow label="Create new post">
                  <EditIcon w={12} color="green" h="full" p="2" />
                </Tooltip>
              </Link>
              <Link to="/bookmark">
                <Tooltip hasArrow label="Go to collection" shouldWrapChildren>
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="full"
                    p={2}
                    color="green.600"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M208 24H72a32.1 32.1 0 0 0-32 32v168a8 8 0 0 0 8 8h144a8 8 0 0 0 0-16H56a16 16 0 0 1 16-16h136a8 8 0 0 0 8-8V32a8 8 0 0 0-8-8Zm-24 96l-25.6-19.2a3.9 3.9 0 0 0-4.8 0L128 120V40h56Z"
                    ></path>
                  </Icon>
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
