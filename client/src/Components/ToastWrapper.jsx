import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToastWrapper() {
  return (
    <Toaster
      position="top-left"
      containerClassName="z-100"
      toastOptions={{
        style: {
          fontFamily: "inherit",
        },
        success: {
          style: {
            background: "#4caf50",
            color: "#fff",
          },
        },
        error: {
          style: {
            background: "#f44336",
            color: "#fff",
          },
        },
        loading: {
          style: {
            background: "#2196f3",
            color: "#fff",
          },
        },
      }}
    />
  );
}
