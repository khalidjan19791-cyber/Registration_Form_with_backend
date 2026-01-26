import React from "react";
import * as yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";

const SendEmailSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),

  subject: yup.string().trim().required("Subject is required"),

  message: yup.string().trim().required("Message is required"),
});

export default function SendEmail() {
  const handleEmail = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        // your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: values.email,
          subject: values.subject,
          text: values.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Email sent successfully!");
        resetForm();
      } else {
        alert("Failed to send email: " + data.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Something went wrong while sending the email.");
    }
  };

  return (
    <div className="w-[25vw] border-black border-2 mx-auto p-6 bg-gray-300 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out bg-amber-20">
      <div className=" flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Send Email</h1>
        <Formik
          validationSchema={SendEmailSchema}
          onSubmit={handleEmail}
          initialValues={{
            email: "",
            subject: "",
            message: "",
          }}
        >
          <Form className="flex flex-col gap-7 ">
            <div className=" flex flex-col gap-2 relative">
              <label className="text-xl font-bold">Email</label>
              <Field
                autoComplete="off"
                name="email"
                placeholder="Enter Email"
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
              <label className="text-xl font-bold">Subject</label>
              <Field
                autoComplete="off"
                name="subject"
                placeholder="Subject"
                className="w-full max-w-sm p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                type="text"
              />
              <ErrorMessage
                name="subject"
                component="div"
                className="absolute top-23 text-red-500 text-sm pointer-events-none"
              />
            </div>
            <div className=" flex flex-col gap-2 relative">
              <label className="text-xl font-bold">Message</label>
              <Field
                autoComplete="off"
                name="message"
                placeholder="Your Message Here...."
                className="w-full max-w-sm p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                as="textarea"
                rows={4}
              />
              <ErrorMessage
                name="message"
                component="div"
                className="absolute top-40 text-red-500 text-sm pointer-events-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold text-2xl"
            >
              Send Email
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
