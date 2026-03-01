import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Pencil, Save } from 'lucide-react';
import * as z from 'zod';
import { profileFormSchema } from '@/lib/validations/agents.schema';
import { Spinner } from '../ui/spinner';
import { useEffect, useState } from 'react';
import useAppSelector from '@/hooks/useAppSelector';
import { selectUserDetails } from '@/features/auth/authSlice';

const ProfileChange = () => {
  const userDetails = useAppSelector(selectUserDetails);

  type FormType = z.infer<typeof profileFormSchema>;
  const [previewURL, setPreviewURl] = useState<string | null>(null);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<FormType>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onBlur',
    // defaultValues: {
    //     profileImage: ""
    // }
  });

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  const submitHandler = (data: FormType) => {
    // after successful clean th previewURL
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="relative">
        <Image
          src={
            previewURL
              ? previewURL
              : userDetails.image
                ? userDetails.image
                : '/assistants/general_ai.png'
          }
          alt="Profile picture"
          height={300}
          width={300}
          quality={100}
          className="h-32 w-32 rounded-full shadow-2xl"
        />
        <label
          htmlFor="profile"
          aria-label="Upload profile picture"
          className="cursor-pointer"
        >
          <div className="absolute top-24 left-22 inline-block rounded-full bg-gray-900 p-2 transition-all duration-150 ease-linear active:scale-90">
            <Pencil aria-hidden="true" strokeWidth={1.5} size={20} />
          </div>
        </label>
        <input
          {...register('profileImage')}
          type="file"
          id="profile"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue('profileImage', file, {
                shouldValidate: true,
              });

              const objectURl = URL.createObjectURL(file);
              setPreviewURl(objectURl);
            }
          }}
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
                className="size-6"
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
