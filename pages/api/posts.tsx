import clientPromise from "../../lib/mongodb";
import Post from "../../models/Post"
import dbConnect from "../../lib/mongoDBConnect";

export default async (req: any, res: any) => {
    const method = req.method;
    const client = await clientPromise;
    const db = client.db("hackathon");

    switch (method) {
        case "GET":
            try {
                const posts = await db
                    .collection("posts")
                    .find({})
                    .toArray();

                return res.status(200).json({ success: true, data: posts })

            } catch (e) {
                console.error(e);
                return res.status(500).json({ success: true, data: "Internal server error" })
            }
        case "POST":
            console.log("Trying to save object");
            try {
                await dbConnect();
                const post = await Post.create(req.body);
                return res.status(201).json({ success: true, data: post })
            } catch (error) {
                return res.status(400).json({ success: false, data: error })
            }
        default:
            return res.status(500).json({ success: false, data: "Method not allowed." })
    }
};