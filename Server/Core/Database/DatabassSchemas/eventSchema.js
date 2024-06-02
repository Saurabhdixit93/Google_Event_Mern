import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    participants: [{ type: String }],
    date: { type: Date },
    time: { type: String },
    duration: { type: Number },
    sessionNotes: { type: String },
    googleCalendarEventId: { type: String },
    userId: { type: String },
  },
  { timestamps: true }
);

export const EventModel = model("EventModel", eventSchema);
