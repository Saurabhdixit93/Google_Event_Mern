import jwt from "jsonwebtoken";
import "dotenv/config";
import { oauth2Client } from "../Configs/googleApis.config.js";
import { AuthModel } from "../Database/DatabassSchemas/authSchema.js";

export const ValidateAuthUser = async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
    // Handle the case where the Authorization header is missing
    return res.status(401).json({ error: "Authorization header missing" });
  }
  const tokenParts = authHeader.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    // Handle invalid token format
    return res.status(401).json({ error: "Invalid token format" });
  }
  const authToken = tokenParts[1]; // Extract the token part
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    req.UserId = decodedToken.id;
    const userExists = await AuthModel.findById(req.UserId);
    if (!userExists) {
      return res.status(401).json({ error: "User not found" });
    }
    oauth2Client.setCredentials({
      refresh_token: userExists.tokens.refresh_token,
      access_token: userExists.tokens.access_token,
    });
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res
      .status(500)
      .json({ error: "Please authenticate using a valid token" });
  }
};
