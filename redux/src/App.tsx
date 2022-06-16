import React from "react";
import "./App.scss";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import store from "./redux/store";
import Layout from "./layout";
import Home from "./pages/Home";

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
