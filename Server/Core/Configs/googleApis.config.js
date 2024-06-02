import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

export const googleCalendar = google.calendar({
  version: "v3",
  auth: oauth2Client,
});
