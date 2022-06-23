import React from "react";
import "./App.scss";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "pages/Login";
import Register from "pages/Register";
import store from "redux/store";
import Layout from "layout";
import Home from "pages/Home";
import CreatePost from "pages/CreatePost";
import ProtectdRoute from "route/ProtectdRoute";
import PostDetail from "pages/PostDetail";
import AuthorRoute from "route/AuthorRoute";
import EditPost from "pages/EditPost";
import Bookmark from "pages/Bookmark";

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
                <Route path="posts" element={<Home />} />
                <Route element={<ProtectdRoute redirectPath="/login" />}>
                  <Route path="create" element={<CreatePost />} />
                  <Route path="bookmark" element={<Bookmark />} />
                  <Route
                    path="edit"
                    element={<AuthorRoute redirectPath="/posts" />}
                  >
                    <Route path=":post_id" element={<EditPost />} />
                  </Route>
                </Route>
                <Route path=":post_id" element={<PostDetail />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
