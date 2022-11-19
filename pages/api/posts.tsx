import nextConnect from "next-connect";
import Post from "../../models/Post"
import storage from "../../middleware/upload";

const handler = nextConnect();

handler.get(async (req: any, res: any) => {
    try {
        const posts = await Post.find({});

        return res.status(200).json({ success: true, data: posts })

    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: true, data: "Internal server error" })
    }
});

handler.use(storage);

handler.post(async (req: any, res: any) => {
    let fileId = res.req.files.file[0].id.toString();
    try {
        req.body.fileId = fileId;
        const post = await Post.create(req.body);
        return res.status(201).json({ success: true, data: post });
    } catch (error) {
        return res.status(400).json({ success: false, data: error });
    }
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;