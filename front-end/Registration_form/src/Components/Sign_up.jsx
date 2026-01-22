import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

const validationSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),

  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character",
    )
    .required("Password is required"),
});

export default function Sign_up() {
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/signup",
        values,
      );

      alert(res.data.message);
      resetForm();
    } catch (error) {
      console.log("Full error:", error);
      console.log("Error response:", error.response);
      alert(error.response?.data?.message || "something went wrong");
    }
  };

  return (
    <div>
      <div className="w-[25vw] border-black border-2 mx-auto p-6 bg-gray-300 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out bg-amber-20">
        <div className=" flex flex-col gap-5">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <Formik
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
          >
            <Form className="flex flex-col gap-7 ">
              <div className=" flex flex-col gap-2  relative ">
                <label className="text-xl font-bold">Name</label>
                <Field
                  autoComplete="off"
                  name="name"
                  placeholder="Enter Your Name"
                  className="w-full max-w-sm p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                  type="text"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="absolute top-23 text-red-500 text-sm pointer-events-none"
                />
              </div>
              <div className=" flex flex-col gap-2 relative">
                <label className="text-xl font-bold">Email</label>
                <Field
                  autoComplete="off"
                  name="email"
                  placeholder="Enter Your Email"
                  className="w-full max-w-sm p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                  type="text"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="absolute top-23 text-red-500 text-sm pointer-events-none"
                />
              </div>
              <div className=" flex flex-col gap-2 relative">
                <label className="text-xl font-bold">Password</label>
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Enter Your Password"
                  className="w-full max-w-sm p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                   
                  type={showPassword ? "password" : "text"}
                />
                <div
                  className="absolute top-13 right-4 text-2xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <IoMdEyeOff />}
                </div>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="absolute top-23 text-red-500 text-sm pointer-events-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold text-2xl"
              >
                Sign Up
              </button>

              <div className="w-full flex justify-center items-center ">
                <p className="font-bold text-xl">Already Have An Account!!</p>
              </div>

              <Link to="/login" className="block w-full">
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 font-bold text-2xl bg-amber-50"
                >
                  Login
                </button>
              </Link>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
