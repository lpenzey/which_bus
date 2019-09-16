import * as React from "react";
import styled from "styled-components";
import { Title, Input } from "components/theme";
import "./userRegistration.css";

import { Formik, Field, Form, FormikActions, FormikErrors } from "formik";

interface FormValues {
  userName: string;
  password: string;
}

const RegForm = styled.form`
  border-radius: 4px;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  display: flex;
  flex-wrap: wrap;
  padding: 2px;
  justify-content: center;
  width: 100%;
  margin: 1em auto;
  min-width: 250px;
  max-width: 400px;
  flex-direction: column;
  align-items: center;

  @media (min-width: 400px) {
    padding: 1.5em;
    width: 60%;
    display: flex;
  }

  @media (min-width: 2000px) {
    width: 60%;
    display: inline-flex;
    justify-content: center;
    flex-direction: row;
    margin: 1em;
  }
`;

export default function RegistrationForm(props: any) {
  return (
    <RegForm>
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
    </RegForm>
  );
}
