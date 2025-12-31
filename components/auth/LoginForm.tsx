import * as z from 'zod';
import { DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import SignInWithGoogle from './SignInWithGoogle';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FieldErrors, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { loginSchema } from '@/lib/validations/auth.schema';
import { useState } from 'react';
import EyeButton from './EyeButton';

type PropsType = {
  setOpen: (value: boolean) => void;
  setError: (value: string) => void;
};
type FormType = z.infer<typeof loginSchema>;

export function LoginForm({ setOpen, setError }: PropsType) {
  const [eyeOpen, setEyeOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormType) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.error) {
      setError(result.error);
    } else {
      console.log('Success', result.message);
      setOpen(false);
    }
  };

  const onError = (error: FieldErrors<FormType>) => {
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <DialogHeader className="mb-5">
        <DialogTitle>Sign In</DialogTitle>
      </DialogHeader>
      <div className="mb-5 grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            placeholder="Enter Your Email"
            {...register('email')}
          />
          {errors.email && (
            <p className="-mt-0.5 text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <EyeButton eyeOpen={eyeOpen} setEyeOpen={setEyeOpen} />
          </div>
          <Input
            type={eyeOpen ? 'text' : 'password'}
            id="password"
            placeholder="Enter Your Password"
            {...register('password')}
          />
          {errors.password && (
            <p className="-mt-0.5 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <DialogFooter className="w-full">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full justify-between">
            <SignInWithGoogle />
            <Button
              type="submit"
              className="basis-[49%] text-white dark:bg-[#0c2e96]"
            >
              Sign In
            </Button>
          </div>
        </div>
      </DialogFooter>
    </form>
  );
}
