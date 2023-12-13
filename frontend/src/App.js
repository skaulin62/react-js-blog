import React from "react";
import Container from "./components/Container";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import AddPostPage from "./pages/AddPostPage/AddPostPage";
import Registration from "./pages/Registration/Registration";
import PostPage from "./pages/PostPage/PostPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserMe, selectIsAuth } from "./Redux/slices/sliceAuth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchUserMe());
  }, []);
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/post/:id/editor" element={<AddPostPage />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/create" element={<AddPostPage />} />
          <Route
            path="*"
            element={
              <h1 style={{ textAlign: "center", fontSize: "50px" }}>404</h1>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
