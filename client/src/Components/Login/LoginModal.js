import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { googleLoginUser } from "../../redux/Slices/authSlices";

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleLoginSuccess = (user) => {
    return dispatch(googleLoginUser(user))
      .unwrap()
      .then((_) => {
        onClose();
        return window.location.reload();
      })
      .catch((_) => {
        return;
      });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="flex flex-col gap-6 bg-white dark:bg-gray-800 p-10 rounded-lg">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-xl dark:text-white font-bold mb-4 text-center">
            Login
          </h2>

          <MdCancel
            className="text-3xl cursor-pointer dark:text-white"
            onClick={onClose}
          />
        </div>
        <GoogleLogin
          size="large"
          theme="filled_black"
          shape="pill"
          auto_select={false}
          context="signin"
          text="continue_with"
          onSuccess={(credentialResponse) => {
            let userDetails = jwtDecode(credentialResponse?.credential);
            handleLoginSuccess(userDetails);
          }}
          onError={() => {
            return;
          }}
        />
      </div>
    </div>
  );
};

export default LoginModal;
