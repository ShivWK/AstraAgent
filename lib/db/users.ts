import client from '../mongodb';
import { ObjectId } from 'mongodb';

export async function getUserByEmail(email: string) {
  const db = client.db();
  return db.collection('users').findOne({ email });
}

export async function getUserById(id: string) {
  const db = client.db();
  return db.collection('users').findOne({ _id: new ObjectId(id) });
}
