import nextConnect from "next-connect";
import Post from "../../models/Post"
import storage from "../../middleware/upload";
import multer from "multer";
import formidable from 'formidable';

const form = formidable({ multiples: true });
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

handler.post(async (req: any, res: any) => {
    let post = null;
    let fileId: any = null;
    let upload = multer({ storage: storage }).fields([{name:'file', maxCount:1}]);
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }

        fileId = res.req.files.file[0].id.toString();
    });
    
    try {
        const contentType = req.headers['content-type']
        if (contentType && contentType.indexOf('multipart/form-data') !== -1) {
            form.parse(req, (err, fields, files) => {
                if (!err) {
                    fields.fileId = fileId;
                    post = Post.create(fields);
                }
            })
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error });
    }

    return res.status(201).json({ success: true, data: post });
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;