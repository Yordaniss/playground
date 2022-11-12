import clientPromise from "../../lib/mongodb";

export default async (req: any, res: any) => {
    const method = req.method;
    console.log(method);
    switch (method) {
        case 'GET':
            try {
                const client = await clientPromise;
                const db = client.db("hackathon");

                const posts = await db
                    .collection("posts")
                    .find({})
                    .toArray();

                res.status(200).json({ success: true, data: posts })

            } catch (e) {
                console.error(e);
            }
        case 'POST':
            try {
                const client = await clientPromise;
                const db = client.db("hackathon");

                const posts = await db
                    .collection("posts")
                    .aggregate([
                        {
                            $search: {
                                'index': 'default',
                                'text': {
                                    'query': req.body.title,
                                    'path': 'title'
                                }
                            },
                        }
                    ]).toArray();

                res.status(200).json({ success: true, data: posts })

            } catch (e) {
                console.error(e);
            }
        default:
            res.status(500).json({ success: false, data: 'Method not allowed.' })
    }
};