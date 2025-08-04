import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate()
  const initialValue = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(12).required(),
    password: Yup.string().min(4).max(8).required(),
  });

  const onSubmit = async (data) => {
    axios.post("http://localhost:3001/auth/register", data).then((response) => {
      if(response.data) {
        toast("User Register Successfully")
        navigate('/login')
      }
    });
  };
  return (
    <div className=" flex justify-center mt-12">
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="shadow-2xl shadow-blue-300 w-[400px] h-[300px] flex flex-col justify-center items-center pt-6">
          <div className=" flex items-center py-2 gap-4">
            <label className="text-xl font-medium font-serif">
              Username :{" "}
            </label>
            {/* <ErrorMessage name="username" component="span" /> */}
            <Field
              className="border border-gray-600 rounded outline-none px-2 text-gray-600"
              id=""
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div className=" flex items-center py-2 gap-4 pl-1">
            <label className="text-xl font-medium font-serif">
              Password :{" "}
            </label>
            {/* <ErrorMessage name="password" component="span" /> */}
            <Field
              className="border border-gray-600 rounded outline-none px-2 text-gray-600"
              id=""
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="font-medium font-serif border rounded w-32 mt-8 h-8 hover:bg-blue-500 hover:text-white"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
