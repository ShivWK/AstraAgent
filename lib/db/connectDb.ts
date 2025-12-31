import mongoose from 'mongoose';
const DB_URI = process.env.MONGODB_URI!;

if (!DB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected');
      return;
    }

    await mongoose.connect(DB_URI, {
      dbName: 'AstraDB',
    });
    console.log('DB connected');
  } catch (err) {
    console.log('DB not connected');
    console.log(err);
    process.exit(1);
  }
};
