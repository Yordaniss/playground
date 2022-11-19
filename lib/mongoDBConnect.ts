import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI

async function dbConnect() {
  const opts = {
    bufferCommands: false,
    dbName: 'hackathon'
  }

  let mongooseConnection = mongoose.connect(uri, opts).then((mongoose) => {
    return mongoose;
  })

  return await mongooseConnection;
}

export default dbConnect