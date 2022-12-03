import User from '../../../models/User';
import dbConnect from "../../../lib/mongoDBConnect";
import generateAccessToken from '../../../helper/generateAccessToken';

export default async function handler(req: any, res: any) {
    await dbConnect();

    try {
        const { username } = req.body;
        const userToSearch = await User.findOne({ username });
        if (userToSearch) {
            return res.status(400).json({
                success: false,
                data: "User with username:#" + username + " already exists"
            });
        }

        const userObject = new User({ ...req.body });
        await userObject.save();
        const token = await generateAccessToken(username);
        res.status(201).json({ success: true, token });
    } catch (error) {
        return res.status(400).json({ success: false, data: error });
    }
}