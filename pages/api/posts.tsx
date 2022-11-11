import clientPromise from "../../lib/mongodb";

export default async (req: any, res: any) => {
    try {
        const client = await clientPromise;
        const db = client.db("hackathon");

        const posts = await db
            .collection("posts")
            .find({})
            .sort({})
            .toArray();

        res.status(200).json({ success: true, data: posts })

    } catch (e) {
        console.error(e);
    }
};