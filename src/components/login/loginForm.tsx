import * as React from "react";
import styled from "styled-components";
import { Title, StyledForm, Wrapper } from "styles/theme";

import { Formik, Field, Form, FormikActions, FormikErrors } from "formik";

interface FormValues {
  userName: string;
  password: string;
}

export default function LoginForm(props: any) {
  return (
    <div>
      <StyledForm>
        <Title>Login</Title>
        <Formik
          initialValues={{
            userName: "",
            password: ""
          }}
          onSubmit={(
            values: FormValues,
            { setSubmitting }: FormikActions<FormValues>
          ) => {
            props.api.login(values.userName, values.password);
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
                Submit
              </button>
            </Form>
          )}
        />
      </StyledForm>
    </div>
  );
}
