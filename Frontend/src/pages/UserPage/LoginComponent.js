import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const loginPat = /^[a-zA-Z0-9._]+@[a-z]{1,8}\.(com|eg|gov|edu)$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[^\w\d\s]).{8,}$/;

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter a Valid Email")
    .required("Must Add Email")
    .matches(loginPat, "Email Doesn't Meet Requirements"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter, lowercase letter, number, special character, and be at least 8 characters long"
    )
    .required("Must Fill this Field"),
});

const LoginComponent = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const { handleSubmit, values, errors, handleBlur, touched, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: async (values) => {
        try {
          const response = await axios.post(
            `http://127.0.0.1:8000/login/`,
            values
          );
          if (response.status === 200) {
            const { access, refresh, user } = response.data;
            localStorage.setItem("accessToken", access); // Store access token
            localStorage.setItem("refreshToken", refresh); // Store refresh token
            localStorage.setItem(
              "login",
              JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              })
            );
            localStorage.setItem("cart", "[]");
            setIsError(false);
            // redirectBasedOnRole(user.role);
            navigate("/");
          } else {
            setIsError(true);
          }
        } catch (error) {
          console.error("Error logging in:", error);
          setIsError(true);
        }
      },
    });

  useEffect(() => {
    if (localStorage.getItem("login") !== null) {
      const user = JSON.parse(localStorage.getItem("login"));
      redirectBasedOnRole(user.role);
    }
  }, []);

  const redirectBasedOnRole = (role) => {
    if (role === "customer") {
      navigate("/");
    } else if (role === "seller") {
      navigate("/Dashboard");
    }
  };

  const redirectCounterRoleToUpdateNavbar = (role) => {
    if (role === "customer") {
      navigate("/");
    } else if (role === "seller") {
      navigate("/Dashboard");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="form-containerx sign-in-containerx">
      <Form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="social-containerx">
          <a href="#" className="icon a">
            <i id="id-btn-login-phone" className="fa-solid fa-phone"></i>
          </a>
          <a href="#" className="icon a">
            <i id="id-btn-login-google" className="fa-brands fa-google"></i>
          </a>
        </div>
        <span>or use your email for registration</span>
        <Form.Control
          type="text"
          value={values.email}
          id="email"
          placeholder="Please, enter your email"
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}

        <Form.Control
          value={values.password}
          id="password"
          type={showPassword ? "text" : "password"}
          onBlur={handleBlur}
          placeholder="Please, enter your password"
          onChange={handleChange}
          // className="user-box-login"
        />
        {/* <label>Password</label> */}
        <span
          className="password-toggle-iconx"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <i class="fas fa-eye" />
          ) : (
            <i class="fas fa-eye-slash" />
          )}
        </span>

        {/* <div className="user-box-login">
          <input
            type={showPassword ? "text" : "password"}
            name=""
            id="password"
            // value={values.password}
            required
          />
          <label>Password</label>
          <span
            className="password-toggle-iconx"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <i class="fas fa-eye" />
            ) : (
              <i class="fas fa-eye-slash" />
            )}
          </span>
        </div> */}

        {errors.password && touched.password && (
          <p className="error2">{errors.password}</p>
        )}

        <a className="a3" href="#">
          Forgot your password?
        </a>

        <span className="span">
          By clicking " Login," you agree to our{" "}
          <a className="a1" href="http://">
            Terms of Use
          </a>{" "}
          and our{" "}
          <a className="a1" href="http://">
            Privacy Policy
          </a>
          .
        </span>
        {isError && <p className="error">Incorrect email or password</p>}
        <Button className="button my-3" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginComponent;