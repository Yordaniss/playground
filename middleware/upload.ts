import multer from "multer";
import crypto from 'crypto';
import mongoose from "mongoose";
const { GridFsStorage } = require("multer-gridfs-storage");


if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI

const connection = mongoose.connect(uri, {
  bufferCommands: false,
  dbName: "hackathon"
});

const storage = new GridFsStorage({
  db: connection,
  file: (req: any, file: any) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + file.originalname;
        console.log(filename);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
export default multer({ storage });