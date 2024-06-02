import { Schema, model } from "mongoose";

const authSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      toLowerCase: true,
    },
    tokens: {
      refresh_token: {
        type: String,
      },
      access_token: {
        type: String,
      },
    },
    googleId: {
      type: String,
    },
    picture: {
      type: String,
    },
    calendarSync: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const AuthModel = model("AuthModel", authSchema);
