import React, { useEffect, useState } from "react";
import Calendar from "../Components/Calendar";
import { useDispatch } from "react-redux";
import { googleCallback } from "../redux/Slices/authSlices";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      const getTokensFromCode = async () => {
        return dispatch(googleCallback({ code: code }))
          .unwrap()
          .then(() => {
            return (window.location.href = "/");
          })
          .catch((_) => {
            return (window.location.href = "/");
          });
      };

      if (isAuth) {
        getTokensFromCode();
      }
    }
  });
  return (
    <div className="min-h-screen mt-10">
      {isAuth ? (
        <Calendar />
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <p className="text-3xl font-bold dark:text-white">
            Please login to view your calendar
          </p>
        </div>
      )}
    </div>
  );
}
