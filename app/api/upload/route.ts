import * as z from 'zod';
import { NextResponse } from 'next/server';
import { fileSchema } from '@/lib/validations/auth.schema';
import { UserModel } from '@/model/userModel';
import { connectDB } from '@/lib/db/connectDb';
import cloudinary from '@/lib/cloudinary';
import { type UploadApiResponse } from 'cloudinary';
import sharp from 'sharp';
import { RateLimit } from '@/lib/rate_limit';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

export const POST = async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.0';
    const { success, reset } = await RateLimit.upload.limit(ip);

    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);

      return NextResponse.json(
        { message: 'Too many upload request', retryAfter },
        { status: 429 },
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Image Required' }, { status: 400 });
    }

    const parsed = fileSchema.safeParse({
      size: file.size,
      type: file.type,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: z.flattenError(parsed.error) },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      await sharp(buffer).metadata();
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        {
          error: 'File is not a valid image',
        },
        {
          status: 400,
        },
      );
    }

    const uploadResponse: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: 'profile_pictures',
              public_id: session.user.id,
              overwrite: true,
            },
            (error, uploadResult) => {
              if (error) {
                return reject(error);
              }
              return resolve(uploadResult as UploadApiResponse);
            },
          )
          .end(buffer);
      },
    );

    await connectDB();
    await UserModel.findByIdAndUpdate(session.user.id, {
      image: uploadResponse.secure_url,
    });

    return NextResponse.json(
      {
        message: 'Image uploaded successfully',
        data: {
          fileUrl: uploadResponse.secure_url,
        },
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
};
