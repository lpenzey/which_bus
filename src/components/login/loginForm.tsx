import * as React from "react";
import styled from "styled-components";
import { Title, StyledForm, Wrapper, OuterWrapper } from "styles/theme";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

interface FormValues {
  userName: string;
  password: string;
}

export default function LoginForm(props: any) {
  const [showHide, setShowHide] = useState("password");

  function changeShowPassword() {
    setShowHide(showHide === "input" ? "password" : "input");
  }
  return (
    <div>
      <StyledForm>
        <Title>Login</Title>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            userName: "",
            password: ""
          }}
          onSubmit={(values: FormValues) => {
            props.api.login(values.userName, values.password);
          }}
          validationSchema={Yup.object().shape({
            userName: Yup.string().required("User name is required"),
            password: Yup.string().required("Password is required")
          })}
          render={({ errors, status, touched }) => (
            <Form>
              <div className="form-group">
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
              </div>

              <div className="form-group">
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
              </div>

              <OuterWrapper>
                <button type="button" onClick={changeShowPassword}>
                  {showHide === "input" ? "Hide" : "Show"}
                </button>
                <button type="submit" style={{ display: "block" }}>
                  Login
                </button>
              </OuterWrapper>
            </Form>
          )}
        />
      </StyledForm>
    </div>
  );
}
