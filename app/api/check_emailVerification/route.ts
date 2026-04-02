import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { connectDB } from '@/lib/db/connectDb';
import { UserModel } from '@/model/userModel';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ emailVerified: false });
  }

  await connectDB();

  const user = await UserModel.findById(session.user.id);

  return Response.json({
    emailVerified: !!user?.emailVerified,
  });
}
