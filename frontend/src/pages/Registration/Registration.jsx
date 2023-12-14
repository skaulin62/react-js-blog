import React from "react";
import styles from "./Registration.module.scss";
import CustomInput from "../../components/UI/Input/CustomInput";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchUserRegister, selectIsAuth } from "../../Redux/slices/sliceAuth";
import axios from "../../API/axios";
const Registration = () => {
  const dispatch = useDispatch();
  const fileRef = React.useRef(null);
  const isAuth = useSelector(selectIsAuth);
  const [avatarUrl, setAvatarUrl] = React.useState("");
  if (isAuth) {
    return <Navigate to="/" />;
  }

  const onSelectFile = async (event) => {
    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      const { data } = await axios.post("/upload", formData);
      setAvatarUrl(data.url);
      console.log(avatarUrl);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.registration}>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          lastName: "",
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
          if (!values.name) {
            errors.name = "Name is required";
          } else {
            if (values.name.length < 5) {
              errors.name = "The Name must be at least 5.";
            }
          }

          if (!values.lastName) {
            errors.lastName = "LastName is required";
          } else {
            if (values.lastName.length < 5) {
              errors.lastName = "The Lastname must be at least 5.";
            }
          }

          if (!values.password) {
            errors.password = "Password is required";
          } else {
            if (values.password.length < 5) {
              errors.password = "The password must be at least 5.";
            }
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const data = await dispatch(
            fetchUserRegister({
              email: values.email,
              fullName: values.name + " " + values.lastName,
              password: values.password,
              avatarUrl,
            })
          );
          if (!data?.payload) {
            return alert("Something is wrong, sorry, try again");
          }
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div
              onClick={() => fileRef.current.click()}
              className={styles.avatar}
            >
              <img
                src={avatarUrl || "/assets/images/avatar-icon.webp"}
                alt="avatar"
              />
              <input ref={fileRef} onChange={onSelectFile} type="file" hidden />
            </div>
            <label>Email</label>
            <CustomInput
              type="text"
              name="email"
              value={values.email}
              helperText={errors.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              placeholder="email"
            />
            <label>Name</label>
            <CustomInput
              type="text"
              placeholder="name"
              name="name"
              helperText={errors.name}
              value={values.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
            />
            <label>Last Name</label>
            <CustomInput
              type="text"
              placeholder="lastname"
              name="lastName"
              helperText={errors.lastName}
              value={values.lastName}
              onChange={handleChange}
              error={Boolean(errors.lastName)}
            />

            <label>Password</label>
            <CustomInput
              type="password"
              placeholder="password"
              name="password"
              helperText={errors.password}
              value={values.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
            />
            <button
              style={{ fontSize: "18px", marginTop: "30px" }}
              type="submit"
              className="button"
            >
              Sign Up
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
