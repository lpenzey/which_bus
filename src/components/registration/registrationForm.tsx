import * as React from "react";
import { Title, StyledForm } from "styles/theme";
import "./userRegistration.css";

import { Formik, Field, Form, FormikActions, FormikErrors } from "formik";
import NavBar from "components/navBar/navBar";

interface FormValues {
  userName: string;
  password: string;
}

export default function RegistrationForm(props: any) {
  return (
    <div>
      <NavBar />
      <StyledForm>
        <Title>Register</Title>
        <Formik
          initialValues={{
            userName: "",
            password: ""
          }}
          onSubmit={(
            values: FormValues,
            { setSubmitting }: FormikActions<FormValues>
          ) => {
            props.api.registerUser(values.userName, values.password);
          }}
          validate={values => {
            const errors: FormikErrors<FormValues> = {};
            if (!values.userName && !values.password) {
              errors.userName = "Username Required";
              errors.password = "Password Required";
              alert("User name and password are required");
            }
            return errors;
          }}
          render={() => (
            <Form>
              <label htmlFor="userName"></label>
              <Field
                className="formInput"
                id="userName"
                name="userName"
                placeholder="Your user name"
                type="text"
              />

              <label htmlFor="password"></label>
              <Field
                className="formInput"
                id="password"
                name="password"
                placeholder="Password"
                type="text"
              />

              <button type="submit" style={{ display: "block" }}>
                Register
              </button>
            </Form>
          )}
        />
      </StyledForm>
    </div>
  );
}
