import * as z from 'zod';
import { NextResponse } from 'next/server';
import { fileSchema } from '@/lib/validations/auth.schema';
import { UserModel } from '@/model/userModel';
import { connectDB } from '@/lib/db/connectDb';
import { auth } from '@/auth';

export const GET = auth(function GET(req) {
  console.log(req.auth);
  if (req.auth) return NextResponse.json(req.auth);
  return NextResponse.json({ messages: 'NOt authenticated' }, { status: 401 });
});
