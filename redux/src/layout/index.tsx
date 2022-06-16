import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <Box backgroundColor="gray.200" minH="100vh">
      <Header />
      <Box w="80%" mx="auto">
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
