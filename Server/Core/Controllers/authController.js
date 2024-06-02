import { AuthModel } from "../Database/DatabassSchemas/authSchema.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const googleAuth = async (req, res) => {
  try {
    const { email, name, sub, picture } = req.body;

    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Invalid email",
      });
    }

    let user = await AuthModel.findOne({ email });

    if (!user) {
      user = new AuthModel({ email, fullName: name, googleId: sub, picture });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: true,
      message: "Authentication successful",
      token,
      user: { email: user.email, name: user.fullName, picture: user.picture },
    });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};
export const getUser = async (req, res) => {
  const userId = req.UserId;

  try {
    const user = await AuthModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found.", status: false });
    }
    return res.status(200).json({ user, status: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, status: false });
  }
};
