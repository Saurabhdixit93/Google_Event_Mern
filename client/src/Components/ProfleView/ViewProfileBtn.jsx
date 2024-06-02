import React from "react";

export default function ViewProfileBtn({ onClick }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-600 dark:hover:bg-blue-700"
      onClick={onClick}
    >
      Profile
    </button>
  );
}
