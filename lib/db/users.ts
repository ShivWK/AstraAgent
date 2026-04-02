import { connectDB } from './connectDb';
import { UserModel } from '@/model/userModel';
import { ObjectId } from 'mongodb';

export async function getUserByEmail(email: string) {
  await connectDB();
  return UserModel.findOne({ email });
}

export async function getUserById(id: string) {
  await connectDB();
  return UserModel.findOne({ _id: new ObjectId(id) });
}
