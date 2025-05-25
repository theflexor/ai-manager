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

const { authControllerSignIn } = getAuth();
export function useSignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const signInMutation = useMutation({
    mutationFn: authControllerSignIn,
    onSuccess() {
      router.push(ROUTES.HOME);
      toast.success('Sign in successful', {
        description: 'You have successfully signed in.',
      });
    },
  });

  const errorMessage = signInMutation.error ? 'Sign in faled' : undefined;

  return {
    errorMessage,
    handleSubmit: form.handleSubmit((data) => {
      signInMutation.mutate(data);
    }),
    isLoading: signInMutation.isPending,
    form,
  };
}

