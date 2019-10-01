import * as React from "react";
import { Title, StyledForm, OuterWrapper } from "styles/theme";
import "./userRegistration.css";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import NavBar from "components/navBar/navBar";
import "./registrationForm.css";
import { useState } from "react";

interface FormValues {
  userName: string;
  password: string;
}

export default function RegistrationForm(props: any) {
  const [showHide, setShowHide] = useState("password");

  function changeShowPassword() {
    setShowHide(showHide === "input" ? "password" : "input");
  }

  return (
    <div>
      <NavBar />
      <StyledForm>
        <Title>Register</Title>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            userName: "",
            password: ""
          }}
          onSubmit={(values: FormValues) => {
            props.api.registerUser(values.userName, values.password);
          }}
          validationSchema={Yup.object().shape({
            userName: Yup.string()
              .min(2, "Too Short!")
              .max(50, "Too Long!")
              .required("User name is required"),
            password: Yup.string()
              .min(2, "Too Short!")
              .max(50, "Too Long!")
              .required("Password is required")
              .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                "Password must contain 8 characters, one uppercase, one lowercase, one number and one special character"
              )
          })}
          render={({ errors, status, touched }) => (
            <Form>
              <label htmlFor="userName"></label>
              <Field
                name="userName"
                type="text"
                placeholder="Username"
                className={
                  "formInput" +
                  (errors.userName && touched.userName ? " is-invalid" : "")
                }
              />

              <ErrorMessage
                name="userName"
                component="div"
                className="invalid-feedback"
              />

              <label htmlFor="password"></label>
              <Field
                name="password"
                type={showHide}
                placeholder="Password"
                className={
                  "formInput" +
                  (errors.password && touched.password ? " is-invalid" : "")
                }
              />

              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
              <OuterWrapper>
                <button type="button" onClick={changeShowPassword}>
                  {showHide === "input" ? "Hide" : "Show"}
                </button>
                <button type="submit" style={{ display: "block" }}>
                  Register
                </button>
              </OuterWrapper>
            </Form>
          )}
        />
      </StyledForm>
    </div>
  );
}
