import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
function CreatePost() {
  const { authState } = useContext(AuthContext);

  const navigate = useNavigate();
  const initialValue = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        navigate("/");
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
  });
  return (
    <div className="flex justify-center mt-12">
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="shadow-2xl shadow-blue-300 w-[400px] h-[300px] flex flex-col justify-center items-center pt-6">
          <div className=" flex items-center py-2 gap-4">
            <label className="text-xl font-medium font-serif">Title : </label>
            {/* <ErrorMessage name="title" component="span" /> */}
            <Field
              className="border border-gray-600 rounded outline-none px-2 text-gray-600"
              id="inputCreatePost"
              name="title"
              placeholder="Title"
            />
          </div>
          <div className=" flex items-center py-2 gap-4">
            <label className="text-xl font-medium font-serif">Post : </label>
            {/* <ErrorMessage name="postText" component="span" /> */}
            <Field
              className="border border-gray-600 rounded outline-none px-2 text-gray-600"
              id="inputCreatePost"
              name="postText"
              placeholder="Post"
            />
          </div>

          <button
            type="submit"
            className="font-medium font-serif border rounded w-32 mt-8 h-8 hover:bg-blue-500 hover:text-white"
          >
            Create Post
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
