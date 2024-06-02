import React from "react";
import { useDispatch } from "react-redux";
import { SyncGoogle } from "../../redux/Slices/authSlices";

export default function SyncGoogleCalander() {
  const dispatch = useDispatch();

  const handleGetAuthUrlForSync = () => {
    return dispatch(SyncGoogle())
      .unwrap()
      .then((res) => {
        window.location.href = res.url;
      })
      .catch((_) => {
        return;
      });
  };

  return (
    <div>
      <button
        onClick={handleGetAuthUrlForSync}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <h1 className="text-xl">Sync with Google Calendar</h1>
      </button>
    </div>
  );
}
