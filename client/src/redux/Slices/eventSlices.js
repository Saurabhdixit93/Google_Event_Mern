import { axiosInstance } from "../../axios.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  loading: false,
  error: "",
  AllEvents: [],
  createLoading: false,
  removeLoading: false,
};

export const getAllEvents = createAsyncThunk(
  "events/getAllEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/events/all-events");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (data, { rejectWithValue, dispatch, fulfillWithValue }) => {
    try {
      const response = await axiosInstance.post("/events/new-event", data);
      dispatch(getAllEvents());
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateSingleEvent = createAsyncThunk(
  "events/updateSingleEvent",
  async (
    { data, eventId },
    { rejectWithValue, fulfillWithValue, dispatch }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/events/update-event?eventId=${eventId}`,
        data
      );
      dispatch(getAllEvents());
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeEvent = createAsyncThunk(
  "events/removeEvent",
  async (eventId, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.delete(
        `/events/remove-event?eventId=${eventId}`
      );
      dispatch(getAllEvents());

      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const events = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createEvent.pending, (state) => {
      state.createLoading = true;
      toast.loading("Creating event...");
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.createLoading = false;
      toast.dismiss();
      toast.success("Event created successfully");
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.createLoading = false;
      state.error = action.payload.error;
      toast.dismiss();
      toast.error(action.payload.error);
    });

    builder.addCase(getAllEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.AllEvents = action.payload.events;
    });
    builder.addCase(getAllEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });

    builder.addCase(updateSingleEvent.pending, (state) => {
      state.createLoading = true;
      toast.loading("Updating event...");
    });
    builder.addCase(updateSingleEvent.fulfilled, (state, action) => {
      state.createLoading = false;
      toast.dismiss();
      toast.success("Event updated successfully");
    });
    builder.addCase(updateSingleEvent.rejected, (state, action) => {
      state.createLoading = false;
      state.error = action.payload.error;
      toast.dismiss();
      toast.error(action.payload.error);
    });

    builder.addCase(removeEvent.pending, (state) => {
      state.removeLoading = true;
      toast.loading("Deleting event...");
    });

    builder.addCase(removeEvent.fulfilled, (state, action) => {
      state.removeLoading = false;
      toast.dismiss();
      toast.success("Event deleted successfully");
    });
    builder.addCase(removeEvent.rejected, (state, action) => {
      state.removeLoading = false;
      state.error = action.payload.error;
      toast.dismiss();
      toast.error(action.payload.error);
    });
  },
});

export default events.reducer;
