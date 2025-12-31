import * as z from 'zod';
import { DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import SignInWithGoogle from './SignInWithGoogle';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FieldErrors, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { loginSchema } from '@/lib/validations/auth.schema';

type PropsType = { setOpen: (value: boolean) => void };
type FormType = z.infer<typeof loginSchema>;

export function LoginForm({ setOpen }: PropsType) {
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

  const onSubmit = (data: FormType) => {
    console.log('LogIn');
    console.log(data);
    setOpen(false);
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
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
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
