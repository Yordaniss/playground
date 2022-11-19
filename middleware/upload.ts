import multer from "multer";
import crypto from 'crypto';
import dbConnect from "../lib/mongoDBConnect";
const { GridFsStorage } = require("multer-gridfs-storage");

let connection = dbConnect();

export default new GridFsStorage({
  db: connection,
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