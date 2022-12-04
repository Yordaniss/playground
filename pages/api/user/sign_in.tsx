import User from "../../../models/User";
import dbConnect from "../../../lib/mongoDBConnect";
import generateAccessToken from "../../../helper/generateAccessToken";
import { getCookies } from "cookies-next";
const bcrypt = require("bcrypt");

export default async function handler(req: any, res: any) {
  await dbConnect();

  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ data: "User does not exist" });
    }
    // console.log(user);
    const isPasswordRight = await bcrypt.compare(password, user.password);
    if (!isPasswordRight) {
      return res.status(400).json({ message: "Credentials are not valid" });
    }
    console.log(isPasswordRight);

    const token = await generateAccessToken(req.body.username);
    res.status(201).json({ success: true, token });
  } catch (error) {
    return res.status(400).json({ success: false, data: error });
  }
}
