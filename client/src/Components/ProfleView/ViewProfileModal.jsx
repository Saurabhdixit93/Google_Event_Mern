import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/Slices/authSlices";

export default function ViewProfileModal({ isOpen, onClose }) {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetUser = () => {
      return dispatch(getUserDetails())
        .unwrap()
        .then((_) => {
          return;
        })
        .catch((_) => {
          return;
        });
    };
    handleGetUser();
  }, [dispatch]);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className={`bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg p-6 max-w-md w-full mx-4 ${
          loading ? "pointer-events-none opacity-50 " : ""
        }`}
      >
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <img
            src={user?.picture}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">{user?.fullName}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{user?.email}</p>
          <p
            className={`text-lg ${
              user?.calendarSync ? "text-green-500" : "text-red-500"
            }`}
          >
            {user?.calendarSync
              ? "Calendar is synced"
              : "Calendar is not synced"}
          </p>
        </div>
      </div>
    </div>
  );
}
