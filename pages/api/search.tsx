import clientPromise from "../../lib/mongodb";

export default async (req: any, res: any) => {
    try {
        const client = await clientPromise;
        const db = client.db("hackathon");
        const posts = await db
            .collection("posts")
            .aggregate([
                {
                    $search: {
                        compound: {
                            "must": {
                                "text": {
                                    "path": "title",
                                    "query": req.body.title
                                }
                            },
                            "should": {
                                "text": {
                                    "path": "category",
                                    "query": req.body.category.toString()
                                },
                            }
                        }
                    }
                },
                {
                    $match: {
                        "components": { $in: [req.body.components] }
                    }
                }
            ]).toArray();

        return res.status(200).json({ success: true, data: posts })

    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: true, data: "Internal server error" })
    }
};