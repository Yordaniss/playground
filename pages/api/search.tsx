import clientPromise from "../../lib/mongodb";

export default async (req: any, res: any) => {
    const { title, main_category, components } = req.body;
    let query = {};

    if (title) {
        let titleQuery = {
            "must": {
                "text": {
                    "path": "title",
                    "query": title
                }
            },
        };
        query = { ...query, ...titleQuery }
    }

    if (main_category) {
        let categoryQuery = {
            "should": {
                "text": {
                    "path": "main_category",
                    "query": main_category
                }
            }
        };
        query = { ...query, ...categoryQuery }
    }

    let finalQuery = [
        {
            $search: {
                compound: query
            }
        },
        {
            $match: {
                "components": { $in: [components] }
            }
        }
    ];

    try {
        const client = await clientPromise;
        const db = client.db("hackathon");
        const posts = await db
            .collection("posts")
            .aggregate(finalQuery).toArray();

        return res.status(200).json({ success: true, data: posts })

    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: true, data: "Internal server error" })
    }
};