"use client";

import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik, FormikProps } from "formik";
import { api } from "@/utils/axios";
import { AxiosError } from "axios";

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(5),
});

interface IRegisterForm {
  email: string;
  password: string;
}

type Props = {};

export default function page({}: Props) {
  const initialValues: IRegisterForm = {
    email: "",
    password: "",
  };

  const submitRegister = async (values: IRegisterForm) => {
    try {
      await api.post("/users", values);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  return (
    <div>
      <h1>Register Example</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={submitRegister}
        validationSchema={loginSchema}
      >
        {(props: FormikProps<IRegisterForm>) => {
          const { values, errors, touched, handleChange } = props;

          console.log(props);
          return (
            <Form>
              <div>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
                {touched.email && errors.email ? (
                  <div className="text-red-500">{errors.email}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
                {touched.password && errors.password ? (
                  <div className="text-red-500">{errors.password}</div>
                ) : null}
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
