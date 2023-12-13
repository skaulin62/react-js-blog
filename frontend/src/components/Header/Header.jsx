import React from "react";
import Container from "../Container.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, logout } from "../../Redux/slices/sliceAuth.js";

const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <header className="header">
      <Container>
        <div className="header__logo">
          <Link to="/">
            <h2>
              React <span>Blog</span>
            </h2>
          </Link>
        </div>
        <div className="header__sign">
          {isAuth ? (
            <>
              <Link to="/create">
                <button className="button-reverse header__button-add">
                  Add Post
                </button>
              </Link>
              <Link to="/signin">
                <button
                  onClick={onClickLogout}
                  className="button header__button-logout"
                >
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin">
                <button className="button header__button-signin">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="button-reverse header__button-signup">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
