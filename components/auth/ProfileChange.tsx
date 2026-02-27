import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Pencil, Save } from 'lucide-react';
import * as z from 'zod';
import { profileFormSchema } from '@/lib/validations/agents.schema';
import { Spinner } from '../ui/spinner';

const ProfileChange = () => {
  type FormType = z.infer<typeof profileFormSchema>;

  const {
    register,
    watch,
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

  const profileValue = watch('profileImage');

  const submitHandler = (data: FormType) => {
    // on successful submission clear the profileValue value
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="relative">
        <Image
          src={
            profileValue?.name
              ? `/assistants/${profileValue?.name}`
              : '/assistants/general_ai.png'
          }
          alt="Profile picture"
          height={300}
          width={300}
          quality={100}
          className="h-32 w-32 rounded-full shadow-2xl"
        />
        {profileValue?.name ? (
          <button
            type="submit"
            aria-label="Save Profile Picture"
            title="Save"
            className="absolute top-24 left-22 rounded-full bg-gray-900 p-2 transition-all duration-150 ease-linear active:scale-95"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner className="size-5" />
            ) : (
              <Save aria-hidden="true" strokeWidth={1.5} size={20} />
            )}
          </button>
        ) : (
          <label
            htmlFor="profile"
            aria-label="Upload profile picture"
            className="cursor-pointer"
          >
            <div className="absolute top-24 left-22 inline-block rounded-full bg-gray-900 p-2">
              <Pencil aria-hidden="true" strokeWidth={1.5} size={20} />
            </div>
          </label>
        )}
        <input
          {...register('profileImage')}
          type="file"
          id="profile"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue('profileImage', file);
            }
          }}
        />
      </div>
    </form>
  );
};

export default ProfileChange;
