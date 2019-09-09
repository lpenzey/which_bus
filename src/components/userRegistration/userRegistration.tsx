import * as React from "react";
import styled from "styled-components";

import { Formik, Field, Form, FormikActions, FormikErrors } from "formik";

interface FormValues {
  userName: string;
  password: string;
}

const initialValues: FormValues = {
  userName: "",
  password: ""
};

export default function RegistrationForm(props: any) {
  return (
    <div className="container">
      <h1>Register</h1>
      <Formik
        initialValues={{
          userName: "",
          password: ""
        }}
        onSubmit={(
          values: FormValues,
          { setSubmitting }: FormikActions<FormValues>
        ) => {
          console.log("hey");
          props.api.registerUser(values.userName, values.password);
        }}
        validate={values => {
          const errors: FormikErrors<FormValues> = {};
          if (!values.userName) {
            errors.userName = "Username Required";
          }
          if (!values.password) {
            errors.password = "Password Required";
          }
          return errors;
        }}
        render={() => (
          <Form>
            <label htmlFor="userName">Username</label>
            <Field
              id="userName"
              name="userName"
              placeholder="Your user name"
              type="text"
            />

            <label htmlFor="password">Last Name</label>
            <Field
              id="password"
              name="password"
              placeholder="Password"
              type="text"
            />

            <button type="submit" style={{ display: "block" }}>
              Submit
            </button>
          </Form>
        )}
      />
    </div>
  );
}
