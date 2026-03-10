import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Pencil, Save } from 'lucide-react';
import * as z from 'zod';
import { profileFormSchema } from '@/lib/validations/auth.schema';
import { Spinner } from '../ui/spinner';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const ProfileChange = () => {
  const { data: session, status, update } = useSession();
  const [previewURL, setPreviewURl] = useState<string | null>(null);
  type FormType = z.infer<typeof profileFormSchema>;

  useEffect(() => {
    console.log('Status', status);
  }, [status]);

  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<FormType>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onBlur',
    defaultValues: {
      profileImage: null,
    },
  });

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  const submitHandler = async (data: FormType) => {
    const formData = new FormData();
    formData.append('file', data.profileImage);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error');
      }

      const result = await response.json();
      console.log(result.message);

      await update({
        image: result.data.fileUrl,
      });
      setPreviewURl(null);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log('Validation Error', errors);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('profileImage', file, {
        shouldValidate: true,
      });

      const objectURl = URL.createObjectURL(file);
      setPreviewURl(objectURl);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="relative">
        <div
          role="img"
          className="rounded-full border bg-linear-to-br from-[#1f58fd] via-[#5bddfd] to-[#1f58fd] p-1"
        >
          <Image
            src={
              previewURL
                ? previewURL
                : session?.user?.image
                  ? session?.user?.image
                  : '/assistants/general_ai.png'
            }
            alt="Profile picture"
            height={300}
            width={300}
            quality={100}
            className="h-32 w-32 rounded-full"
          />
        </div>
        <label
          htmlFor="profile"
          aria-label="Upload profile picture"
          className="cursor-pointer"
        >
          <div className="absolute top-25 left-23 inline-block rounded-full bg-gray-900 p-2 transition-all duration-150 ease-linear active:scale-90">
            <Pencil aria-hidden="true" strokeWidth={1.5} size={20} />
          </div>
        </label>
        <input
          {...register('profileImage')}
          type="file"
          id="profile"
          className="hidden"
          onChange={inputChangeHandler}
        />

        <div
          className={`w-full transition-all duration-150 ease-linear ${previewURL ? 'h-13' : 'h-0'} overflow-hidden`}
        >
          <button
            type="submit"
            className="mx-auto mt-4 flex items-center gap-2 rounded-md bg-gray-900 px-3 py-1 transition-all duration-150 ease-linear active:scale-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner
                aria-hidden="true"
                data-icon="inline-start"
                className="size-5"
              />
            ) : (
              <Save aria-hidden="true" strokeWidth={1.5} size={20} />
            )}
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileChange;
