import Post from '../../models/Post';
import dbConnect from "../../lib/mongoDBConnect";

export default async function handler(req: any, res: any) {
    const { query: { id } } = req

    try {
        await dbConnect();

        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({ success: false, data: 'No data was found' })
        }
        res.status(200).json({ success: true, data: post })
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false })
    }
}