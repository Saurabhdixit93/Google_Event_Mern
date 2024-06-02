import { axiosInstance } from "../../axios.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  loading: false,
  error: "",
  user: {},
};

export const SyncGoogle = createAsyncThunk(
  "auth/SyncGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/google/authUrl");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleCallback = createAsyncThunk(
  "auth/googleCallback",
  async ({ code }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/oauth2callback?code=${code}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleLoginUser = createAsyncThunk(
  "auth/googleLoginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "auth/getUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/get-user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(googleLoginUser.pending, (state) => {
        state.loading = true;
        toast.loading("Logging in...");
      })
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        toast.dismiss();
        toast.success("Login successfull");
      })
      .addCase(googleLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        toast.dismiss();
        toast.error(action.payload.error);
      });

    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
    });

    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

export default authSlice.reducer;
