import React from "react";
import styles from "./Login.module.scss";
import CustomInput from "../../components/UI/Input/CustomInput";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectIsAuth } from "../../Redux/slices/sliceAuth";
import { Formik, useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.login}>
      <h2>Sign In</h2>
      <Formik
        initialValues={{
          email: "skaulin62@gmail.com",
          passwordHash: "1234567",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email is required";
          } else {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
          }

          if (!values.passwordHash) {
            errors.passwordHash = "Password is required";
          } else {
            if (values.passwordHash.length < 5) {
              errors.passwordHash = "The password must be at least 5.";
            }
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const data = await dispatch(fetchUser(values));
          setSubmitting(false);

          if ("token" in data?.payload) {
            window.localStorage.setItem("token", data.payload.token);
          } else {
            alert("Something is wrong");
          }
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Email</label>
            <CustomInput
              placeholder="email"
              type="text"
              name="email"
              helperText={errors.email}
              onChange={handleChange}
              value={values.email}
              error={Boolean(errors.email)}
            />

            <label>Password</label>

            <CustomInput
              placeholder="password"
              type="password"
              name="passwordHash"
              helperText={errors.passwordHash}
              onChange={handleChange}
              value={values.passwordHash}
              error={Boolean(errors.passwordHash)}
            />

            <button
              style={{ fontSize: "18px", marginTop: "30px" }}
              type="submit"
              className="button-reverse"
            >
              Sign In
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
