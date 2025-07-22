import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
function Register() {
  const initialValue = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(12).required(),
    password: Yup.string().min(4).max(8).required(),
  });

  const onSubmit = async (data) => {
         axios.post("http://localhost:3001/posts", data).then(() => {
    });
  }
  return (
    <div>
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field id="inputCreatePost" name="username" placeholder="username" />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field id="inputCreatePost" name="password" type="password" placeholder="password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
