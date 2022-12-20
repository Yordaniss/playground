import nextConnect from "next-connect";
import Post from "../../models/Post";
import uploadFile from "../../middleware/upload";
import authenticateToken from "../../middleware/authentication";

const handler = nextConnect();

handler.get(async (req: any, res: any) => {
  try {
    const posts = await Post.find({});

    return res.status(200).json({ success: true, data: posts });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ success: true, data: "Internal server error" });
  }
});

handler.use(uploadFile);
handler.use(authenticateToken);

handler.post(async (req: any, res: any) => {
  console.log(req.body);
  let fileId = null;
  if (req.files.file) {
    fileId = req.files.file[0].id.toString();
  }
  try {
    const postObject = new Post({
      ...req.body,
      file: fileId,
    });
    const post = await postObject.save();
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
