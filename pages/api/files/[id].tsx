import mongoose from "mongoose";
import dbConnect from "../../../lib/mongoDBConnect";

const Grid = require('gridfs-stream');

export default async (req: any, res: any) => {
  const { query: { id } } = req;

  try {
    let conn = await dbConnect();
    const gfs = Grid(conn.connection.db, mongoose.mongo)
    gfs.collection('uploads');

    gfs.files.find({ _id: new mongoose.Types.ObjectId(id) }).toArray((err: any, file: any) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (!file || file.length === 0) {
        return res.status(404).json({ error: 'No file exists' });
      }

      return res.json(file);
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: true, data: "Internal server error" })
  }
};