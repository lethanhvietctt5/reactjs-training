import { Route, Routes } from "react-router-dom";
import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";
import Posts from "pages/Posts";
import PostDetail from "pages/PostDetail";
import Bookmark from "pages/Bookmark";
import CreatePost from "pages/CreatePost";
import EditPost from "pages/EditPost";
import Layout from "layout";
import ProtectdRoute from "route/ProtectdRoute";
import AuthorRoute from "route/AuthorRoute";
import "./App.scss";
import SearchPost from "pages/SearchPost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="posts">
            <Route index element={<Posts />} />
            <Route path="search" element={<SearchPost />} />
            <Route path=":post_id" element={<PostDetail />} />
          </Route>
          <Route element={<ProtectdRoute redirectPath="/login" />}>
            <Route path="create" element={<CreatePost />} />
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="edit" element={<AuthorRoute redirectPath="/posts" />}>
              <Route path=":post_id" element={<EditPost />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
