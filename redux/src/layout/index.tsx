import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <Box backgroundColor="gray.200" minH="100vh" pb="5">
      <Header />
      <Box w="80%" mx="auto">
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
