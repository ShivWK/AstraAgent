import { Button } from '../ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FieldErrors, useForm } from 'react-hook-form';
import SignInWithGoogle from './SignInWithGoogle';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/lib/validations/auth.schema';
import EyeButton from './EyeButton';
import { useState } from 'react';

type PropsType = {
  setOpen: (value: boolean) => void;
  setError: (value: string) => void;
};

type FormType = z.infer<typeof signUpSchema>;

// let rendered = 0;

export function SignUpForm({ setOpen, setError }: PropsType) {
  // rendered++;
  const [eyeOpen, setEyeOpen] = useState(false);

  // console.log("rendered", rendered / 2)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormType) => {
    const response = await fetch('/api/auth/register', {
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
        <DialogTitle>Sign Up</DialogTitle>
      </DialogHeader>
      <div className="mb-5 grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter Your Name"
            {...register('name')}
          />
          {errors.name && (
            <p className="-mt-0.5 text-sm text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

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
        <div className="flex w-full justify-between">
          <SignInWithGoogle />
          <Button
            type="submit"
            className="basis-[49%] text-white dark:bg-[#0c2e96]"
          >
            Sign Up
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}
