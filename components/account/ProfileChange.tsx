import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Pencil, Save } from 'lucide-react';
import * as z from 'zod';
import { profileFormSchema } from '@/lib/validations/auth.schema';
import { Spinner } from '../ui/spinner';
import { ChangeEvent, useEffect, useState } from 'react';
import { User } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react_query/query-keys';
import useAppDispatch from '@/hooks/useAppDispatch';
import { addToast } from '@/features/toast/toastSlice';

const ProfileChange = ({ user }: { user: User }) => {
  const queryClient = useQueryClient();
  const [previewURL, setPreviewURl] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  type FormType = z.infer<typeof profileFormSchema>;

  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<FormType>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onSubmit',
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

      const result = await response.json();

      if (response.status === 429) {
        const retryAfter = result.retryAfter;
        const minutes = Math.floor(retryAfter / 60);
        const seconds = retryAfter % 60;

        dispatch(
          addToast({
            message: `Too many requests. Try again in ${minutes}m ${seconds}s`,
            type: 'warning',
          }),
        );

        return;
      }

      if (!response.ok) {
        dispatch(
          addToast({
            message: result.error,
            type: 'error',
          }),
        );
      }

      dispatch(
        addToast({
          message: 'Profile picture updated successfully',
          type: 'success',
        }),
      );

      queryClient.invalidateQueries({
        queryKey: queryKeys.user,
        exact: true,
      });
      setPreviewURl(null);
    } catch (err) {
      console.log(err);
      dispatch(
        addToast({
          message: 'Something went wrong. Please try again later.',
          type: 'error',
        }),
      );
    }
  };

  const onInvalid = (errors: FieldErrors<FormType>) => {
    const firstError = Object.values(errors)[0];

    if (firstError?.message) {
      dispatch(
        addToast({
          message: firstError.message as string,
          type: 'error',
        }),
      );
    }
  };

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
    <form onSubmit={handleSubmit(submitHandler, onInvalid)}>
      <div className="relative">
        <div
          role="img"
          className="rounded-full border bg-linear-to-br from-[#1f58fd] via-[#5bddfd] to-[#1f58fd] p-1"
        >
          <Image
            src={
              previewURL
                ? previewURL
                : user?.image
                  ? user?.image
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
          <div className="absolute top-25 left-23 inline-block rounded-full bg-blue-500 p-2 text-white transition-all duration-150 ease-linear active:scale-90 dark:bg-gray-900">
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
            className="mx-auto mt-4 flex items-center gap-2 rounded-md bg-blue-500 px-3 py-1 text-white transition-all duration-150 ease-linear active:scale-90 dark:bg-gray-900"
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
