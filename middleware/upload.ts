import multer from "multer";
import crypto from 'crypto';
import dbConnect from "../lib/mongoDBConnect";
const { GridFsStorage } = require("multer-gridfs-storage");

let storage = new GridFsStorage({
  db: dbConnect(),
  file: (req: any, file: any) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

export default multer({ storage: storage }).fields([{ name: 'file', maxCount: 1 }]);