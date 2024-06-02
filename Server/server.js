import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./Core/Database/database.config.js";
import { corsSettings } from "./Core/Configs/corsSettings.js";
import indexRouter from "./Core/AccessRoutes/index.js";
import { oauth2Client } from "./Core/Configs/googleApis.config.js";
import { AuthModel } from "./Core/Database/DatabassSchemas/authSchema.js";
import { ValidateAuthUser } from "./Core/AccessMiddlewares/Validation.js";
const port = process.env.PORT || 5000;

// initializations and middleware
const app = express();
app.use(express.json());
app.use(cors(corsSettings));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.get("/google/authUrl", (req, res) => {
  const SCOPES = ["https://www.googleapis.com/auth/calendar"];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  });
  return res
    .status(200)
    .json({ status: true, message: "Success", url: authUrl });
});

app.get("/oauth2callback", ValidateAuthUser, async (req, res) => {
  const userId = req.UserId;

  const code = req.query.code;
  if (!code) {
    return res
      .status(400)
      .json({ status: false, message: "Authorization code not provided" });
  }

  try {
    const token = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(token.res?.data);

    const user = await AuthModel.findById(userId);
    user.tokens.refresh_token = token?.res?.data.refresh_token;
    user.tokens.access_token = token?.res?.data.access_token;
    user.calendarSync = true;
    await user.save();

    return res.status(200).json({
      status: true,
      message: "Success",
      token: token.res?.data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to get tokens",
      error: error.message,
    });
  }
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
