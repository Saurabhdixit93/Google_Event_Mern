import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ToastWrapper from "./Components/ToastWrapper";

export default function App() {
  return (
    <div className="dark:bg-black bg-white min-h-screen w-full">
      <Navbar />
      <ToastWrapper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oauth2callback" element={<Home />} />
      </Routes>
    </div>
  );
}
