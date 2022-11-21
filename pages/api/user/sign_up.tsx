import User from '../../../models/User';
import dbConnect from "../../../lib/mongoDBConnect";
import generateAccessToken from '../../../helper/jwt_token';

export default async function handler(req: any, res: any) {
    await dbConnect();

    try {
        const userToSearch = await User.findOne({ ...req.body.username });
        if (userToSearch) {
          return res.status(400).json({ message: "User with username:#" + req.body.username + " already exists" });
        }

        const userObject = new User({ ...req.body });
        await userObject.save();
        const token = await generateAccessToken(req.body.username);
        res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        return res.status(400).json({ success: false, data: error });
    }
}