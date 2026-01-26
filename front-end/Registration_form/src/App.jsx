import React from "react";
import "./App.css";
import Login from "./Components/Login";
import Sign_up from "./Components/Sign_up";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SendEmail from "./Components/SendEmail";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div className="w-screen  bg-gray-400  h-screen flex justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sign_up />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/send-email" element={<SendEmail />} /> */}
          {/* Protected route */}
          <Route
            path="/send-email"
            element={
              <ProtectedRoute>
                <SendEmail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
