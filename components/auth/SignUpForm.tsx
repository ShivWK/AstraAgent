import { Button } from '../ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FieldErrors, useForm } from 'react-hook-form';
import SignInWithGoogle from './SignInWithGoogle';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/lib/validations/auth.schema';

// const signUpSchema = z.object({
//   name: z
//     .string()
//     .min(2, 'Name must be at least 2 characters')
//     .max(50, 'Name must be at most 50 characters'),

//   email: z
//     .email('Provide a valid email')
//     .min(5, 'Email must be at least 5 characters')
//     .max(254, 'Email must be at most 254 characters'),

//   password: z
//     .string()
//     .min(8, 'Password must be at least 8 characters')
//     .max(65, 'Password must be at most 64 characters')
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/,
//       'Password must include upper, lower, number, and special character ZOD',
//     ),
// });

type PropsType = {
  setOpen: (value: boolean) => void;
};

type FormType = z.infer<typeof signUpSchema>;

export function SignUpForm({ setOpen }: PropsType) {
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

  const onSubmit = (data: FormType) => {
    console.log('SignUp');
    console.log(data);
    setOpen(false);
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
