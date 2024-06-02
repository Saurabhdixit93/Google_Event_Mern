import { configureStore } from "@reduxjs/toolkit";
import authSlices from "./Slices/authSlices";
import eventSlices from "./Slices/eventSlices";

export const Store = configureStore({
  reducer: {
    auth: authSlices,
    events: eventSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
