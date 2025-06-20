import { ROUTES } from '@/shared/constants/routes';
import { getAuth } from '@/shared/api/orval/auth';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
});

const { authControllerSignUp } = getAuth();
export function useSignUpForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const signUpMutation = useMutation({
    mutationFn: authControllerSignUp,
    onSuccess() {
      router.push(ROUTES.HOME);
      toast('Account created successfully', {
        description: 'Your account has been created successfully.',
      });
    },
  });

  const errorMessage = signUpMutation.error ? 'Sign up faled' : undefined;

  return {
    errorMessage,
    isLoading: signUpMutation.isPending,
    form,
    handleSubmit: form.handleSubmit((data) => signUpMutation.mutate(data)),
  };
}

