import readline from "readline";
import "dotenv/config";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  client_id: process.env.GOOGLE_CLIENT_ID,
  redirect_uri: process.env.GOOGLE_REDIRECT_URI,
});

console.log("Authorize this app by visiting this url:", authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the code from that page here: ", (code) => {
  rl.close();
  oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error("Error retrieving access token", err);
    oauth2Client.setCredentials(token);
    console.log("Your refresh token is:", token.refresh_token);
  });
});
