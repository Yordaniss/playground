import User from "../models/User";
import { getCookie } from 'cookies-next';
const jwt = require('jsonwebtoken');

async function checkTokenWithUsername(options: any) {
    try {
        const token = getCookie('token', options);
        const username = jwt.verify(token, process.env.JWT_TOKEN);

        return await User.findOne({ username }).select("_id");
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default checkTokenWithUsername;