import * as z from 'zod';
import { NextResponse } from 'next/server';
import { fileSchema } from '@/lib/validations/auth.schema';
import { UserModel } from '@/model/userModel';
import { connectDB } from '@/lib/db/connectDb';
import cloudinary from '@/lib/cloudinary';
import { type UploadApiResponse } from 'cloudinary';
import { auth } from '@/auth';
import sharp from 'sharp';

export const POST = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
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
              public_id: req.auth?.user.id,
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
    await UserModel.findByIdAndUpdate(req.auth.user.id, {
      image: uploadResponse.secure_url,
    });

    return NextResponse.json(
      {
        message: 'Image valid',
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
});
