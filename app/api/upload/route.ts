import * as z from 'zod';
import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/verifySession';
import { fileSchema } from '@/lib/validations/agents.schema';
import { UserModel } from '@/model/userModel';
import { SessionModel } from '@/model/sessionModel';
import { connectDB } from '@/lib/db/connectDb';
import { auth } from '@/auth';

export const GET = auth(function GET(req) {
  console.log(req.auth);
  if (req.auth) return NextResponse.json(req.auth);
  return NextResponse.json({ messages: 'NOt authenticated' }, { status: 401 });
});
